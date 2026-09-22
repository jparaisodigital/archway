<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function respond(int $status, bool $success, string $message)
{
    http_response_code($status);

    echo json_encode([
        'success' => $success,
        'message' => $message,
    ], JSON_UNESCAPED_SLASHES);

    exit;
}


/*
|--------------------------------------------------------------------------
| REQUEST METHOD
|--------------------------------------------------------------------------
*/

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, false, 'Method not allowed.');
}


/*
|--------------------------------------------------------------------------
| SAME-ORIGIN CHECK
|--------------------------------------------------------------------------
*/

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if ($origin !== '') {
    $originHost = parse_url($origin, PHP_URL_HOST);

    $allowedHosts = [
        'archwayintl.com.ph',
        'www.archwayintl.com.ph',
    ];

    if (
        !$originHost ||
        !in_array(strtolower($originHost), $allowedHosts, true)
    ) {
        respond(403, false, 'Invalid request origin.');
    }
}


/*
|--------------------------------------------------------------------------
| HONEYPOT
|--------------------------------------------------------------------------
*/

if (trim((string)($_POST['website'] ?? '')) !== '') {
    respond(200, true, 'Application received.');
}


/*
|--------------------------------------------------------------------------
| BASIC BOT TIMING CHECK
|--------------------------------------------------------------------------
*/

$formStarted = (int)($_POST['form_started'] ?? 0);

if ($formStarted > 0) {
    $elapsedMs =
        (int)round(microtime(true) * 1000) - $formStarted;

    if ($elapsedMs >= 0 && $elapsedMs < 2500) {
        respond(
            429,
            false,
            'Please review the form and try again.'
        );
    }
}


/*
|--------------------------------------------------------------------------
| HELPERS
|--------------------------------------------------------------------------
*/

function cleanLine(string $value, int $maxLength): string
{
    $value = trim(
        preg_replace('/[\r\n]+/', ' ', $value) ?? ''
    );

    return mb_substr($value, 0, $maxLength);
}

function cleanText(string $value, int $maxLength): string
{
    $value = trim($value);

    return mb_substr($value, 0, $maxLength);
}


/*
|--------------------------------------------------------------------------
| FORM DATA
|--------------------------------------------------------------------------
*/

$fullName = cleanLine(
    (string)($_POST['full_name'] ?? ''),
    120
);

$email = cleanLine(
    (string)($_POST['email'] ?? ''),
    180
);

$mobile = cleanLine(
    (string)($_POST['mobile'] ?? ''),
    30
);

$message = cleanText(
    (string)($_POST['message'] ?? ''),
    1500
);

$jobId = cleanLine(
    (string)($_POST['job_id'] ?? ''),
    80
);

$jobTitle = cleanLine(
    (string)($_POST['job_title'] ?? ''),
    160
);

$jobType = strtolower(
    cleanLine(
        (string)($_POST['job_type'] ?? ''),
        30
    )
);

$jobLocation = cleanLine(
    (string)($_POST['job_location'] ?? ''),
    180
);

$branch = strtolower(
    cleanLine(
        (string)($_POST['branch'] ?? ''),
        40
    )
);

$privacyConsent =
    (string)($_POST['privacy_consent'] ?? '');


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

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(
        422,
        false,
        'Please enter a valid email address.'
    );
}

if ($privacyConsent !== 'yes') {
    respond(
        422,
        false,
        'Privacy consent is required.'
    );
}


/*
|--------------------------------------------------------------------------
| APPLICATION ROUTING
|--------------------------------------------------------------------------
*/

$branchRecipients = [
    'pasay' =>
        'pasay@archwayintl.com.ph',

    'bulacan' =>
        'bulacan@archwayintl.com.ph',

    'pampanga' =>
        'pampanga@archwayintl.com.ph',

    'laguna' =>
        'laguna@archwayintl.com.ph',

    'batangas' =>
        'batangas@archwayintl.com.ph',

    'cavite' =>
        'cavite@archwayintl.com.ph',
];


if ($jobType === 'overseas') {

    /*
     * Overseas applications always go to Main HR.
     */

    $recipient =
        'hr@archwayintl.com.ph';

    $branchLabel =
        'Pasay / Main HR';

} else {

    /*
     * Local applications go to the
     * branch selected by the applicant.
     */

    if (!isset($branchRecipients[$branch])) {
        respond(
            422,
            false,
            'Please select a valid application branch.'
        );
    }

    $recipient =
        $branchRecipients[$branch];

    $branchLabel =
        ucfirst($branch);

    if ($branch === 'pasay') {
        $branchLabel =
            'Pasay / Main HR';
    }
}


/*
|--------------------------------------------------------------------------
| RESUME / CV
|--------------------------------------------------------------------------
*/

if (
    !isset($_FILES['resume']) ||
    !is_array($_FILES['resume'])
) {
    respond(
        422,
        false,
        'Please attach your Resume/CV.'
    );
}

$resume = $_FILES['resume'];

if (
    ($resume['error'] ?? UPLOAD_ERR_NO_FILE)
    !== UPLOAD_ERR_OK
) {
    respond(
        422,
        false,
        'Resume/CV upload failed. Please try again.'
    );
}


/*
|--------------------------------------------------------------------------
| FILE SIZE
|--------------------------------------------------------------------------
*/

$maxFileSize =
    5 * 1024 * 1024;

$fileSize =
    (int)($resume['size'] ?? 0);

if (
    $fileSize <= 0 ||
    $fileSize > $maxFileSize
) {
    respond(
        422,
        false,
        'Resume/CV must be 5 MB or smaller.'
    );
}


/*
|--------------------------------------------------------------------------
| FILE TYPE
|--------------------------------------------------------------------------
*/

$originalName =
    (string)($resume['name'] ?? 'resume');

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
    (string)($resume['tmp_name'] ?? '');

if (
    $tmpName === '' ||
    !is_uploaded_file($tmpName)
) {
    respond(
        422,
        false,
        'Invalid Resume/CV upload.'
    );
}


/*
|--------------------------------------------------------------------------
| MIME VALIDATION
|--------------------------------------------------------------------------
*/

$finfo =
    new finfo(FILEINFO_MIME_TYPE);

$detectedMime =
    $finfo->file($tmpName)
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
        $allowedMimes[$extension],
        true
    )
) {
    respond(
        422,
        false,
        'The uploaded Resume/CV file type is not allowed.'
    );
}


/*
|--------------------------------------------------------------------------
| SAFE FILE NAME
|--------------------------------------------------------------------------
*/

$safeFileName =
    preg_replace(
        '/[^A-Za-z0-9._-]/',
        '_',
        basename($originalName)
    );

if (!$safeFileName) {
    $safeFileName =
        'resume.' . $extension;
}


/*
|--------------------------------------------------------------------------
| READ ATTACHMENT
|--------------------------------------------------------------------------
*/

$fileData =
    file_get_contents($tmpName);

if ($fileData === false) {
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
    date('Y-m-d H:i:s T');

$escaped = static function ($value) {
    return htmlspecialchars(
        $value,
        ENT_QUOTES,
        'UTF-8'
    );
};


$htmlBody = '
<!doctype html>

<html>
<body
    style="
        font-family: Arial, sans-serif;
        color: #0f172a;
        line-height: 1.55;
    "
>

    <h2 style="margin:0 0 18px">
        New Job Application
    </h2>

    <table
        cellpadding="6"
        cellspacing="0"
        style="
            border-collapse: collapse;
            width: 100%;
            max-width: 720px;
        "
    >

        <tr>
            <td><strong>Position</strong></td>
            <td>' .
                $escaped($jobTitle) .
            '</td>
        </tr>

        <tr>
            <td><strong>Job ID</strong></td>
            <td>' .
                $escaped($jobId) .
            '</td>
        </tr>

        <tr>
            <td><strong>Job Type</strong></td>
            <td>' .
                $escaped(
                    ucfirst($jobType)
                ) .
            '</td>
        </tr>

        <tr>
            <td><strong>Location</strong></td>
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
                    Application Branch
                </strong>
            </td>

            <td>' .
                $escaped($branchLabel) .
            '</td>
        </tr>

        <tr>
            <td><strong>Applicant</strong></td>
            <td>' .
                $escaped($fullName) .
            '</td>
        </tr>

        <tr>
            <td><strong>Email</strong></td>
            <td>' .
                $escaped($email) .
            '</td>
        </tr>

        <tr>
            <td><strong>Mobile</strong></td>
            <td>' .
                $escaped($mobile) .
            '</td>
        </tr>

        <tr>
            <td><strong>Submitted</strong></td>
            <td>' .
                $escaped($submittedAt) .
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
        ) .
    '</p>

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
    bin2hex(random_bytes(16));

$fromEmail =
    'hr@archwayintl.com.ph';

$encodedFilename =
    rawurlencode($safeFileName);


$headers = [

    'MIME-Version: 1.0',

    'From: Archway Website Applications <' .
        $fromEmail .
    '>',

    'Reply-To: ' . $email,

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


/*
|--------------------------------------------------------------------------
| ATTACH RESUME
|--------------------------------------------------------------------------
*/

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
        base64_encode($fileData)
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

$sent = mail(
    $recipient,
    $subject,
    $body,
    implode(
        "\r\n",
        $headers
    )
);


if (!$sent) {
    respond(
        500,
        false,
        'The server could not send your application. Please try again later.'
    );
}


respond(
    200,
    true,
    'Application sent successfully.'
);