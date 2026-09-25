<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function respond(int $status, bool $success, string $message): void
{
    http_response_code($status);

    echo json_encode([
        'success' => $success,
        'message' => $message,
    ], JSON_UNESCAPED_SLASHES);

    exit;
}

function respondData(int $status, array $data): void
{
    http_response_code($status);

    echo json_encode(
        $data,
        JSON_UNESCAPED_SLASHES
    );

    exit;
}

function cleanLine(string $value, int $maxLength): string
{
    $value = trim(
        preg_replace(
            '/[\r\n]+/',
            ' ',
            $value
        ) ?? ''
    );

    return mb_substr(
        $value,
        0,
        $maxLength
    );
}

function cleanText(string $value, int $maxLength): string
{
    return mb_substr(
        trim($value),
        0,
        $maxLength
    );
}


/*
|--------------------------------------------------------------------------
| REQUEST TYPE
|--------------------------------------------------------------------------
*/

$requestMethod =
    strtoupper(
        (string)(
            $_SERVER['REQUEST_METHOD']
            ?? ''
        )
    );

$isRoutingLookup =
    $requestMethod === 'GET' &&
    strtolower(
        trim(
            (string)(
                $_GET['action']
                ?? ''
            )
        )
    ) === 'routing';

if (
    $requestMethod !== 'POST' &&
    !$isRoutingLookup
) {
    respond(
        405,
        false,
        'Method not allowed.'
    );
}


/*
|--------------------------------------------------------------------------
| SAME-ORIGIN CHECK
|--------------------------------------------------------------------------
*/

$origin =
    (string)(
        $_SERVER['HTTP_ORIGIN']
        ?? ''
    );

if ($origin !== '') {

    $originHost =
        parse_url(
            $origin,
            PHP_URL_HOST
        );

    $allowedHosts = [
        'archwayintl.com.ph',
        'www.archwayintl.com.ph',
    ];

    if (
        !$originHost ||
        !in_array(
            strtolower(
                (string)$originHost
            ),
            $allowedHosts,
            true
        )
    ) {
        respond(
            403,
            false,
            'Invalid request origin.'
        );
    }
}


/*
|--------------------------------------------------------------------------
| APPLICATION ROUTING HELPERS
|--------------------------------------------------------------------------
*/

function fetchTextUrl(string $url): ?string
{
    if (
        function_exists(
            'curl_init'
        )
    ) {

        $ch =
            curl_init(
                $url
            );

        if ($ch !== false) {

            curl_setopt_array(
                $ch,
                [
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_FOLLOWLOCATION => true,
                    CURLOPT_CONNECTTIMEOUT => 3,
                    CURLOPT_TIMEOUT => 5,
                    CURLOPT_USERAGENT =>
                        'ArchwayApplicationRouter/1.0',
                ]
            );

            $body =
                curl_exec(
                    $ch
                );

            $status =
                (int)curl_getinfo(
                    $ch,
                    CURLINFO_HTTP_CODE
                );

            curl_close(
                $ch
            );

            if (
                is_string($body) &&
                $body !== '' &&
                $status >= 200 &&
                $status < 300
            ) {
                return $body;
            }
        }
    }

    $context =
        stream_context_create([
            'http' => [
                'method' => 'GET',
                'timeout' => 5,
                'ignore_errors' => true,
                'header' =>
                    "User-Agent: ArchwayApplicationRouter/1.0\r\n",
            ],
        ]);

    $body =
        @file_get_contents(
            $url,
            false,
            $context
        );

    if (
        $body === false ||
        $body === ''
    ) {
        return null;
    }

    return $body;
}

function parseApplicationRoutingCsv(
    string $csvText
): array {

    $handle =
        fopen(
            'php://temp',
            'r+'
        );

    if ($handle === false) {
        return [];
    }

    fwrite(
        $handle,
        $csvText
    );

    rewind(
        $handle
    );

    $routes = [];
    $isHeader = true;

    $allowedRouteKeys = [
        'metro_manila',
        'batangas',
        'bulacan',
        'cavite',
        'la_union',
        'laguna',
        'pampanga',
    ];

    while (
        ($row = fgetcsv($handle))
        !== false
    ) {

        if ($isHeader) {
            $isHeader = false;
            continue;
        }

        $routeKey =
            strtolower(
                trim(
                    (string)(
                        $row[0]
                        ?? ''
                    )
                )
            );

        $officeName =
            trim(
                (string)(
                    $row[1]
                    ?? ''
                )
            );

        $assignedEmail =
            trim(
                (string)(
                    $row[2]
                    ?? ''
                )
            );

        if (
            $routeKey === '' ||
            !in_array(
                $routeKey,
                $allowedRouteKeys,
                true
            )
        ) {
            continue;
        }

        $routes[$routeKey] = [
            'office_name' =>
                $officeName,

            'assigned_email' =>
                $assignedEmail,
        ];
    }

    fclose(
        $handle
    );

    return $routes;
}

function readApplicationRoutingCache(
    string $cachePath
): array {

    if (
        !is_file(
            $cachePath
        )
    ) {
        return [];
    }

    $raw =
        @file_get_contents(
            $cachePath
        );

    if (
        $raw === false ||
        $raw === ''
    ) {
        return [];
    }

    $data =
        json_decode(
            $raw,
            true
        );

    if (
        !is_array($data) ||
        !isset($data['routes']) ||
        !is_array($data['routes'])
    ) {
        return [];
    }

    return $data['routes'];
}

function getApplicationRoutes(): array
{
    static $memoizedRoutes = null;

    if (
        is_array(
            $memoizedRoutes
        )
    ) {
        return $memoizedRoutes;
    }

    $routingSheetUrl =
    'https://docs.google.com/spreadsheets/d/' .
    '1D6i7bhfAZ5dCvzDnz51P_krUw2VlhxQUXk8ik8bxQ8c/' .
    'gviz/tq?tqx=out:csv&gid=1084831089';

    $cachePath =
        dirname(__DIR__) .
        '/.archway-application-routing.json';

    $cacheTtlSeconds =
        300;

    $cacheModified =
        @filemtime(
            $cachePath
        );

    if (
        $cacheModified !== false &&
        $cacheModified >=
            time() - $cacheTtlSeconds
    ) {

        $cachedRoutes =
            readApplicationRoutingCache(
                $cachePath
            );

        if (
            $cachedRoutes !== []
        ) {
            $memoizedRoutes =
                $cachedRoutes;

            return $memoizedRoutes;
        }
    }

    $csvText =
        fetchTextUrl(
            $routingSheetUrl
        );

    if (
        $csvText !== null
    ) {

        $freshRoutes =
            parseApplicationRoutingCsv(
                $csvText
            );

        if (
            $freshRoutes !== []
        ) {

            $payload =
                json_encode(
                    [
                        'fetched_at' =>
                            time(),

                        'routes' =>
                            $freshRoutes,
                    ],
                    JSON_UNESCAPED_SLASHES
                );

            if (
                $payload !== false
            ) {

                @file_put_contents(
                    $cachePath,
                    $payload,
                    LOCK_EX
                );

                @chmod(
                    $cachePath,
                    0600
                );
            }

            $memoizedRoutes =
                $freshRoutes;

            return $memoizedRoutes;
        }
    }

    $staleRoutes =
        readApplicationRoutingCache(
            $cachePath
        );

    if (
        $staleRoutes !== []
    ) {

        $memoizedRoutes =
            $staleRoutes;

        return $memoizedRoutes;
    }

    $memoizedRoutes = [];

    return $memoizedRoutes;
}

function normalizeApplicationLocation(
    string $value
): string {

    $value =
        strtolower(
            trim($value)
        );

    $value =
        preg_replace(
            '/[^a-z0-9]+/',
            ' ',
            $value
        ) ?? '';

    return trim(
        preg_replace(
            '/\s+/',
            ' ',
            $value
        ) ?? ''
    );
}

function locationContains(
    string $normalizedLocation,
    string $term
): bool {

    return strpos(
        $normalizedLocation,
        $term
    ) !== false;
}

function getLocalRouteKeyFromLocation(
    string $location
): string {

    $normalized =
        normalizeApplicationLocation(
            $location
        );

    if (
        $normalized === ''
    ) {
        return '';
    }

    $metroManilaTerms = [
        'metro manila',
        'national capital region',
        'ncr',
        'pasay',
        'manila',
        'makati',
        'taguig',
        'bonifacio global city',
        'bgc',
        'quezon city',
        'mandaluyong',
        'paranaque',
        'las pinas',
        'muntinlupa',
        'alabang',
        'marikina',
        'pasig',
        'san juan',
        'caloocan',
        'malabon',
        'navotas',
        'valenzuela',
        'pateros',
    ];

    foreach (
        $metroManilaTerms
        as $term
    ) {

        if (
            locationContains(
                $normalized,
                $term
            )
        ) {
            return 'metro_manila';
        }
    }

    $provinceRoutes = [

        'batangas' => [
            'batangas',
        ],

        'bulacan' => [
            'bulacan',
        ],

        'cavite' => [
            'cavite',
        ],

        'la_union' => [
            'la union',
        ],

        'laguna' => [
            'laguna',
        ],

        'pampanga' => [
            'pampanga',
        ],
    ];

    foreach (
        $provinceRoutes
        as $routeKey => $terms
    ) {

        foreach (
            $terms
            as $term
        ) {

            if (
                locationContains(
                    $normalized,
                    $term
                )
            ) {
                return $routeKey;
            }
        }
    }

    return '';
}


/*
|--------------------------------------------------------------------------
| READ-ONLY ROUTING LOOKUP FOR FRONTEND DISPLAY
|--------------------------------------------------------------------------
*/

if ($isRoutingLookup) {

    $lookupJobType =
        strtolower(
            cleanLine(
                (string)(
                    $_GET['job_type']
                    ?? ''
                ),
                30
            )
        );

    $lookupLocation =
        cleanLine(
            (string)(
                $_GET['job_location']
                ?? ''
            ),
            180
        );

    if (
        !in_array(
            $lookupJobType,
            [
                'local',
                'overseas',
            ],
            true
        )
    ) {
        respond(
            422,
            false,
            'Invalid job type.'
        );
    }

    if (
        $lookupJobType ===
        'overseas'
    ) {

        respondData(
            200,
            [
                'success' =>
                    true,

                'route_key' =>
                    'overseas',

                'office_name' =>
                    'Pasay / Main HR',

                'assigned_email' =>
                    'hr@archwayintl.com.ph',
            ]
        );
    }

    $lookupRouteKey =
        getLocalRouteKeyFromLocation(
            $lookupLocation
        );

    if (
        $lookupRouteKey === ''
    ) {

        respond(
            422,
            false,
            'No application office is assigned to this job location.'
        );
    }

    $lookupRoutes =
        getApplicationRoutes();

    if (
        $lookupRoutes === [] ||
        !isset(
            $lookupRoutes[
                $lookupRouteKey
            ]
        )
    ) {

        respond(
            503,
            false,
            'Application routing is temporarily unavailable.'
        );
    }

    $lookupRoute =
        $lookupRoutes[
            $lookupRouteKey
        ];

    $lookupOffice =
        trim(
            (string)(
                $lookupRoute[
                    'office_name'
                ]
                ?? ''
            )
        );

    $lookupEmail =
        trim(
            (string)(
                $lookupRoute[
                    'assigned_email'
                ]
                ?? ''
            )
        );

    if (
        $lookupOffice === ''
    ) {

        $lookupOffice =
            ucwords(
                str_replace(
                    '_',
                    ' ',
                    $lookupRouteKey
                )
            );
    }

    if (
        $lookupEmail === '' ||
        !filter_var(
            $lookupEmail,
            FILTER_VALIDATE_EMAIL
        )
    ) {

        respond(
            503,
            false,
            'The assigned application email is not configured.'
        );
    }

    respondData(
        200,
        [
            'success' =>
                true,

            'route_key' =>
                $lookupRouteKey,

            'office_name' =>
                $lookupOffice,

            'assigned_email' =>
                $lookupEmail,
        ]
    );
}


/*
|--------------------------------------------------------------------------
| POST-ONLY APPLICATION SECURITY
|--------------------------------------------------------------------------
*/

if (
    trim(
        (string)(
            $_POST['website']
            ?? ''
        )
    ) !== ''
) {

    respond(
        200,
        true,
        'Application received.'
    );
}

$formStarted =
    (int)(
        $_POST['form_started']
        ?? 0
    );

if (
    $formStarted > 0
) {

    $elapsedMs =
        (int)round(
            microtime(true) * 1000
        )
        - $formStarted;

    if (
        $elapsedMs >= 0 &&
        $elapsedMs < 2500
    ) {

        respond(
            429,
            false,
            'Please review the form and try again.'
        );
    }
}


/*
|--------------------------------------------------------------------------
| RATE LIMIT HELPERS
|--------------------------------------------------------------------------
*/

function getClientIp(): ?string
{
    $ip =
        trim(
            (string)(
                $_SERVER['REMOTE_ADDR']
                ?? ''
            )
        );

    if (
        $ip === ''
    ) {
        return null;
    }

    if (
        !filter_var(
            $ip,
            FILTER_VALIDATE_IP
        )
    ) {
        return null;
    }

    return $ip;
}

function enforceRateLimit(
    string $ip,
    int $hourlyLimit = 30,
    int $dailyLimit = 100
): void {

    $storageDir =
        dirname(__DIR__) .
        '/.archway-rate-limit';

    if (
        !is_dir(
            $storageDir
        )
    ) {

        @mkdir(
            $storageDir,
            0700,
            true
        );
    }

    if (
        !is_dir($storageDir) ||
        !is_writable($storageDir)
    ) {
        return;
    }

    $filePath =
        $storageDir .
        '/' .
        hash(
            'sha256',
            $ip
        ) .
        '.json';

    $handle =
        @fopen(
            $filePath,
            'c+'
        );

    if (
        $handle === false
    ) {
        return;
    }

    if (
        !flock(
            $handle,
            LOCK_EX
        )
    ) {

        fclose(
            $handle
        );

        return;
    }

    rewind(
        $handle
    );

    $raw =
        stream_get_contents(
            $handle
        );

    $data =
        json_decode(
            $raw ?: '',
            true
        );

    $timestamps = [];

    if (
        is_array($data) &&
        isset($data['timestamps']) &&
        is_array($data['timestamps'])
    ) {

        foreach (
            $data['timestamps']
            as $timestamp
        ) {

            if (
                is_int($timestamp) ||
                ctype_digit(
                    (string)$timestamp
                )
            ) {

                $timestamps[] =
                    (int)$timestamp;
            }
        }
    }

    $now =
        time();

    $dayCutoff =
        $now - 86400;

    $hourCutoff =
        $now - 3600;

    $timestamps =
        array_values(
            array_filter(
                $timestamps,
                static function (
                    $timestamp
                ) use (
                    $dayCutoff
                ) {
                    return
                        $timestamp
                        >= $dayCutoff;
                }
            )
        );

    $dailyCount =
        count(
            $timestamps
        );

    $hourlyCount = 0;

    foreach (
        $timestamps
        as $timestamp
    ) {

        if (
            $timestamp >=
            $hourCutoff
        ) {
            $hourlyCount++;
        }
    }

    if (
        $hourlyCount >=
            $hourlyLimit ||
        $dailyCount >=
            $dailyLimit
    ) {

        flock(
            $handle,
            LOCK_UN
        );

        fclose(
            $handle
        );

        header(
            'Retry-After: 3600'
        );

        respond(
            429,
            false,
            'Too many applications were submitted from this network. Please try again later.'
        );
    }

    $timestamps[] =
        $now;

    $payload =
        json_encode(
            [
                'timestamps' =>
                    $timestamps,
            ],
            JSON_UNESCAPED_SLASHES
        );

    if (
        $payload !== false
    ) {

        rewind(
            $handle
        );

        ftruncate(
            $handle,
            0
        );

        fwrite(
            $handle,
            $payload
        );

        fflush(
            $handle
        );
    }

    flock(
        $handle,
        LOCK_UN
    );

    fclose(
        $handle
    );

    if (
        mt_rand(
            1,
            100
        ) === 1
    ) {

        $staleBefore =
            $now - 172800;

        $files =
            glob(
                $storageDir .
                '/*.json'
            );

        if (
            is_array(
                $files
            )
        ) {

            foreach (
                $files
                as $file
            ) {

                $modified =
                    @filemtime(
                        $file
                    );

                if (
                    $modified !== false &&
                    $modified <
                        $staleBefore
                ) {

                    @unlink(
                        $file
                    );
                }
            }
        }
    }
}


/*
|--------------------------------------------------------------------------
| FORM DATA
|--------------------------------------------------------------------------
*/

$fullName =
    cleanLine(
        (string)(
            $_POST['full_name']
            ?? ''
        ),
        120
    );

$email =
    cleanLine(
        (string)(
            $_POST['email']
            ?? ''
        ),
        180
    );

$mobile =
    cleanLine(
        (string)(
            $_POST['mobile']
            ?? ''
        ),
        30
    );

$message =
    cleanText(
        (string)(
            $_POST['message']
            ?? ''
        ),
        1500
    );

$jobId =
    cleanLine(
        (string)(
            $_POST['job_id']
            ?? ''
        ),
        80
    );

$jobTitle =
    cleanLine(
        (string)(
            $_POST['job_title']
            ?? ''
        ),
        160
    );

$jobType =
    strtolower(
        cleanLine(
            (string)(
                $_POST['job_type']
                ?? ''
            ),
            30
        )
    );

$jobLocation =
    cleanLine(
        (string)(
            $_POST['job_location']
            ?? ''
        ),
        180
    );

$privacyConsent =
    (string)(
        $_POST['privacy_consent']
        ?? ''
    );


/*
|--------------------------------------------------------------------------
| VALIDATION
|--------------------------------------------------------------------------
*/

if (
    $fullName === '' ||
    $email === '' ||
    $mobile === '' ||
    $jobTitle === ''
) {

    respond(
        422,
        false,
        'Please complete all required fields.'
    );
}

if (
    !filter_var(
        $email,
        FILTER_VALIDATE_EMAIL
    )
) {

    respond(
        422,
        false,
        'Please enter a valid email address.'
    );
}

if (
    $privacyConsent !==
    'yes'
) {

    respond(
        422,
        false,
        'Privacy consent is required.'
    );
}

if (
    !in_array(
        $jobType,
        [
            'local',
            'overseas',
        ],
        true
    )
) {

    respond(
        422,
        false,
        'Invalid job type.'
    );
}


/*
|--------------------------------------------------------------------------
| APPLICATION ROUTING
|--------------------------------------------------------------------------
*/

if (
    $jobType ===
    'overseas'
) {

    $recipient =
        'hr@archwayintl.com.ph';

    $branchLabel =
        'Pasay / Main HR';

} else {

    $routeKey =
        getLocalRouteKeyFromLocation(
            $jobLocation
        );

    if (
        $routeKey === ''
    ) {

        respond(
            422,
            false,
            'No application office is assigned to this job location.'
        );
    }

    $applicationRoutes =
        getApplicationRoutes();

    if (
        $applicationRoutes === []
    ) {

        respond(
            503,
            false,
            'Application routing is temporarily unavailable. Please try again later.'
        );
    }

    if (
        !isset(
            $applicationRoutes[
                $routeKey
            ]
        )
    ) {

        respond(
            503,
            false,
            'No application route is configured for this job location.'
        );
    }

    $route =
        $applicationRoutes[
            $routeKey
        ];

    $recipient =
        trim(
            (string)(
                $route[
                    'assigned_email'
                ]
                ?? ''
            )
        );

    $branchLabel =
        trim(
            (string)(
                $route[
                    'office_name'
                ]
                ?? ''
            )
        );

    if (
        $branchLabel === ''
    ) {

        $branchLabel =
            ucwords(
                str_replace(
                    '_',
                    ' ',
                    $routeKey
                )
            );
    }

    if (
        $recipient === '' ||
        !filter_var(
            $recipient,
            FILTER_VALIDATE_EMAIL
        )
    ) {

        respond(
            503,
            false,
            'The assigned application email is not configured. Please contact Archway HR.'
        );
    }
}


/*
|--------------------------------------------------------------------------
| RESUME / CV
|--------------------------------------------------------------------------
*/

if (
    !isset(
        $_FILES['resume']
    ) ||
    !is_array(
        $_FILES['resume']
    )
) {

    respond(
        422,
        false,
        'Please attach your Resume/CV.'
    );
}

$resume =
    $_FILES['resume'];

if (
    (
        $resume['error']
        ?? UPLOAD_ERR_NO_FILE
    )
    !== UPLOAD_ERR_OK
) {

    respond(
        422,
        false,
        'Resume/CV upload failed. Please try again.'
    );
}

$maxFileSize =
    5 * 1024 * 1024;

$fileSize =
    (int)(
        $resume['size']
        ?? 0
    );

if (
    $fileSize <= 0 ||
    $fileSize >
        $maxFileSize
) {

    respond(
        422,
        false,
        'Resume/CV must be 5 MB or smaller.'
    );
}

$originalName =
    (string)(
        $resume['name']
        ?? 'resume'
    );

$extension =
    strtolower(
        pathinfo(
            $originalName,
            PATHINFO_EXTENSION
        )
    );

$allowedExtensions = [
    'pdf',
    'doc',
    'docx',
];

if (
    !in_array(
        $extension,
        $allowedExtensions,
        true
    )
) {

    respond(
        422,
        false,
        'Resume/CV must be a PDF, DOC, or DOCX file.'
    );
}

$tmpName =
    (string)(
        $resume['tmp_name']
        ?? ''
    );

if (
    $tmpName === '' ||
    !is_uploaded_file(
        $tmpName
    )
) {

    respond(
        422,
        false,
        'Invalid Resume/CV upload.'
    );
}

$finfo =
    new finfo(
        FILEINFO_MIME_TYPE
    );

$detectedMime =
    $finfo->file(
        $tmpName
    )
    ?: 'application/octet-stream';

$allowedMimes = [

    'pdf' => [
        'application/pdf',
    ],

    'doc' => [
        'application/msword',
        'application/CDFV2',
        'application/octet-stream',
    ],

    'docx' => [
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/zip',
        'application/octet-stream',
    ],
];

if (
    !in_array(
        $detectedMime,
        $allowedMimes[
            $extension
        ],
        true
    )
) {

    respond(
        422,
        false,
        'The uploaded Resume/CV file type is not allowed.'
    );
}

$safeFileName =
    preg_replace(
        '/[^A-Za-z0-9._-]/',
        '_',
        basename(
            $originalName
        )
    );

if (
    !$safeFileName
) {

    $safeFileName =
        'resume.' .
        $extension;
}


/*
|--------------------------------------------------------------------------
| RATE LIMIT
|--------------------------------------------------------------------------
*/

$clientIp =
    getClientIp();

if (
    $clientIp !== null
) {

    enforceRateLimit(
        $clientIp,
        30,
        100
    );
}


/*
|--------------------------------------------------------------------------
| READ ATTACHMENT
|--------------------------------------------------------------------------
*/

$fileData =
    file_get_contents(
        $tmpName
    );

if (
    $fileData === false
) {

    respond(
        500,
        false,
        'Could not process the Resume/CV.'
    );
}


/*
|--------------------------------------------------------------------------
| EMAIL SUBJECT
|--------------------------------------------------------------------------
*/

$subjectName =
    preg_replace(
        '/[^A-Za-z0-9 ._-]/',
        '',
        $fullName
    )
    ?: 'Applicant';

$subjectJob =
    preg_replace(
        '/[^A-Za-z0-9 ._()&\/-]/',
        '',
        $jobTitle
    )
    ?: 'Job Application';

$subject =
    "Job Application - {$subjectJob} - {$subjectName}";


/*
|--------------------------------------------------------------------------
| EMAIL CONTENT
|--------------------------------------------------------------------------
*/

$submittedAt =
    date(
        'Y-m-d H:i:s T'
    );

$escaped =
    static function ($value) {

        return htmlspecialchars(
            (string)$value,
            ENT_QUOTES,
            'UTF-8'
        );
    };

$htmlBody =
    '<!doctype html>
<html>
<body style="font-family:Arial,sans-serif;color:#0f172a;line-height:1.55">

    <h2 style="margin:0 0 18px">
        New Job Application
    </h2>

    <table
        cellpadding="6"
        cellspacing="0"
        style="
            border-collapse:collapse;
            width:100%;
            max-width:720px;
        "
    >

        <tr>
            <td>
                <strong>Position</strong>
            </td>
            <td>' .
                $escaped(
                    $jobTitle
                ) .
            '</td>
        </tr>

        <tr>
            <td>
                <strong>Job ID</strong>
            </td>
            <td>' .
                $escaped(
                    $jobId
                ) .
            '</td>
        </tr>

        <tr>
            <td>
                <strong>Job Type</strong>
            </td>
            <td>' .
                $escaped(
                    ucfirst(
                        $jobType
                    )
                ) .
            '</td>
        </tr>

        <tr>
            <td>
                <strong>Location</strong>
            </td>
            <td>' .
                $escaped(
                    $jobLocation
                    ?: 'Not specified'
                ) .
            '</td>
        </tr>

        <tr>
            <td>
                <strong>
                    Application Office
                </strong>
            </td>
            <td>' .
                $escaped(
                    $branchLabel
                ) .
            '</td>
        </tr>

        <tr>
            <td>
                <strong>Applicant</strong>
            </td>
            <td>' .
                $escaped(
                    $fullName
                ) .
            '</td>
        </tr>

        <tr>
            <td>
                <strong>Email</strong>
            </td>
            <td>' .
                $escaped(
                    $email
                ) .
            '</td>
        </tr>

        <tr>
            <td>
                <strong>Mobile</strong>
            </td>
            <td>' .
                $escaped(
                    $mobile
                ) .
            '</td>
        </tr>

        <tr>
            <td>
                <strong>Submitted</strong>
            </td>
            <td>' .
                $escaped(
                    $submittedAt
                ) .
            '</td>
        </tr>

    </table>

    <h3 style="margin:22px 0 8px">
        Short Message / Experience
    </h3>

    <p style="white-space:pre-wrap">' .

        $escaped(
            $message !== ''
                ? $message
                : 'No message provided.'
        )

    . '</p>

    <p
        style="
            margin-top:24px;
            color:#64748b;
            font-size:12px;
        "
    >
        The applicant confirmed consent
        to process the submitted information
        and Resume/CV for recruitment purposes.
    </p>

</body>
</html>';


/*
|--------------------------------------------------------------------------
| MIME EMAIL + ATTACHMENT
|--------------------------------------------------------------------------
*/

$boundary =
    '=_Archway_' .
    bin2hex(
        random_bytes(16)
    );

$fromEmail =
    'hr@archwayintl.com.ph';

$encodedFilename =
    rawurlencode(
        $safeFileName
    );

$headers = [

    'MIME-Version: 1.0',

    'From: Archway Website Applications <' .
        $fromEmail .
    '>',

    'Reply-To: ' .
        $email,

    'Content-Type: multipart/mixed; boundary="' .
        $boundary .
    '"',

    'X-Mailer: PHP/' .
        PHP_VERSION,
];

$body =
    '--' .
    $boundary .
    "\r\n";

$body .=
    "Content-Type: text/html; charset=UTF-8\r\n";

$body .=
    "Content-Transfer-Encoding: 8bit\r\n\r\n";

$body .=
    $htmlBody .
    "\r\n\r\n";

$body .=
    '--' .
    $boundary .
    "\r\n";

$body .=
    'Content-Type: ' .
    $detectedMime .
    '; name="' .
    $safeFileName .
    '"' .
    "\r\n";

$body .=
    'Content-Disposition: attachment; filename="' .
    $safeFileName .
    '"; filename*=UTF-8\'\'' .
    $encodedFilename .
    "\r\n";

$body .=
    "Content-Transfer-Encoding: base64\r\n\r\n";

$body .=
    chunk_split(
        base64_encode(
            $fileData
        )
    ) .
    "\r\n";

$body .=
    '--' .
    $boundary .
    "--\r\n";


/*
|--------------------------------------------------------------------------
| SEND
|--------------------------------------------------------------------------
*/

$sent =
    mail(
        $recipient,
        $subject,
        $body,
        implode(
            "\r\n",
            $headers
        )
    );

if (
    !$sent
) {

    respond(
        500,
        false,
        'The server could not send your application. Please try again later.'
    );
}


/*
|--------------------------------------------------------------------------
| SUCCESS
|--------------------------------------------------------------------------
*/

respond(
    200,
    true,
    'Application sent successfully.'
);