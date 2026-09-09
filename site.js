// site.js

// ===== SHARED =====
function renderNav(activePage) {
    return `
        <nav
            class="sticky top-0 z-50
                   bg-slate-950/95 backdrop-blur-md
                   border-b border-white/10"
        >
            <div
                class="max-w-7xl mx-auto px-6
                       h-16
                       flex items-center justify-between"
            >
                <!-- Logo -->
                <a
                    href="index.html"
                    class="flex items-center shrink-0"
                    aria-label="Archway Home"
                >
                    <img
                        src="${config.logo.src}"
                        alt="${escapeHTML(config.logo.alt)}"
                        style="height: ${config.logo.height}px; width: auto;"
                        class="object-contain"
                    >
                </a>
    
    
                <!-- Desktop Navigation -->
                <div class="hidden md:flex items-center gap-8 h-full">
                    ${config.nav.map(item => {
    const isActive = item.href === activePage;
    
    return `
                            <a
                                href="${item.href}"
                                class="
                                    relative h-full
                                    inline-flex items-center
                                    text-sm font-semibold
                                    transition-colors
                                    ${isActive
    ? 'text-white'
    : 'text-white/60 hover:text-white'
}
                                "
                            >
                                ${escapeHTML(item.label)}

                                ${isActive ? `
                                    <span
                                        class="absolute bottom-0 left-0 right-0
                                               h-0.5 bg-accent"
                                    ></span>
                                ` : ''}
                            </a>
                        `;
}).join('')}
                </div>


                <!-- Desktop Contact -->
                <a
                    href="index.html#contact"
                    class="hidden md:inline-flex
                           items-center justify-center
                           px-5 py-2.5 rounded-lg
                           border border-white/25
                           text-white
                           text-sm font-semibold
                           hover:bg-white/10
                           hover:border-white/40
                           transition-colors"
                >
                    Contact Us
                </a>


                <!-- Mobile Menu Button -->
                <button
                    type="button"
                    onclick="toggleMobileMenu()"
                    class="md:hidden
                           w-10 h-10
                           inline-flex items-center justify-center
                           rounded-lg
                           text-white
                           hover:bg-white/10
                           transition-colors"
                    aria-label="Toggle navigation menu"
                >
                    <svg
                        id="menu-icon-open"
                        class="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>

                    <svg
                        id="menu-icon-close"
                        class="w-6 h-6 hidden"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>


            <!-- Mobile Navigation -->
            <div
                id="mobileMenu"
                class="md:hidden hidden
                       bg-slate-950
                       border-t border-white/10"
            >
                <div class="px-6 py-4">

                    <div class="flex flex-col">
                        ${config.nav.map(item => {
const isActive = item.href === activePage;

return `
                                <a
                                    href="${item.href}"
                                    class="
                                        py-3
                                        border-b border-white/10
                                        text-sm font-semibold
                                        transition-colors
                                        ${isActive
? 'text-white'
: 'text-white/60 hover:text-white'
}
                                    "
                                >
                                    ${escapeHTML(item.label)}
                                </a>
                            `;
}).join('')}
                    </div>

                    <a
                        href="index.html#contact"
                        class="mt-4
                               inline-flex w-full
                               items-center justify-center
                               px-5 py-3 rounded-lg
                               border border-white/25
                               text-white
                               text-sm font-semibold
                               hover:bg-white/10
                               hover:border-white/40
                               transition-colors"
                    >
                        Contact Us
                    </a>

                </div>
            </div>
        </nav>
    `;
}

// ===== MOBILE MENU TOGGLE =====
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const iconOpen = document.getElementById('menu-icon-open');
    const iconClose = document.getElementById('menu-icon-close');
    
    menu.classList.toggle('hidden');
    iconOpen.classList.toggle('hidden');
    iconClose.classList.toggle('hidden');
}

// ===== FOOTER =====
function renderFooter() {
    return `
        <footer
            class="bg-slate-950
                   border-t border-white/10
                   text-slate-400"
        >
            <div
                class="max-w-7xl mx-auto px-6
                       py-6
                       flex flex-col sm:flex-row
                       sm:items-center sm:justify-between
                       gap-2 sm:gap-6
                       text-sm"
            >
                <p>
                    ${escapeHTML(config.footer.copyright)}
                </p>
    
                <p class="text-xs text-slate-500 sm:text-right">
                    ${escapeHTML(config.poeaLicense)}
                </p>
            </div>
        </footer>
    `;
}

// ===== SECURITY: ESCAPE UNTRUSTED TEXT =====
function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, (char) => {
        const entities = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        
        return entities[char];
    });
}

// ===== SITE SETTINGS DATA (GOOGLE SHEETS) =====
async function fetchSiteSettings() {
    try {
        const url = `${config.siteSettingsSheetUrl}&_=${Date.now()}`;
        
        const res = await fetch(url, {
            cache: 'no-store'
        });
        
        const csvText = await res.text();
        
        const rows = csvText
        .split(/\r?\n/)
        .map(row => row.trim())
        .filter(Boolean);
        
        const settings = {};
        
        rows.slice(1).forEach(row => {
            const firstComma = row.indexOf(',');
            
            if (firstComma === -1) return;
            
            const key = row.slice(0, firstComma).trim();
            
            let value = row.slice(firstComma + 1).trim();
            
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value
                .slice(1, -1)
                .replace(/""/g, '"');
            }
            
            if (key) {
                settings[key] = value;
            }
        });
        
        return settings;
    } catch (err) {
        console.error('Failed to fetch site settings:', err);
        return {};
    }
}

// ===== APPLY SITE SETTINGS =====
function applySiteSettings(settings) {
    if (!settings || Object.keys(settings).length === 0) return;

    if (settings.address) {
        config.contact.address = settings.address;
    }

    if (settings.telephone) {
        config.contact.phones = [settings.telephone];
    }

    if (settings.inquiry_email) {
        config.contact.emails[0] = settings.inquiry_email;
    }

    if (settings.hr_email) {
        config.contact.emails[1] = settings.hr_email;

        const mainBranch = config.applicantsPage.branches.find(
            branch => branch.value === 'pasay'
        );

        if (mainBranch) {
            mainBranch.email = settings.hr_email;
        }
    }

    if (settings.map_location) {
        config.contact.mapEmbedUrl =
            `https://maps.google.com/maps?q=${encodeURIComponent(settings.map_location)}&output=embed`;
    }

    if (settings.poea_license) {
        config.poeaLicense = settings.poea_license;
    }
}

// ===== JOBS DATA (GOOGLE SHEETS) =====
async function fetchJobs() {
    try {
        const url = `${config.jobsSheetUrl}&_=${Date.now()}`;
        
        const res = await fetch(url, {
            cache: 'no-store'
        });
        const csvText = await res.text();
        
        // Proper CSV parser that handles quoted fields + newlines
        function parseCSV(text) {
            const rows = [];
            let currentRow = [];
            let currentValue = '';
            let insideQuotes = false;
            
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                const nextChar = text[i + 1];
                
                if (char === '"' && insideQuotes && nextChar === '"') {
                    // Escaped quote ("")
                    currentValue += '"';
                    i++;
                } else if (char === '"') {
                    insideQuotes = !insideQuotes;
                } else if (char === ',' && !insideQuotes) {
                    currentRow.push(currentValue.trim());
                    currentValue = '';
                } else if ((char === '\n' || char === '\r') && !insideQuotes) {
                    if (currentValue || currentRow.length > 0) {
                        currentRow.push(currentValue.trim());
                        rows.push(currentRow);
                        currentRow = [];
                        currentValue = '';
                    }
                    // skip \r\n
                    if (char === '\r' && nextChar === '\n') i++;
                } else {
                    currentValue += char;
                }
            }
            
            // last value
            if (currentValue || currentRow.length > 0) {
                currentRow.push(currentValue.trim());
                rows.push(currentRow);
            }
            
            return rows;
        }
        
        const allRows = parseCSV(csvText);
        if (allRows.length < 2) return [];
        
        const cols = config.jobsConfig.columns;
        
        return allRows.slice(1).map(values => {
            const job = {
                id: values[cols.id] || '',
                title: values[cols.title] || '',
                type: values[cols.type] || '',
                is_active: (values[cols.is_active] || 'TRUE').toUpperCase() === 'TRUE',
                specialization: values[cols.specialization] || '',
                location: values[cols.location] || '',
                experience: values[cols.experience] || '',
                certifications: values[cols.certifications] || '',
                description: values[cols.description] || '',
                requirements: values[cols.requirements] || ''
            };
            return job;
        }).filter(job => job.id && job.title && job.is_active);
        
    } catch (err) {
        console.error('Failed to fetch jobs:', err);
        return [];
    }
}

function renderJobTable(title, jobs) {
    const openingLabel =
    jobs.length === 1
    ? '1 current opening'
    : `${jobs.length} current openings`;
    
    return `
        <div class="bg-white border border-slate-200 rounded-xl overflow-hidden">
    
            <div class="px-6 py-5 border-b border-slate-200">
                <h3 class="text-xl font-bold tracking-tight text-slate-900">
                    ${escapeHTML(title)}
                </h3>
    
                <p class="mt-1 text-sm text-slate-500">
                    ${openingLabel}
                </p>
            </div>
    
            <div>
                ${jobs.length === 0 ? `
                    <div class="px-6 py-10 text-sm text-slate-500">
                        No current openings at this time.
                    </div>
                ` : jobs.map(job => `
                    <div
                        class="flex items-center justify-between gap-5
                               min-h-[60px] px-6 py-4
                               border-b border-slate-100 last:border-b-0
                               transition-colors duration-200
                               hover:bg-slate-50"
                    >
                        <div class="min-w-0">
                            <p class="font-medium text-slate-800 leading-snug">
                                ${escapeHTML(job.title)}
                            </p>
                        </div>
    
                        <button
                            type="button"
                            data-job-id="${escapeHTML(job.id)}"
                            onclick="openJobPopupFromButton(this)"
                            class="shrink-0 inline-flex items-center
                                   px-4 py-2 rounded-lg
                                   border border-slate-300
                                   text-sm font-semibold text-slate-700
                                   hover:border-primary hover:text-primary
                                   transition-colors duration-200"
                        >
                            View Details
                        </button>
                    </div>
                `).join('')}
            </div>
    
        </div>
    `;
}

// ===== HOME PAGE =====
function renderJobsLoading(title) {
    return `
        <div class="bg-white border border-slate-200 rounded-xl overflow-hidden">
    
            <div class="px-6 py-5 border-b border-slate-200">
                <h3 class="text-xl font-bold tracking-tight text-slate-900">
                    ${escapeHTML(title)}
                </h3>
    
                <p class="mt-1 text-sm text-slate-500">
                    Checking current openings...
                </p>
            </div>
    
            <div
                class="min-h-[60px] px-6 py-5
                       flex items-center
                       text-sm text-slate-400"
            >
                Loading job listings...
            </div>
    
        </div>
    `;
}

function renderHomePage() {
    const app = document.getElementById('app');
    const c = config;
    
    app.innerHTML = `
    ${renderNav('index.html')}
    
    <div class="fade-in-content">
    <section
    class="relative min-h-[80vh] flex items-center overflow-hidden"
    id="home"
>
    <div class="absolute inset-0 bg-primary"></div>
    
    ${c.hero.images.map((img, i) => `
        <div
            class="hero-bg-image ${i === 0 ? 'active' : ''}"
            style="background-image:url('${img}');"
        ></div>
    `).join('')}
    
    <!-- Hero gradient overlay -->
    <div
        class="absolute inset-0 bg-gradient-to-r
               from-slate-950/90
               via-primary-dark/80
               to-primary/20">
    </div>
    
    <div class="relative z-10 w-full">
        <div class="max-w-7xl mx-auto px-6 py-24 lg:py-32">
            <div class="max-w-3xl">
    
                <p
                    class="text-accent text-xs sm:text-sm
                           font-bold tracking-[0.22em]
                           uppercase mb-5"
                >
                    ${c.hero.eyebrow}
                </p>
    
                <h1
                    class="text-4xl sm:text-5xl lg:text-6xl
                           font-extrabold text-white
                           leading-[1.08] tracking-tight mb-6"
                >
                    ${c.hero.title}
                </h1>
    
                <p
                    class="text-lg sm:text-xl
                           text-white/85 leading-relaxed
                           max-w-2xl mb-9"
                >
                    ${c.hero.subtitle}
                </p>
    
                <div class="flex flex-wrap gap-4 mb-8">
    
                    <a
                        href="#jobs"
                        class="inline-flex items-center justify-center
       px-7 py-3.5 rounded-lg
       bg-white text-primary
       font-semibold
       hover:bg-slate-100
       transition-colors duration-200"
                    >
                        ${c.hero.ctaPrimary}
                    </a>
    
                    <a 
    href="applicants.html" 
    class="inline-flex items-center justify-center 
           px-7 py-3.5 rounded-lg 
           border border-white/60 
           text-white font-semibold 
           hover:bg-white/10 
           transition-colors duration-200" 
> 
    ${c.hero.ctaSecondary} 
</a>
    
                </div>
    
                <div
                    class="flex flex-wrap gap-x-6 gap-y-3
                           text-sm text-white/80"
                >
                    ${c.hero.trustItems.map(item => `
                        <div class="flex items-center gap-2">
                            <span
                                class="w-5 h-5 rounded-full
                                       bg-white/10 border border-white/20
                                       flex items-center justify-center
                                       text-accent text-xs font-bold"
                            >
                                ✓
                            </span>
    
                            <span>${item}</span>
                        </div>
                    `).join('')}
                </div>
    
            </div>
        </div>
    </div>
</section>
  
      <section class="relative z-10 border-b border-slate-200 bg-white reveal">
    <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-2 lg:grid-cols-4">
    
            ${c.stats.map((s, i) => `
                <div
                    class="
                        py-8 lg:py-10
                        ${i % 2 === 0 ? 'pr-6' : 'pl-6'}
                        lg:px-8
                        ${i > 0 ? 'lg:border-l lg:border-slate-200' : ''}
                        ${i >= 2 ? 'border-t border-slate-200 lg:border-t-0' : ''}
                    "
                >
                    <div
                        class="text-2xl sm:text-3xl lg:text-4xl
                               font-extrabold tracking-tight text-slate-900"
                    >
                        ${s.value}
                    </div>
    
                    <div
                        class="mt-1.5 text-sm
                               font-medium text-slate-500"
                    >
                        ${s.label}
                    </div>
                </div>
            `).join('')}
    
        </div>
    </div>
</section>
  
      <section class="py-16 lg:py-24 bg-slate-50 reveal" id="jobs">
    <div class="max-w-7xl mx-auto px-6">
    
        <div class="max-w-2xl mb-12 lg:mb-14">
            <p
                class="text-xs sm:text-sm font-bold
                       tracking-[0.20em] uppercase
                       text-primary mb-3"
            >
                Current Opportunities
            </p>
    
            <h2
                class="text-3xl sm:text-4xl lg:text-5xl
                       font-extrabold tracking-tight
                       text-slate-900"
            >
                ${c.jobs.title}
            </h2>
    
            <p
                class="mt-4 text-base sm:text-lg
                       text-slate-600 leading-relaxed"
            >
                Explore current local and overseas opportunities
                for Filipino professionals and skilled workers.
            </p>
        </div>
    
        <div class="grid md:grid-cols-2 gap-6 lg:gap-8" id="jobsGrid">
            ${renderJobsLoading(c.jobs.local.title)}
            ${renderJobsLoading(c.jobs.overseas.title)}
        </div>
    
    </div>
</section>
    
<section class="py-16 lg:py-24 bg-white reveal" id="how-to-apply">
    <div class="max-w-7xl mx-auto px-6">
    
        <div class="max-w-2xl mb-12 lg:mb-14">
            <p
                class="text-xs sm:text-sm font-bold
                       tracking-[0.20em] uppercase
                       text-primary mb-3"
            >
                ${c.homeApply.eyebrow}
            </p>
    
            <h2
                class="text-3xl sm:text-4xl lg:text-5xl
                       font-extrabold tracking-tight
                       text-slate-900"
            >
                ${c.homeApply.title}
            </h2>
    
            <p
                class="mt-4 text-base sm:text-lg
                       text-slate-600 leading-relaxed"
            >
                ${c.homeApply.subtitle}
            </p>
        </div>
    
        <div
            class="grid lg:grid-cols-3
                   border-y border-slate-200
                   divide-y lg:divide-y-0
                   lg:divide-x divide-slate-200"
        >
            ${c.homeApply.steps.map((step, i) => `
                <div
                    class="py-8 lg:py-10
                           ${i === 0 ? 'lg:pr-8' : ''}
                           ${i === 1 ? 'lg:px-8' : ''}
                           ${i === 2 ? 'lg:pl-8' : ''}"
                >
                    <div
                        class="text-3xl lg:text-4xl
                               font-extrabold tracking-tight
                               text-primary mb-6"
                    >
                        ${escapeHTML(step.number)}
                    </div>
    
                    <h3
                        class="text-xl font-bold
                               tracking-tight text-slate-900 mb-3"
                    >
                        ${escapeHTML(step.title)}
                    </h3>
    
                    <p
                        class="text-sm sm:text-base
                               text-slate-600 leading-relaxed
                               max-w-sm"
                    >
                        ${escapeHTML(step.desc)}
                    </p>
                </div>
            `).join('')}
        </div>
    
        <div class="mt-9">
            <a
                href="applicants.html"
                class="inline-flex items-center justify-center
                       px-6 py-3 rounded-lg
                       bg-primary text-white
                       text-sm font-semibold
                       hover:bg-primary-dark
                       transition-colors"
            >
                ${escapeHTML(c.homeApply.cta)}
            </a>
        </div>
    
    </div>
</section>
  
      <section class="py-16 lg:py-24 bg-slate-50 reveal" id="about">
    <div class="max-w-7xl mx-auto px-6">
    
        <div class="grid lg:grid-cols-[0.8fr_1.4fr] gap-12 lg:gap-20 items-start">
    
            <!-- Section anchor -->
            <div>
                <p
                    class="text-xs sm:text-sm font-bold
                           tracking-[0.20em] uppercase
                           text-primary mb-3"
                >
                    About Archway
                </p>
    
                <h2
                    class="text-3xl sm:text-4xl lg:text-5xl
                           font-extrabold tracking-tight
                           text-slate-900"
                >
                    ${c.about.title}
                </h2>
            </div>
    
            <!-- Company story -->
            <div>
                <div class="space-y-5 text-base text-slate-600 leading-7">
                    ${c.about.paragraphs.slice(0, 2).map(p => `
                        <p>${escapeHTML(p)}</p>
                    `).join('')}
                </div>
    
                <a
                    href="about.html"
                    class="inline-flex items-center
                           mt-7 text-sm font-semibold
                           text-primary
                           hover:text-primary-dark
                           transition-colors"
                >
                    Learn More About Archway
                    <span class="ml-2" aria-hidden="true">&rarr;</span>
                </a>
    
                <!-- Credibility row -->
                <div
                    class="mt-10 pt-8
                           border-t border-slate-200
                           flex flex-col sm:flex-row
                           sm:items-center gap-6"
                >
                    <img
                        src="${c.poeaBadge.src}"
                        alt="${escapeHTML(c.poeaBadge.alt)}"
                        class="w-auto h-24 object-contain self-start"
                    >
    
                    <div>
                        <p
                            class="text-xs font-bold uppercase
                                   tracking-[0.14em] text-primary mb-2"
                        >
                            Licensed Recruitment Agency
                        </p>
    
                        <p class="font-semibold text-slate-900">
                            POEA Licensed • Zero Complaint Record
                        </p>
    
                        <p class="mt-1 text-sm text-slate-500">
                            ${escapeHTML(c.poeaLicense)}
                        </p>
                    </div>
                </div>
    
            </div>
    
        </div>
    
    </div>
</section>
  
      <section class="py-16 lg:py-24 bg-slate-950 text-white reveal" id="contact">
    <div class="max-w-7xl mx-auto px-6">
    
        <div class="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-start">
    
            <!-- Contact information -->
            <div>
                <p
                    class="text-xs sm:text-sm font-bold
                           tracking-[0.20em] uppercase
                           text-accent mb-3"
                >
                    Contact Archway
                </p>
    
                <h2
                    class="text-3xl sm:text-4xl lg:text-5xl
                           font-extrabold tracking-tight
                           text-white"
                >
                    ${escapeHTML(c.contact.title)}
                </h2>
    
                <p
                    class="mt-5 text-base sm:text-lg
                           text-white/65 leading-relaxed
                           max-w-xl"
                >
                    For applicant guidance, employer inquiries, or office concerns,
                    reach us through the contact information below.
                </p>
    
                <div class="mt-10 border-y border-white/15">
    
                    <div class="py-5">
                        <p
                            class="text-xs font-bold uppercase
                                   tracking-[0.14em]
                                   text-white/45 mb-2"
                        >
                            Address
                        </p>
    
                        <p class="text-sm sm:text-base text-white/85 leading-relaxed">
                            ${escapeHTML(c.contact.address)}
                        </p>
                    </div>
    
                    <div class="py-5 border-t border-white/15">
                        <p
                            class="text-xs font-bold uppercase
                                   tracking-[0.14em]
                                   text-white/45 mb-2"
                        >
                            Phone
                        </p>
    
                        <div class="space-y-1 text-sm sm:text-base text-white/85">
                            ${c.contact.phones.map(phone => `
                                <p>${escapeHTML(phone)}</p>
                            `).join('')}
                        </div>
                    </div>
    
                    <div class="py-5 border-t border-white/15">
                        <p
                            class="text-xs font-bold uppercase
                                   tracking-[0.14em]
                                   text-white/45 mb-2"
                        >
                            Email
                        </p>
    
                        <div class="space-y-2 text-sm sm:text-base">
                            ${c.contact.emails.map(email => `
                                <a
                                    href="mailto:${email}"
                                    class="block w-fit
                                           text-white/85
                                           hover:text-white
                                           transition-colors"
                                >
                                    ${escapeHTML(email)}
                                </a>
                            `).join('')}
                        </div>
                    </div>
    
                </div>
    
                <!-- Audience pathways -->
                <div class="mt-8 flex flex-wrap gap-3">
                    <a
                        href="applicants.html"
                        class="inline-flex items-center justify-center
                               px-6 py-3 rounded-lg
                               bg-white text-primary
                               text-sm font-semibold
                               hover:bg-slate-100
                               transition-colors"
                    >
                        How to Apply
                    </a>
    
                    <a
                        href="employers.html"
                        class="inline-flex items-center justify-center
                               px-6 py-3 rounded-lg
                               border border-white/30
                               text-white text-sm font-semibold
                               hover:border-white/60
                               hover:bg-white/5
                               transition-colors"
                    >
                        For Employers
                    </a>
                </div>
            </div>
    
            <!-- Office map -->
            <div>
                <p
                    class="text-xs font-bold uppercase
                           tracking-[0.14em]
                           text-white/45 mb-3"
                >
                    Office Location
                </p>
    
                <div
                    class="overflow-hidden rounded-xl
                           border border-white/15
                           bg-white/5"
                >
                    <iframe
    src="${c.contact.mapEmbedUrl}"
    width="100%"
    class="h-[340px] lg:h-[480px]"
    style="border:0; display:block;"
    allowfullscreen=""
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
    title="Archway Office Location"
>
</iframe>
                </div>
            </div>
    
        </div>
    
    </div>
</section>
  
            ${renderFooter()}
      </div>
    `;
    
    initScrollReveal();
    
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' });
        }, 0);
    }
    
    // Hero background image carousel
    if (c.hero.images && c.hero.images.length > 1) {
        let heroIndex = 0;
        const heroSlides = document.querySelectorAll('.hero-bg-image');
        setInterval(() => {
            heroSlides[heroIndex].classList.remove('active');
            heroIndex = (heroIndex + 1) % heroSlides.length;
            heroSlides[heroIndex].classList.add('active');
        }, c.hero.slideInterval || 4000);
    } 
    
    fetchJobs().then(jobs => {
        window._allJobs = jobs;
        
        const localJobs = jobs.filter(j => j.type === 'Local');
        const overseasJobs = jobs.filter(j => j.type === 'Overseas');
        
        const grid = document.getElementById('jobsGrid');
        
        if (grid) {
            grid.innerHTML =
            renderJobTable(c.jobs.local.title, localJobs) +
            renderJobTable(c.jobs.overseas.title, overseasJobs);
        }
    });
    
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

// ===== ABOUT PAGE =====
function renderAboutPage() {
    const app = document.getElementById('app');
    const p = config.aboutPage;
    
    app.innerHTML = `
        ${renderNav('about.html')}
    
        <div class="fade-in-content">
    
            <!-- Editorial Header -->
            <header class="bg-white border-b border-slate-200">
                <div class="max-w-7xl mx-auto px-6 py-16 lg:py-20">
    
                    <div
                        class="grid lg:grid-cols-[1fr_0.9fr]
                               gap-8 lg:gap-20
                               items-end"
                    >
                        <div>
                            <p
                                class="text-xs sm:text-sm font-bold
                                       tracking-[0.20em] uppercase
                                       text-primary mb-3"
                            >
                                About Archway
                            </p>
    
                            <h1
                                class="text-4xl sm:text-5xl lg:text-6xl
                                       font-extrabold tracking-tight
                                       text-slate-900"
                            >
                                ${escapeHTML(p.headerTitle)}
                            </h1>
                        </div>
    
                        <p
                            class="text-base sm:text-lg
                                   text-slate-600 leading-relaxed"
                        >
                            ${escapeHTML(p.headerSubtitle)}
                        </p>
                    </div>
    
                </div>
            </header>
    
    
            <!-- Who We Are -->
            <section class="py-16 lg:py-24 bg-white">
                <div class="max-w-7xl mx-auto px-6">
    
                    <div
                        class="grid lg:grid-cols-[0.75fr_1.25fr]
                               gap-12 lg:gap-20
                               items-start"
                    >
    
                        <div class="lg:sticky lg:top-28">
                            <p
                                class="text-xs sm:text-sm font-bold
                                       tracking-[0.20em] uppercase
                                       text-primary mb-3"
                            >
                                Company Profile
                            </p>
    
                            <h2
                                class="text-3xl sm:text-4xl lg:text-5xl
                                       font-extrabold tracking-tight
                                       text-slate-900"
                            >
                                ${escapeHTML(p.whoWeAreTitle)}
                            </h2>
    
                            <p
                                class="mt-5 max-w-md
                                       text-base text-slate-500
                                       leading-relaxed"
                            >
                                Connecting Filipino talent with responsible
                                employment opportunities through professional
                                recruitment and placement services.
                            </p>
                        </div>
    
    
                        <div
                            class="space-y-6
                                   text-base sm:text-lg
                                   text-slate-600
                                   leading-8 reveal"
                        >
                            ${p.whoWeAreParagraphs.map(para => `
                                <p>${escapeHTML(para)}</p>
                            `).join('')}
                        </div>
    
                    </div>
                </div>
            </section>
    
    
            <!-- Credibility -->
            <section
                class="py-12 lg:py-16
                       bg-slate-50
                       border-y border-slate-200"
            >
                <div class="max-w-7xl mx-auto px-6">
    
                    <div
                        class="grid sm:grid-cols-[auto_1fr]
                               gap-8 sm:gap-10
                               items-center
                               max-w-4xl"
                    >
                        <img
                            src="${config.poeaBadge.src}"
                            alt="${escapeHTML(config.poeaBadge.alt)}"
                            class="h-24 sm:h-28
                                   w-auto object-contain"
                        >
    
                        <div>
                            <p
                                class="text-xs font-bold uppercase
                                       tracking-[0.14em]
                                       text-primary mb-2"
                            >
                                Licensed Recruitment Agency
                            </p>
    
                            <p
                                class="text-lg sm:text-xl
                                       font-bold tracking-tight
                                       text-slate-900"
                            >
                                POEA Licensed
                            </p>
    
                            <p
                                class="mt-1
                                       text-sm text-slate-500"
                            >
                                ${escapeHTML(config.poeaLicense)}
                            </p>
    
                            <div
                                class="mt-5 pt-5
                                       border-t border-slate-200
                                       text-sm sm:text-base
                                       text-slate-700
                                       leading-relaxed"
                            >
                                ${p.highlight}
                            </div>
                        </div>
    
                    </div>
                </div>
            </section>
    
    
            <!-- Closing CTA -->
            <section class="py-12 lg:py-14 bg-white">
                <div class="max-w-7xl mx-auto px-6">
    
                    <div
                        class="flex flex-col lg:flex-row
                               lg:items-center
                               lg:justify-between
                               gap-7 lg:gap-12"
                    >
                        <div>
                            <p
                                class="text-lg sm:text-xl
                                       font-bold tracking-tight
                                       text-slate-900"
                            >
                                Looking for opportunities or manpower solutions?
                            </p>
    
                            <p
                                class="mt-2
                                       text-sm sm:text-base
                                       text-slate-600"
                            >
                                Explore current job openings or learn how
                                Archway can support your manpower requirements.
                            </p>
                        </div>
    
                        <div class="flex flex-wrap gap-3">
                            <a
                                href="index.html#jobs"
                                class="inline-flex items-center justify-center
                                       px-6 py-3 rounded-lg
                                       bg-primary text-white
                                       text-sm font-semibold
                                       hover:bg-primary-dark
                                       transition-colors"
                            >
                                View Job Openings
                            </a>
    
                            <a
                                href="employers.html"
                                class="inline-flex items-center justify-center
                                       px-6 py-3
                                       text-sm font-semibold
                                       text-slate-700
                                       hover:text-primary
                                       transition-colors"
                            >
                                For Employers
                                <span class="ml-2" aria-hidden="true">&rarr;</span>
                            </a>
                        </div>
                    </div>
    
                </div>
            </section>
    
    
            ${renderFooter()}
    
        </div>
    `;
    
    initScrollReveal();
}
// ===== EMPLOYERS PAGE =====
function renderEmployersPage() {
    const app = document.getElementById('app');
    const p = config.employersPage;
    
    app.innerHTML = `
        ${renderNav('employers.html')}
    
        <div class="fade-in-content">
    
            <!-- Editorial Header -->
            <header class="bg-white border-b border-slate-200">
                <div class="max-w-7xl mx-auto px-6 py-16 lg:py-20">
    
                    <div
                        class="grid lg:grid-cols-[1fr_0.9fr]
                               gap-8 lg:gap-20
                               items-end"
                    >
                        <div>
                            <p
                                class="text-xs sm:text-sm font-bold
                                       tracking-[0.20em] uppercase
                                       text-primary mb-3"
                            >
                                For Employers
                            </p>
    
                            <h1
                                class="text-4xl sm:text-5xl lg:text-6xl
                                       font-extrabold tracking-tight
                                       text-slate-900"
                            >
                                ${escapeHTML(p.headerTitle)}
                            </h1>
                        </div>
    
                        <p
                            class="text-base sm:text-lg
                                   text-slate-600 leading-relaxed"
                        >
                            ${escapeHTML(p.headerSubtitle)}
                        </p>
                    </div>
    
                </div>
            </header>
    
    
            <!-- Documentary Requirements -->
            <section class="py-16 lg:py-24 bg-white">
                <div class="max-w-7xl mx-auto px-6">
    
                    <div
                        class="grid lg:grid-cols-[0.72fr_1.28fr]
                               gap-12 lg:gap-20
                               items-start"
                    >
    
                        <!-- Introduction -->
                        <div class="lg:sticky lg:top-28">
                            <p
                                class="text-xs sm:text-sm font-bold
                                       tracking-[0.20em] uppercase
                                       text-primary mb-3"
                            >
                                Employer Requirements
                            </p>
    
                            <h2
                                class="text-3xl sm:text-4xl
                                       lg:text-5xl
                                       font-extrabold tracking-tight
                                       text-slate-900"
                            >
                                ${escapeHTML(p.reqTitle)}
                            </h2>
    
                            <div
                                class="mt-6 space-y-5
                                       text-sm sm:text-base
                                       text-slate-600 leading-relaxed"
                            >
                                ${p.reqIntro.map(para => `
                                    <p>${escapeHTML(para)}</p>
                                `).join('')}
                            </div>
                        </div>
    
    
                        <!-- Requirements List -->
                        <div>
                            <div class="border-t border-slate-200">
    
                                ${p.requirements.map((req, i) => `
                                    <div
                                        class="grid
                                               grid-cols-[56px_1fr]
                                               sm:grid-cols-[76px_1fr]
                                               gap-4 sm:gap-6
                                               py-6 sm:py-7
                                               border-b border-slate-200
                                               reveal"
                                    >
                                        <div
                                            class="text-xl sm:text-2xl
                                                   font-extrabold
                                                   tracking-tight
                                                   text-primary"
                                        >
                                            ${String(i + 1).padStart(2, '0')}
                                        </div>
    
                                        <p
                                            class="text-sm sm:text-base
                                                   text-slate-700
                                                   leading-relaxed"
                                        >
                                            ${escapeHTML(req)}
                                        </p>
                                    </div>
                                `).join('')}
    
                            </div>
    
    
                            <!-- Processing Note -->
                            <div
                                class="mt-10
                                       bg-slate-50
                                       border-l-2 border-primary
                                       px-5 sm:px-6 py-5 sm:py-6"
                            >
                                <p
                                    class="text-xs font-bold uppercase
                                           tracking-[0.14em]
                                           text-primary mb-3"
                                >
                                    Important Processing Note
                                </p>
    
                                <p
                                    class="text-sm sm:text-base
                                           text-slate-600
                                           leading-relaxed"
                                >
                                    ${escapeHTML(p.note)}
                                </p>
                            </div>
    
                        </div>
    
                    </div>
                </div>
            </section>
    
    
            <!-- Employer Contact CTA -->
            <section
                class="py-12 lg:py-14
                       bg-slate-50
                       border-t border-slate-200"
            >
                <div class="max-w-7xl mx-auto px-6">
    
                    <div
                        class="flex flex-col lg:flex-row
                               lg:items-center
                               lg:justify-between
                               gap-7 lg:gap-12"
                    >
                        <div class="max-w-2xl">
                            <p
                                class="text-lg sm:text-xl
                                       font-bold tracking-tight
                                       text-slate-900"
                            >
                                Have questions about manpower requirements or documentation?
                            </p>
    
                            <p
                                class="mt-2 text-sm sm:text-base
                                       text-slate-600 leading-relaxed"
                            >
                                Our recruitment team can assist with employer
                                inquiries and documentation requirements.
                            </p>
                        </div>
    
                        <div class="flex flex-wrap gap-3">
                            <a
                                href="mailto:${config.contact.emails[0]}"
                                class="inline-flex items-center justify-center
                                       px-6 py-3 rounded-lg
                                       bg-primary text-white
                                       text-sm font-semibold
                                       hover:bg-primary-dark
                                       transition-colors"
                            >
                                Contact Archway
                            </a>
    
                            <a
                                href="index.html#contact"
                                class="inline-flex items-center justify-center
                                       px-6 py-3
                                       text-sm font-semibold
                                       text-slate-700
                                       hover:text-primary
                                       transition-colors"
                            >
                                View Office Details
                                <span class="ml-2" aria-hidden="true">&rarr;</span>
                            </a>
                        </div>
                    </div>
    
                </div>
            </section>
    
    
            ${renderFooter()}
    
        </div>
    `;
    
    initScrollReveal();
}

// ===== APPLICANTS PAGE (info-only "How to Apply" guide) =====
function renderApplicantsPage() {
    const app = document.getElementById('app');
    const p = config.applicantsPage;
    
    app.innerHTML = `
        ${renderNav('applicants.html')}
    
        <div class="fade-in-content">
    
            <!-- Editorial Page Header -->
            <header class="bg-white border-b border-slate-200">
                <div
                    class="max-w-7xl mx-auto px-6
                           py-16 lg:py-20"
                >
                    <div
                        class="grid lg:grid-cols-[1fr_0.9fr]
                               gap-8 lg:gap-20
                               items-end"
                    >
                        <div>
                            <p
                                class="text-xs sm:text-sm font-bold
                                       tracking-[0.20em] uppercase
                                       text-primary mb-3"
                            >
                                Applicant Guide
                            </p>
    
                            <h1
                                class="text-4xl sm:text-5xl lg:text-6xl
                                       font-extrabold tracking-tight
                                       text-slate-900"
                            >
                                ${escapeHTML(p.headerTitle)}
                            </h1>
                        </div>
    
                        <div>
                            <p
                                class="text-base sm:text-lg
                                       text-slate-600 leading-relaxed"
                            >
                                ${escapeHTML(p.headerSubtitle)}
                            </p>
    
                            <a
                                href="index.html#jobs"
                                class="mt-6 inline-flex
                                       items-center justify-center
                                       px-6 py-3 rounded-lg
                                       bg-primary text-white
                                       text-sm font-semibold
                                       hover:bg-primary-dark
                                       transition-colors"
                            >
                                Browse Open Positions
                            </a>
                        </div>
                    </div>
                </div>
            </header>
    
    
            <!-- Applicant Resources -->
            <section class="py-16 lg:py-24 bg-slate-50">
                <div class="max-w-5xl mx-auto px-6">
    
                    <div class="max-w-2xl mb-10 lg:mb-12">
                        <p
                            class="text-xs sm:text-sm font-bold
                                   tracking-[0.20em] uppercase
                                   text-primary mb-3"
                        >
                            Before You Apply
                        </p>
    
                        <h2
                            class="text-3xl sm:text-4xl
                                   font-extrabold tracking-tight
                                   text-slate-900"
                        >
                            Prepare for Your Application
                        </h2>
    
                        <p
                            class="mt-4 text-base
                                   text-slate-600 leading-relaxed"
                        >
                            Review the interview guidelines and initial
                            documentary requirements before applying.
                        </p>
                    </div>
    
    
                    <!-- Protocols Accordion -->
                    <div
                        class="border-y border-slate-200
                               bg-white reveal"
                    >
                        <button
                            type="button"
                            onclick="toggleSection('protocols')"
                            class="w-full
                                   flex items-center justify-between
                                   gap-6
                                   py-6
                                   text-left
                                   transition-colors
                                   hover:text-primary"
                        >
                            <h3
                                class="text-lg sm:text-xl
                                       font-bold tracking-tight
                                       text-slate-900"
                            >
                                ${escapeHTML(p.protocols.title)}
                            </h3>
    
                            <span
                                id="icon-protocols"
                                class="shrink-0
                                       text-2xl font-light
                                       text-primary
                                       transition-transform duration-300"
                                aria-hidden="true"
                            >
                                +
                            </span>
                        </button>
    
                        <div
                            id="protocols"
                            class="accordion-content
                                   text-slate-600
                                   leading-relaxed"
                        >
                            <div
                                class="pb-8
                                       border-t border-slate-100
                                       pt-6"
                            >
                                <div class="space-y-4 text-sm sm:text-base">
                                    ${p.protocols.intro.map(para => `
                                        <p>${escapeHTML(para)}</p>
                                    `).join('')}
                                </div>
    
                                <ol
                                    class="mt-7
                                           space-y-4
                                           list-decimal
                                           pl-5
                                           text-sm sm:text-base
                                           marker:font-semibold
                                           marker:text-primary"
                                >
                                    ${p.protocols.tips.map(tip => `
                                        <li class="pl-2">
                                            ${escapeHTML(tip)}
                                        </li>
                                    `).join('')}
                                </ol>
                            </div>
                        </div>
                    </div>
    
    
                    <!-- Documents Accordion -->
                    <div
                        class="border-b border-slate-200
                               bg-white reveal"
                    >
                        <button
                            type="button"
                            onclick="toggleSection('docs')"
                            class="w-full
                                   flex items-center justify-between
                                   gap-6
                                   py-6
                                   text-left
                                   transition-colors
                                   hover:text-primary"
                        >
                            <h3
                                class="text-lg sm:text-xl
                                       font-bold tracking-tight
                                       text-slate-900"
                            >
                                ${escapeHTML(p.docs.title)}
                            </h3>
    
                            <span
                                id="icon-docs"
                                class="shrink-0
                                       text-2xl font-light
                                       text-primary
                                       transition-transform duration-300"
                                aria-hidden="true"
                            >
                                +
                            </span>
                        </button>
    
                        <div
                            id="docs"
                            class="accordion-content
                                   text-slate-600
                                   leading-relaxed"
                        >
                            <div
                                class="pb-8
                                       border-t border-slate-100
                                       pt-6
                                       grid md:grid-cols-2
                                       gap-8 md:gap-12"
                            >
                                <div>
                                    <h4
                                        class="font-bold
                                               text-slate-900 mb-4"
                                    >
                                        ${escapeHTML(p.docs.overseas.title)}
                                    </h4>
    
                                    <ul
                                        class="space-y-3
                                               list-disc pl-5
                                               text-sm sm:text-base
                                               marker:text-primary"
                                    >
                                        ${p.docs.overseas.items.map(item => `
                                            <li class="pl-1">
                                                ${escapeHTML(item)}
                                            </li>
                                        `).join('')}
                                    </ul>
                                </div>
    
                                <div>
                                    <h4
                                        class="font-bold
                                               text-slate-900 mb-4"
                                    >
                                        ${escapeHTML(p.docs.local.title)}
                                    </h4>
    
                                    <ul
                                        class="space-y-3
                                               list-disc pl-5
                                               text-sm sm:text-base
                                               marker:text-primary"
                                    >
                                        ${p.docs.local.items.map(item => `
                                            <li class="pl-1">
                                                ${escapeHTML(item)}
                                            </li>
                                        `).join('')}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
    
                </div>
            </section>
    
    
            <!-- Recruitment Process -->
            <section class="py-16 lg:py-24 bg-white">
                <div class="max-w-7xl mx-auto px-6">
    
                    <div
                        class="grid lg:grid-cols-[0.75fr_1.25fr]
                               gap-12 lg:gap-20
                               items-start"
                    >
                        <!-- Section heading -->
                        <div class="lg:sticky lg:top-28">
                            <p
                                class="text-xs sm:text-sm font-bold
                                       tracking-[0.20em] uppercase
                                       text-primary mb-3"
                            >
                                Recruitment Process
                            </p>
    
                            <h2
                                class="text-3xl sm:text-4xl
                                       lg:text-5xl
                                       font-extrabold tracking-tight
                                       text-slate-900"
                            >
                                ${escapeHTML(p.process.title)}
                            </h2>
    
                            <p
                                class="mt-4
                                       text-base sm:text-lg
                                       text-slate-600 leading-relaxed"
                            >
                                ${escapeHTML(p.process.subtitle)}
                            </p>
                        </div>
    
    
                        <!-- Numbered process -->
                        <div class="border-t border-slate-200">
                            ${p.process.steps.map((step, i) => `
                                <div
                                    class="grid grid-cols-[64px_1fr]
                                           sm:grid-cols-[88px_1fr]
                                           gap-4 sm:gap-7
                                           py-7 sm:py-8
                                           border-b border-slate-200
                                           reveal"
                                >
                                    <div
                                        class="text-2xl sm:text-3xl
                                               font-extrabold
                                               tracking-tight
                                               text-primary"
                                    >
                                        ${String(i + 1).padStart(2, '0')}
                                    </div>
    
                                    <div>
                                        <h3
                                            class="text-lg sm:text-xl
                                                   font-bold tracking-tight
                                                   text-slate-900"
                                        >
                                            ${escapeHTML(step.title)}
                                        </h3>
    
                                        <p
                                            class="mt-2
                                                   text-sm sm:text-base
                                                   text-slate-600
                                                   leading-relaxed"
                                        >
                                            ${escapeHTML(step.desc)}
                                        </p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
    
                    </div>
                </div>
            </section>
    
    
            ${renderFooter()}
        </div>
    `;
    
    initScrollReveal();
}

// ===== ACCORDION TOGGLE =====
function toggleSection(id) {
    const section = document.getElementById(id);
    const icon = document.getElementById('icon-' + id);
    
    if (section.classList.contains('open')) {
        section.classList.remove('open');
        icon.textContent = '+';
        icon.style.transform = 'rotate(0deg)';
    } else {
        section.classList.add('open');
        icon.textContent = '−';
        icon.style.transform = 'rotate(180deg)';
    }
}


// ===== JOB POPUP / MODAL =====
function openJobPopupFromButton(button) {
    const id = button.dataset.jobId;
    openJobPopup(id);
}

function openJobPopup(id) {
    const job = (window._allJobs || []).find(j => j.id === id);
    
    if (!job) {
        console.warn('Job not found.');
        return;
    }
    
    const existing = document.getElementById('jobModal');
    if (existing) existing.remove();
    
    const field = (label, value) => {
        if (!value) return '';
        
        return `
            <div>
                <p
                    class="text-xs font-semibold uppercase
                           tracking-[0.12em] text-slate-400 mb-1.5"
                >
                    ${escapeHTML(label)}
                </p>
        
                <p
                    class="text-sm sm:text-base
                           font-medium text-slate-800
                           leading-relaxed whitespace-pre-line"
                >
                    ${escapeHTML(value)}
                </p>
            </div>
        `;
    };
    
    const hasExtraDetails =
    job.specialization ||
    job.location ||
    job.experience ||
    job.certifications ||
    job.description ||
    job.requirements;
    
    const modal = document.createElement('div');
    
    modal.id = 'jobModal';
    modal.className =
    'fixed inset-0 z-[100] flex items-center justify-center p-4';
    
    modal.innerHTML = `
        <div
            class="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]"
            onclick="closeJobPopup()"
        ></div>
    
        <div
            class="relative bg-white
                   w-full max-w-2xl max-h-[90vh]
                   overflow-y-auto
                   rounded-xl border border-slate-200
                   shadow-xl"
        >
    
            <!-- Modal Header -->
            <div
                class="px-6 py-6 sm:px-8 sm:py-7
                       border-b border-slate-200"
            >
                <div class="flex items-start justify-between gap-6">
    
                    <div class="min-w-0">
                        <p
                            class="text-xs font-bold uppercase
                                   tracking-[0.16em]
                                   text-primary mb-2"
                        >
                            ${escapeHTML(config.jobsConfig.popup.title)}
                        </p>
    
                        <h3
                            class="text-2xl sm:text-3xl
                                   font-bold tracking-tight
                                   leading-tight text-slate-900"
                        >
                            ${escapeHTML(job.title)}
                        </h3>
                    </div>
    
                    <button
                        type="button"
                        onclick="closeJobPopup()"
                        aria-label="Close job details"
                        class="shrink-0 w-10 h-10
                               inline-flex items-center justify-center
                               rounded-lg border border-slate-200
                               text-slate-500
                               hover:bg-slate-50 hover:text-slate-900
                               transition-colors"
                    >
                        <span class="text-2xl leading-none">&times;</span>
                    </button>
    
                </div>
            </div>
    
    
            <!-- Modal Body -->
            <div class="px-6 py-6 sm:px-8 sm:py-8">
    
                <div class="grid sm:grid-cols-2 gap-x-10 gap-y-6">
                    ${field('Employment Type', job.type)}
                    ${field('Location', job.location)}
                    ${field('Specialization', job.specialization)}
                    ${field('Experience', job.experience)}
                    ${field('Certifications', job.certifications)}
                </div>
    
                ${job.description ? `
                    <div class="mt-8 pt-8 border-t border-slate-200">
    
                        <h4
                            class="text-base font-bold
                                   tracking-tight text-slate-900 mb-3"
                        >
                            Job Description
                        </h4>
    
                        <p
                            class="text-sm sm:text-base
                                   text-slate-600 leading-7
                                   whitespace-pre-line"
                        >
                            ${escapeHTML(job.description)}
                        </p>
    
                    </div>
                ` : ''}
    
                ${job.requirements ? `
                    <div class="mt-8 pt-8 border-t border-slate-200">
    
                        <h4
                            class="text-base font-bold
                                   tracking-tight text-slate-900 mb-3"
                        >
                            Qualifications & Requirements
                        </h4>
    
                        <p
                            class="text-sm sm:text-base
                                   text-slate-600 leading-7
                                   whitespace-pre-line"
                        >
                            ${escapeHTML(job.requirements)}
                        </p>
    
                    </div>
                ` : ''}
    
                ${!hasExtraDetails ? `
                    <div
                        class="mt-2
                               border border-slate-200
                               bg-slate-50
                               px-5 py-4 rounded-lg"
                    >
                        <p
                            class="text-sm text-slate-600 leading-relaxed"
                        >
                            ${escapeHTML(config.jobsConfig.popup.noDetails)}
                        </p>
                    </div>
                ` : ''}
    
            </div>
    
    
            <!-- Modal Footer -->
            <div
                class="px-6 py-5 sm:px-8
                       border-t border-slate-200
                       bg-slate-50/70
                       flex flex-col-reverse sm:flex-row
                       sm:items-center sm:justify-end
                       gap-3"
            >
                <button
                    type="button"
                    onclick="closeJobPopup()"
                    class="px-5 py-2.5 rounded-lg
                           text-sm font-semibold text-slate-600
                           hover:text-slate-900 hover:bg-slate-100
                           transition-colors"
                >
                    ${escapeHTML(config.jobsConfig.popup.closeBtn)}
                </button>
    
                <button
                    type="button"
                    onclick="openBranchSelector('${escapeHTML(job.id)}')"
                    class="inline-flex items-center justify-center
                           px-6 py-2.5 rounded-lg
                           bg-primary text-white
                           text-sm font-semibold
                           hover:bg-primary-dark
                           transition-colors"
                >
                    ${escapeHTML(config.jobsConfig.popup.applyBtn)}
                </button>
            </div>
    
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

function closeJobPopup() {
    const modal = document.getElementById('jobModal');
    
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}


// ===== BRANCH SELECTOR MODAL =====
function openBranchSelector(jobId) {
    const job = (window._allJobs || []).find(j => j.id === jobId);
    const s = config.applicantsPage.branchSelector;
    const branches = config.applicantsPage.branches;
    
    closeJobPopup();
    
    const existing = document.getElementById('branchModal');
    if (existing) existing.remove();
    
    const modal = document.createElement('div');
    
    modal.id = 'branchModal';
    modal.className =
    'fixed inset-0 z-[100] flex items-center justify-center p-4';
    
    modal.innerHTML = `
        <div
            class="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]"
            onclick="closeBranchSelector()"
        ></div>
    
        <div
            class="relative bg-white
                   w-full max-w-lg max-h-[90vh]
                   overflow-y-auto
                   rounded-xl border border-slate-200
                   shadow-xl"
        >
    
            <!-- Modal Header -->
            <div
                class="px-6 py-6 sm:px-8 sm:py-7
                       border-b border-slate-200"
            >
                <div class="flex items-start justify-between gap-6">
    
                    <div class="min-w-0">
                        <p
                            class="text-xs font-bold uppercase
                                   tracking-[0.16em]
                                   text-primary mb-2"
                        >
                            ${escapeHTML(s.title)}
                        </p>
    
                        ${job ? `
                            <h3
                                class="text-xl sm:text-2xl
                                       font-bold tracking-tight
                                       leading-tight text-slate-900"
                            >
                                ${escapeHTML(job.title)}
                            </h3>
                        ` : ''}
                    </div>
    
                    <button
                        type="button"
                        onclick="closeBranchSelector()"
                        aria-label="Close application instructions"
                        class="shrink-0 w-10 h-10
                               inline-flex items-center justify-center
                               rounded-lg border border-slate-200
                               text-slate-500
                               hover:bg-slate-50 hover:text-slate-900
                               transition-colors"
                    >
                        <span class="text-2xl leading-none">&times;</span>
                    </button>
    
                </div>
            </div>
    
    
            <!-- Modal Body -->
            <div class="px-6 py-6 sm:px-8 sm:py-8 space-y-6">
    
                <p
                    class="text-sm sm:text-base
                           text-slate-600 leading-relaxed"
                >
                    ${escapeHTML(s.subtitle)}
                </p>
    
                <div>
                    <label
                        for="branchSelect"
                        class="block text-sm font-semibold
                               text-slate-800 mb-2"
                    >
                        ${escapeHTML(s.selectLabel)}
                    </label>
    
                    <select
                        id="branchSelect"
                        onchange="onBranchSelected()"
                        class="w-full px-4 py-3
                               rounded-lg border border-slate-300
                               bg-white text-sm text-slate-800
                               focus:border-primary focus:ring-2
                               focus:ring-primary/20
                               outline-none transition"
                    >
                        <option value="">
                            ${escapeHTML(s.placeholder)}
                        </option>
    
                        ${branches.map(branch => `
                            <option value="${escapeHTML(branch.value)}">
                                ${escapeHTML(branch.label)}
                            </option>
                        `).join('')}
                    </select>
    
                    <p
                        class="mt-2 text-xs
                               text-slate-500 leading-relaxed"
                    >
                        Choose the branch nearest to your location.
                    </p>
                </div>
    
    
                <!-- Branch Email Result -->
                <div
                    id="branchEmailResult"
                    class="hidden pt-6 border-t border-slate-200"
                >
                    <p
                        class="text-sm text-slate-600 leading-relaxed"
                    >
                        ${escapeHTML(s.instruction)}
                    </p>
    
                    <div
                        class="mt-4
                               border border-slate-200
                               rounded-lg overflow-hidden"
                    >
    
                        <div class="px-4 py-4 bg-slate-50">
                            <p
                                class="text-xs font-semibold uppercase
                                       tracking-[0.12em]
                                       text-slate-400 mb-1.5"
                            >
                                Branch Email
                            </p>
    
                            <span
                                id="branchEmailText"
                                class="block text-sm sm:text-base
                                       font-semibold text-primary
                                       break-all"
                            ></span>
                        </div>
    
                        <div
                            class="p-3
                                   border-t border-slate-200
                                   flex flex-col sm:flex-row gap-2"
                        >
                            <button
                                id="copyEmailBtn"
                                type="button"
                                onclick="copyBranchEmail()"
                                class="px-4 py-2.5 rounded-lg
                                       border border-slate-300
                                       text-sm font-semibold text-slate-700
                                       hover:bg-slate-50
                                       transition-colors"
                            >
                                ${escapeHTML(s.copyBtn)}
                            </button>
    
                            <a
                                id="mailtoLink"
                                href="#"
                                class="flex-1 inline-flex
                                       items-center justify-center
                                       px-5 py-2.5 rounded-lg
                                       bg-primary text-white
                                       text-sm font-semibold
                                       hover:bg-primary-dark
                                       transition-colors"
                            >
                                Open in Email App
                            </a>
                        </div>
    
                    </div>
                </div>
    
            </div>
    
    
            <!-- Modal Footer -->
            <div
                class="px-6 py-5 sm:px-8
                       border-t border-slate-200
                       bg-slate-50/70
                       flex justify-end"
            >
                <button
                    type="button"
                    onclick="closeBranchSelector()"
                    class="px-5 py-2.5 rounded-lg
                           text-sm font-semibold text-slate-600
                           hover:text-slate-900 hover:bg-slate-100
                           transition-colors"
                >
                    ${escapeHTML(s.closeBtn)}
                </button>
            </div>
    
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

function onBranchSelected() {
    const select = document.getElementById('branchSelect');
    const branches = config.applicantsPage.branches;
    const branch = branches.find(b => b.value === select.value);
    
    const result = document.getElementById('branchEmailResult');
    const emailText = document.getElementById('branchEmailText');
    const mailtoLink = document.getElementById('mailtoLink');
    const copyBtn = document.getElementById('copyEmailBtn');
    
    if (!branch) {
        result.classList.add('hidden');
        return;
    }
    
    emailText.textContent = branch.email;
    
    mailtoLink.href =
    `mailto:${branch.email}?subject=${encodeURIComponent('Job Application')}`;
    
    copyBtn.textContent =
    config.applicantsPage.branchSelector.copyBtn;
    
    result.classList.remove('hidden');
}

function copyBranchEmail() {
    const emailText = document.getElementById('branchEmailText');
    const copyBtn = document.getElementById('copyEmailBtn');
    
    if (!emailText || !emailText.textContent) return;
    
    navigator.clipboard
    .writeText(emailText.textContent)
    .then(() => {
        copyBtn.textContent =
        config.applicantsPage.branchSelector.copiedLabel;
        
        setTimeout(() => {
            copyBtn.textContent =
            config.applicantsPage.branchSelector.copyBtn;
        }, 2000);
    })
    .catch(() => {
        console.warn('Clipboard copy failed.');
    });
}

function closeBranchSelector() {
    const modal = document.getElementById('branchModal');
    
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}