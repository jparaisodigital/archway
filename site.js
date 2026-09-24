// site.js

// ===== SHARED =====

function renderNav(activePage) {
    const contactHref =
    activePage === 'index.html'
    ? '#contact'
    : 'index.html#contact';
    
    return `
        <nav
    class="site-navbar fixed top-0 left-0 right-0 z-50
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
    const isActive =
    item.href === activePage;
    
    return `
                            <a
                                href="${item.href}"
                                data-nav-href="${item.href}"
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
                    href="${contactHref}"
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
                           w-11 h-11
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
                class="mobile-menu-panel md:hidden
                       bg-slate-950
                       border-t border-white/10"
            >
                <div class="px-6 py-4">
                    <div class="flex flex-col">
                        ${config.nav.map(item => {
const isActive =
item.href === activePage;

return `
                                <a
                                    href="${item.href}"
                                    data-nav-href="${item.href}"
                                    class="
    min-h-11
    flex items-center
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
                        href="${contactHref}"
                        class="mt-4
       inline-flex w-full
       min-h-11
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
    
    if (!menu || !iconOpen || !iconClose) return;
    
    const isOpen = menu.classList.toggle('mobile-menu-open');
    
    iconOpen.classList.toggle('hidden', isOpen);
    iconClose.classList.toggle('hidden', !isOpen);
}

// ===== NAVBAR SCROLL =====

function initNavbarScroll() {
    const navbar = document.querySelector('.site-navbar');
    
    if (!navbar) return;
    
    const updateNavbar = () => {
        navbar.classList.toggle(
            'navbar-scrolled',
            window.scrollY > 24
        );
    };
    
    updateNavbar();
    
    window.addEventListener('scroll', updateNavbar, {
        passive: true
    });
}

function initHomepageSectionNav() {
    const contactSection = document.getElementById('contact');
    
    if (!contactSection) return;
    
    const contactLinks = document.querySelectorAll(
        'a[href="#contact"]'
    );
    
    if (contactLinks.length === 0) return;
    
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                contactLinks.forEach(link => {
                    link.classList.toggle(
                        'border-accent',
                        entry.isIntersecting
                    );
                    
                    link.classList.toggle(
                        'bg-white/10',
                        entry.isIntersecting
                    );
                });
            });
        },
        {
            threshold: 0.35
        }
    );
    
    observer.observe(contactSection);
}

function initBackToTop() {
    const button = document.getElementById('backToTop');
    
    if (!button) return;
    
    const contactSection = document.getElementById('contact');
    const footer = document.querySelector('footer');
    
    const target =
    contactSection || footer;
    
    if (!target) return;
    
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                button.classList.toggle(
                    'back-to-top-visible',
                    entry.isIntersecting
                );
            });
        },
        {
            threshold: 0.15
        }
    );
    
    observer.observe(target);
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== TOAST NOTIFICATION =====

function showToast(message) {
    const existingToast = document.getElementById('siteToast');
    
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    
    toast.id = 'siteToast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    
    toast.className = `
        fixed bottom-6 left-1/2
        -translate-x-1/2
        z-[120]
        pointer-events-none
    `;
    
    toast.innerHTML = `
        <div
            class="
                toast-panel
                px-4 py-3
                rounded-lg
                border border-slate-700
                bg-slate-950
                text-sm font-medium text-white
                shadow-lg
            "
        >
            ${escapeHTML(message)}
        </div>
    `;
    
    document.body.appendChild(toast);
    
    requestAnimationFrame(() => {
        toast.classList.add('toast-visible');
    });
    
    setTimeout(() => {
        toast.classList.remove('toast-visible');
        
        setTimeout(() => {
            toast.remove();
        }, 180);
    }, 1800);
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
                    ${escapeHTML(config.dmwLicense)}
                </p>
            </div>
        </footer>
    
        <button
    id="backToTop"
    type="button"
    aria-label="Back to top"
    class="fixed
           bottom-5 right-5
           sm:bottom-6 sm:right-6
           z-[90]
           inline-flex
           items-center justify-center
           w-11 h-11
           rounded-lg
           border border-slate-300
           bg-white
           text-slate-700
           shadow-sm
           hover:border-slate-400
           hover:text-slate-950
           transition-colors"
>
    <span
        aria-hidden="true"
        class="text-lg leading-none"
    >
        ↑
    </span>
</button>
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
        
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }
        
        const csvText = await res.text();
        
        function parseCSV(text) {
            const rows = [];
            let currentRow = [];
            let currentValue = '';
            let insideQuotes = false;
            
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                const nextChar = text[i + 1];
                
                if (char === '"' && insideQuotes && nextChar === '"') {
                    currentValue += '"';
                    i++;
                } else if (char === '"') {
                    insideQuotes = !insideQuotes;
                } else if (char === ',' && !insideQuotes) {
                    currentRow.push(currentValue.trim());
                    currentValue = '';
                } else if (
                    (char === '\n' || char === '\r') &&
                    !insideQuotes
                ) {
                    if (currentValue || currentRow.length > 0) {
                        currentRow.push(currentValue.trim());
                        rows.push(currentRow);
                        
                        currentRow = [];
                        currentValue = '';
                    }
                    
                    if (char === '\r' && nextChar === '\n') {
                        i++;
                    }
                } else {
                    currentValue += char;
                }
            }
            
            if (currentValue || currentRow.length > 0) {
                currentRow.push(currentValue.trim());
                rows.push(currentRow);
            }
            
            return rows;
        }
        
        const rows = parseCSV(csvText);
        const settings = {};
        
        rows.slice(1).forEach(values => {
            const key = (values[0] || '')
            .trim()
            .toLowerCase();
            
            const value = (values[1] || '').trim();
            
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
    }
    
    if (settings.map_location) {
        config.contact.mapEmbedUrl =
        `https://maps.google.com/maps?q=${encodeURIComponent(settings.map_location)}&output=embed`;
    }
    
    if (settings.years_experience) {
        config.stats[0].value = settings.years_experience;
        config.hero.eyebrow = `${settings.years_experience} YEARS OF RECRUITMENT EXCELLENCE`;
        config.hero.trustItems[0] = `${settings.years_experience} Years of Service`;
    }
    
    if (settings.workers_deployed) {
        config.stats[1].value = settings.workers_deployed;
    }
    
    if (settings.dmw_complaints) {
        config.stats[2].value = settings.dmw_complaints;
    }
    
    if (settings.opportunities) {
        config.stats[3].value = settings.opportunities;
    }
}

function syncSiteSettingsUI() {
    
    // Hero years
    const heroEyebrow = document.getElementById('heroEyebrow');
    
    if (heroEyebrow) {
        heroEyebrow.textContent = config.hero.eyebrow;
    }
    
    // Marquee years
    document
    .querySelectorAll('[data-hero-years-service]')
    .forEach(element => {
        element.textContent = config.hero.trustItems[0];
    });
    
    // Statistics
    document
    .querySelectorAll('.stat-value')
    .forEach((element, index) => {
        
        const stat = config.stats[index];
        
        if (!stat) return;
        
        element.dataset.statValue = stat.value;
        element.textContent = stat.value;
    });
    
    // Contact address
    const address = document.getElementById('contactAddress');
    
    if (address) {
        address.textContent = config.contact.address;
    }
    
    // Contact phones
    const phones = document.getElementById('contactPhones');
    
    if (phones) {
        phones.innerHTML = config.contact.phones
        .map(phone => `<p>${escapeHTML(phone)}</p>`)
        .join('');
    }
    
    // Contact emails
    const emails = document.getElementById('contactEmails');
    
    if (emails) {
        emails.innerHTML = config.contact.emails
        .map(email => `
                <a
                    href="mailto:${escapeHTML(email)}"
                    class="block w-fit
                           text-white/85
                           hover:text-white
                           transition-colors"
                >
                    ${escapeHTML(email)}
                </a>
            `)
            .join('');
        }
        
        // Google Map
        const map = document.getElementById('contactMap');
        
        if (map) {
            map.src = config.contact.mapEmbedUrl;
        }
    }
    
    // ===== JOBS DATA (GOOGLE SHEETS) =====
    async function fetchJobs() {
        try {
            const url = `${config.jobsSheetUrl}&_=${Date.now()}`;
            
            const res = await fetch(url, {
                cache: 'no-store'
            });
            
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }
            
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
                    
                    is_active:
                    (values[cols.is_active] || '')
                    .toUpperCase() === 'TRUE',
                    
                    info: values[cols.info] || '',
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
    class="group
           grid
           grid-cols-[minmax(0,1fr)_minmax(120px,0.8fr)_auto]
           items-center gap-6
           min-h-[72px] px-6 py-4
           border-b border-slate-100 last:border-b-0
           transition-colors duration-200
           hover:bg-slate-50"
>
                        <div class="min-w-0 flex-1">
    <p
        class="font-medium text-slate-800
               leading-snug
               transition-colors duration-200
               group-hover:text-slate-950"
    >
        ${escapeHTML(job.title)}
    </p>
        
    ${job.location ? `
        <div
            class="mt-1
                   md:hidden
                   flex items-start gap-2
                   text-sm text-slate-500"
        >
            <span
                aria-hidden="true"
                class="mt-[0.45rem]
                       w-1.5 h-1.5
                       rounded-full
                       bg-emerald-600/90
                       animate-pulse
                       shrink-0"
            ></span>
    
            <span class="leading-snug line-clamp-2">
                ${escapeHTML(job.location)}
            </span>
        </div>
    ` : ''}
</div>
        
${job.location ? `
    <div
        class="hidden md:flex
               items-center gap-2
               min-w-0
               text-sm text-slate-500"
    >
        <span
    aria-hidden="true"
    class="w-1.5 h-1.5
           rounded-full
           bg-emerald-600/90
           animate-pulse
           shrink-0"
></span>

        <span
    class="leading-snug
           line-clamp-2"
>
    ${escapeHTML(job.location)}
</span>
    </div>
` : ''}
    
                        <button
                            type="button"
                            data-job-id="${escapeHTML(job.id)}"
                            onclick="openJobPopupFromButton(this)"
                            class="shrink-0
                                   inline-flex items-center gap-2
                                   min-h-11 px-4 py-2 rounded-lg
                                   border border-slate-300
                                   text-sm font-semibold text-slate-700
                                   hover:border-primary hover:text-primary
                                   focus-visible:outline-none
                                   focus-visible:ring-2
                                   focus-visible:ring-primary/30
                                   focus-visible:border-primary
                                   transition-colors duration-200"
                        >
                            <span>View Details</span>
    
                            <span
                                aria-hidden="true"
                                class="inline-block
                                       transition-transform duration-200
                                       group-hover:translate-x-[3px]"
                            >
                                &rarr;
                            </span>
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
    
            <div>
                ${[1, 2, 3].map(() => `
                    <div
                        class="flex items-center justify-between gap-5
                               min-h-[60px] px-6 py-4
                               border-b border-slate-100 last:border-b-0"
                    >
                        <div
                            class="h-4 w-36
                                   rounded bg-slate-100
                                   animate-pulse"
                        ></div>
    
                        <div
                            class="h-9 w-24
                                   rounded-lg
                                   border border-slate-200
                                   bg-slate-50
                                   animate-pulse"
                        ></div>
                    </div>
                `).join('')}
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
            class="hero-bg-image hero-bg-desktop ${i === 0 ? 'active' : ''}"
            style="background-image:url('${img}');"
        ></div>
    `).join('')}
    
    ${c.hero.mobileImages.map((img, i) => `
        <div
            class="hero-bg-image hero-bg-mobile ${i === 0 ? 'active' : ''}"
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
    <div
    class="max-w-7xl mx-auto px-6
           min-h-screen
           pt-20 pb-24
           sm:pt-24
           lg:pt-24 lg:pb-28
           flex
           items-center
           lg:items-stretch"
>
        <div
    class="max-w-3xl w-full
           flex flex-col
           justify-center
           lg:justify-between"
>
        
    <div class="lg:pt-8">
        
        <p
    id="heroEyebrow"
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
    </div>
               <div
    class="pt-20
           sm:pt-24
           lg:pt-14
           flex flex-wrap gap-4
           pb-2"
>
    
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
    
                
    
            </div>
        </div>
    </div>
    
    <div
    class="absolute bottom-0 left-0 right-0 z-20
           overflow-hidden
           border-t border-white/15
           bg-slate-950/70
           backdrop-blur-sm"
>
    <div class="hero-trust-marquee">
        <div class="hero-trust-track">
        
            <div class="hero-trust-group">
                <span data-hero-years-service>
                ${escapeHTML(c.hero.trustItems[0])}
                </span>
                <span class="hero-trust-dot">•</span>
                <span>DMW LICENSED</span>
                <span class="hero-trust-dot">•</span>
                <span>Zero Complaint Record</span>
                <span class="hero-trust-dot">•</span>
            </div>
        
            <div class="hero-trust-group" aria-hidden="true">
                <span data-hero-years-service>
                ${escapeHTML(c.hero.trustItems[0])}
                </span>
                <span class="hero-trust-dot">•</span>
                <span>DMW LICENSED</span>
                <span class="hero-trust-dot">•</span>
                <span>Zero Complaint Record</span>
                <span class="hero-trust-dot">•</span>
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
    <span
        class="stat-value"
        data-stat-value="${escapeHTML(s.value)}"
    >
        ${escapeHTML(s.value)}
    </span>
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
    <div class="max-w-7xl mx-auto px-6 reveal-stagger">
    
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
    
        <!-- Job Search & Filters -->
<div
    class="mb-8
           border-y border-slate-200
           py-4
           flex flex-col lg:flex-row
           lg:items-center lg:justify-between
           gap-4"
>
    <!-- Search -->
    <div class="w-full lg:max-w-md">
    <div class="relative">
        <label
            for="jobSearchInput"
            class="sr-only"
        >
            Search job openings
        </label>
    
        <input
            id="jobSearchInput"
            type="search"
            placeholder="Search job openings"
            autocomplete="off"
            class="w-full
                   px-4 py-3
                   rounded-lg
                   border border-slate-300
                   bg-white
                   text-base sm:text-sm text-slate-900
                   placeholder:text-slate-400
                   outline-none
                   focus:border-primary
                   focus:ring-2 focus:ring-primary/15
                   transition"
        >
    </div>
</div>
    
    <!-- Filters -->
    <div
        class="flex flex-wrap gap-2"
        id="jobFilterControls"
    >
        <button
            type="button"
            data-job-filter="all"
            class="job-filter-btn
                   min-h-11 px-4 py-2.5 rounded-lg
                   bg-primary text-white
                   border border-primary
                   text-sm font-semibold
                   transition-colors"
        >
            All
        </button>
    
        <button
            type="button"
            data-job-filter="local"
            class="job-filter-btn
                   min-h-11 px-4 py-2.5 rounded-lg
                   bg-white text-slate-600
                   border border-slate-300
                   text-sm font-semibold
                   hover:border-primary hover:text-primary
                   transition-colors"
        >
            Local
        </button>
    
        <button
            type="button"
            data-job-filter="overseas"
            class="job-filter-btn
                   min-h-11 px-4 py-2.5 rounded-lg
                   bg-white text-slate-600
                   border border-slate-300
                   text-sm font-semibold
                   hover:border-primary hover:text-primary
                   transition-colors"
        >
            Overseas
        </button>
    </div>
    
    <p
    id="jobResultCount"
    class="text-sm text-slate-500"
    aria-live="polite"
>
    Loading openings...
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
    class="reveal-stagger
           grid lg:grid-cols-3
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
    
        <div class="reveal-stagger grid lg:grid-cols-[0.8fr_1.4fr] gap-12 lg:gap-20 items-start">
    
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
                        <p>${p}</p>
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
                           src="assets/DMW.png"
                           alt="DMW LICENSED - Zero Complaint & Zero Citation Record"
                           class="w-full
                           max-w-[340px]
                           h-auto
                           object-contain
                           mx-auto
                           sm:w-auto
                           sm:max-w-none
                           sm:h-32
                           sm:mx-0"
                > 
    
                <div>
                        <p
                            class="text-xs font-bold uppercase
                                   tracking-[0.14em] text-primary mb-2"
                        >
                            Licensed Recruitment Agency
                        </p>
    
                        <p class="font-semibold text-slate-900">
                            DMW LICENSED • Zero Complaint Record
                        </p>
    
                        <p class="mt-1 text-sm text-slate-500">
                            ${escapeHTML(c.dmwLicense)}
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
    
                        <p
    id="contactAddress"
    class="text-sm sm:text-base text-white/85 leading-relaxed"
>
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
    
                        <div
    id="contactPhones"
    class="space-y-1 text-sm sm:text-base text-white/85"
>
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
    
                        <div
    id="contactEmails"
    class="space-y-2 text-sm sm:text-base"
>
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
    id="contactMap"
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
            
            initNavbarScroll();
            initBackToTop();
            initHomepageSectionNav();
            initScrollReveal();
            
            if (window.location.hash) {
                setTimeout(() => {
                    const target = document.querySelector(window.location.hash);
                    if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' });
                }, 0);
            }
            
            // Hero background image carousel
            const desktopHeroSlides =
            document.querySelectorAll('.hero-bg-desktop');
            
            const mobileHeroSlides =
            document.querySelectorAll('.hero-bg-mobile');
            
            function startHeroCarousel(slides) {
                if (!slides || slides.length <= 1) return;
                
                let index = 0;
                
                setInterval(() => {
                    slides[index].classList.remove('active');
                    
                    index = (index + 1) % slides.length;
                    
                    slides[index].classList.add('active');
                }, c.hero.slideInterval || 4000);
            }
            
            startHeroCarousel(desktopHeroSlides);
            startHeroCarousel(mobileHeroSlides);
            
            fetchJobs().then(jobs => {
                window._allJobs = jobs;
                
                const grid = document.getElementById('jobsGrid');
                const searchInput = document.getElementById('jobSearchInput');
                const filterButtons = document.querySelectorAll('.job-filter-btn');
                const resultCount = document.getElementById('jobResultCount');
                
                let activeFilter = 'all';
                
                function revealJobsGrid() {
                    if (!grid) return;
                    
                    grid.classList.add('jobs-loaded');
                    
                    requestAnimationFrame(() => {
                        grid.classList.add('is-visible');
                    });
                }
                
                function renderFilteredJobs() {
                    if (!grid) return;
                    
                    grid.classList.remove('is-visible');
                    
                    const searchTerm = (searchInput?.value || '')
                    .trim()
                    .toLowerCase();
                    
                    const filteredJobs = jobs.filter(job => {
                        const matchesSearch =
                        job.title.toLowerCase().includes(searchTerm);
                        
                        const matchesFilter =
                        activeFilter === 'all' ||
                        job.type.toLowerCase() === activeFilter;
                        
                        return matchesSearch && matchesFilter;
                    });
                    
                    const localJobs = filteredJobs.filter(
                        job => job.type === 'Local'
                    );
                    
                    const overseasJobs = filteredJobs.filter(
                        job => job.type === 'Overseas'
                    );
                    
                    if (resultCount) {
                        const count = filteredJobs.length;
                        
                        if (activeFilter === 'local') {
                            resultCount.textContent =
                            count === 1
                            ? '1 local opening'
                            : `${count} local openings`;
                        } else if (activeFilter === 'overseas') {
                            resultCount.textContent =
                            count === 1
                            ? '1 overseas opening'
                            : `${count} overseas openings`;
                        } else {
                            resultCount.textContent =
                            count === 1
                            ? '1 opening'
                            : `${count} openings`;
                        }
                    }
                    
                    if (filteredJobs.length === 0) {
                        grid.className =
                        'jobs-loaded grid md:grid-cols-2 gap-6 lg:gap-8';
                        
                        grid.innerHTML = `
                    <div
                        class="md:col-span-2
                               border-y border-slate-200
                               py-10 text-center"
                    >
                        <p class="text-sm text-slate-500">
                            No matching job openings found.
                        </p>
                    </div>
                `;
                        
                        revealJobsGrid();
                        return;
                    }
                    
                    if (activeFilter === 'local') {
                        grid.className =
                        'jobs-loaded grid gap-6 lg:gap-8';
                        
                        grid.innerHTML =
                        renderJobTable(
                            c.jobs.local.title,
                            localJobs
                        );
                        
                        revealJobsGrid();
                        return;
                    }
                    
                    if (activeFilter === 'overseas') {
                        grid.className =
                        'jobs-loaded grid gap-6 lg:gap-8';
                        
                        grid.innerHTML =
                        renderJobTable(
                            c.jobs.overseas.title,
                            overseasJobs
                        );
                        
                        revealJobsGrid();
                        return;
                    }
                    
                    grid.className =
                    'jobs-loaded grid md:grid-cols-2 gap-6 lg:gap-8';
                    
                    grid.innerHTML =
                    renderJobTable(
                        c.jobs.local.title,
                        localJobs
                    ) +
                    renderJobTable(
                        c.jobs.overseas.title,
                        overseasJobs
                    );
                    
                    revealJobsGrid();
                }
                
                searchInput?.addEventListener('input', () => {
                    renderFilteredJobs();
                });
                
                searchInput?.addEventListener('keydown', event => {
                    if (event.key !== 'Escape') return;
                    if (!searchInput.value) return;
                    
                    searchInput.value = '';
                    renderFilteredJobs();
                });
                
                filterButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        activeFilter = button.dataset.jobFilter;
                        
                        filterButtons.forEach(btn => {
                            const isActive =
                            btn.dataset.jobFilter === activeFilter;
                            
                            btn.classList.toggle('bg-primary', isActive);
                            btn.classList.toggle('text-white', isActive);
                            btn.classList.toggle('border-primary', isActive);
                            
                            btn.classList.toggle('bg-white', !isActive);
                            btn.classList.toggle('text-slate-600', !isActive);
                            btn.classList.toggle('border-slate-300', !isActive);
                            
                            btn.classList.toggle('hover:text-primary', !isActive);
                            btn.classList.toggle('hover:border-primary', !isActive);
                        });
                        
                        renderFilteredJobs();
                    });
                });
                
                renderFilteredJobs();
            });
            
            const statValues = document.querySelectorAll('.stat-value');
            
            if (statValues.length > 0) {
                const statsObserver = new IntersectionObserver(
                    (entries, observer) => {
                        entries.forEach(entry => {
                            if (!entry.isIntersecting) return;
                            
                            statValues.forEach(stat => {
                                const originalValue = (stat.dataset.statValue || '').trim();
                                
                                const cleanedValue = originalValue.replace(/,/g, '').trim();
                                
                                const match = cleanedValue.match(/^(\d+)\s*(\+)?$/);
                                
                                if (!match) return;
                                
                                const target = Number(match[1]);
                                const suffix = match[2] || '';
                                
                                const duration = 1000;
                                const startTime = performance.now();
                                
                                function updateCount(currentTime) {
                                    const latestValue =
                                    (stat.dataset.statValue || '').trim();
                                    
                                    if (latestValue !== originalValue) {
                                        stat.textContent = latestValue;
                                        return;
                                    }
                                    
                                    const elapsed = currentTime - startTime;
                                    const progress = Math.min(elapsed / duration, 1);
                                    
                                    const easedProgress =
                                    1 - Math.pow(1 - progress, 3);
                                    
                                    const currentValue = Math.floor(
                                        target * easedProgress
                                    );
                                    
                                    stat.textContent =
                                    currentValue.toLocaleString() + suffix;
                                    
                                    if (progress < 1) {
                                        requestAnimationFrame(updateCount);
                                    } else {
                                        stat.textContent =
                                        target.toLocaleString() + suffix;
                                    }
                                }
                                
                                stat.textContent = `0${suffix}`;
                                requestAnimationFrame(updateCount);
                            });
                            
                            observer.disconnect();
                        });
                    },
                    {
                        threshold: 0.35
                    }
                );
                
                const statsSection =
                statValues[0].closest('section');
                
                if (statsSection) {
                    statsObserver.observe(statsSection);
                }
            }
            
        }
        
        // ===== SCROLL REVEAL =====
        
        function initScrollReveal() {
            const observerOptions = {
                threshold: 0.15,
                rootMargin: "0px 0px -40px 0px"
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    
                    entry.target.classList.add('active');
                    
                    const staggerGroup =
                    entry.target.querySelector('.reveal-stagger');
                    
                    if (staggerGroup) {
                        staggerGroup.classList.add('reveal-visible');
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
        <p>${para}</p>
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
                            src="${config.dmwBadge.src}"
                            alt="${escapeHTML(config.dmwBadge.alt)}"
                            class="w-full
                            max-w-[340px]
                            h-auto
                            object-contain
                            mx-auto
                            sm:w-auto
                            sm:max-w-none
                            sm:h-32
                            sm:mx-0"
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
                                DMW LICENSED
                            </p>
    
                            <p
                                class="mt-1
                                       text-sm text-slate-500"
                            >
                                ${escapeHTML(config.dmwLicense)}
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
            
            initNavbarScroll();
            initBackToTop();
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
            
            initNavbarScroll();
            initBackToTop();
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
            
            initNavbarScroll();
            initBackToTop();
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
            job.info ||
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
    class="modal-backdrop absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]"
    onclick="closeJobPopup()"
></div>
    
        <div 
    class="modal-panel relative bg-white
           w-full max-w-2xl
           max-h-[calc(100vh-2rem)]
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
        
                ${job.info ? `
                    <div
                        class="mt-8
                               border border-amber-200
                               bg-amber-50
                               px-5 py-4
                               rounded-lg"
                    >
                        <p
                            class="text-xs font-bold uppercase
                                   tracking-[0.14em]
                                   text-amber-700 mb-1.5"
                        >
                            Important Notice
                        </p>
                
                        <p
                            class="text-sm sm:text-base
                                   font-semibold
                                   text-amber-900
                                   leading-relaxed"
                        >
                            ${escapeHTML(job.info)}
                        </p>
                    </div>
                ` : ''}
    
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
                    onclick="openApplicationForm('${escapeHTML(job.id)}')"
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
            
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
            
            setTimeout(() => {
                modal.classList.add('modal-visible');
            }, 10);
        }
        
        function closeJobPopup(keepBodyLocked = false) {
            const modal = document.getElementById('jobModal');
            
            if (!modal) return;
            
            modal.classList.remove('modal-visible');
            
            setTimeout(() => {
                modal.remove();
                
                if (!keepBodyLocked) {
                    document.documentElement.style.overflow = '';
                    document.body.style.overflow = '';
                }
            }, 200);
        }
        
        // ===== APPLICATION ROUTING =====
function normalizeApplicationLocation(value) {
    return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getLocalApplicationRouteKey(location) {
    const normalized = normalizeApplicationLocation(location);

    if (!normalized) return '';

    const metroManilaLocations = [
        'metro manila',
        'national capital region',
        'ncr',
        'pasay',
        'manila',
        'makati',
        'taguig',
        'quezon city',
        'mandaluyong',
        'paranaque',
        'las pinas',
        'muntinlupa',
        'marikina',
        'pasig',
        'san juan',
        'caloocan',
        'malabon',
        'navotas',
        'valenzuela',
        'pateros'
    ];

    if (
        metroManilaLocations.some(place =>
            normalized.includes(place)
        )
    ) {
        return 'metro_manila';
    }

    const provinceRoutes = [
        {
            key: 'batangas',
            terms: ['batangas']
        },
        {
            key: 'bulacan',
            terms: ['bulacan']
        },
        {
            key: 'cavite',
            terms: ['cavite']
        },
        {
            key: 'la_union',
            terms: ['la union']
        },
        {
            key: 'laguna',
            terms: ['laguna']
        },
        {
            key: 'pampanga',
            terms: ['pampanga']
        }
    ];

    const matchedRoute = provinceRoutes.find(route =>
        route.terms.some(term =>
            normalized.includes(term)
        )
    );

    return matchedRoute?.key || '';
}

function getApplicationOfficeLabel(routeKey) {
    const labels = {
        metro_manila: 'Pasay / Main HR',
        batangas: 'Batangas',
        bulacan: 'Bulacan',
        cavite: 'Cavite',
        la_union: 'La Union',
        laguna: 'Laguna',
        pampanga: 'Pampanga'
    };

    return labels[routeKey] || 'Assigned HR Office';
}


// ===== ONLINE APPLICATION MODAL =====
function openApplicationForm(jobId) {
    const job = (window._allJobs || []).find(
        j => j.id === jobId
    );

    if (!job) {
        console.warn('Job not found.');
        return;
    }

    const formConfig =
    config.applicantsPage.applicationForm;

    const isOverseas =
    String(job.type || '')
    .trim()
    .toLowerCase() === 'overseas';

    const localRouteKey =
    isOverseas
    ? ''
    : getLocalApplicationRouteKey(
        job.location
    );

    const applicationOffice =
    isOverseas
    ? 'Pasay / Main HR'
    : getApplicationOfficeLabel(
        localRouteKey
    );

    closeJobPopup(true);

    setTimeout(() => {
        const existing =
        document.getElementById(
            'applicationModal'
        );

        if (existing) {
            existing.remove();
        }

        const modal =
        document.createElement('div');

        modal.id =
        'applicationModal';

        modal.className =
        'fixed inset-0 z-[100] flex items-center justify-center p-4';

        const subtitle =
        isOverseas
        ? formConfig.overseasSubtitle
        : 'Complete the form below. Your application office is assigned automatically based on the job location.';

        const localRouteAvailable =
        isOverseas ||
        Boolean(localRouteKey);

        modal.innerHTML = `
            <div
                class="modal-backdrop absolute inset-0
                       bg-slate-950/60 backdrop-blur-[2px]"
                onclick="closeApplicationForm()"
            ></div>

            <div
                class="modal-panel relative bg-white
                       w-full max-w-2xl
                       max-h-[calc(100vh-2rem)]
                       overflow-y-auto
                       rounded-xl border border-slate-200
                       shadow-xl"
            >
                <div
                    class="px-6 py-6 sm:px-8 sm:py-7
                           border-b border-slate-200"
                >
                    <div
                        class="flex items-start
                               justify-between gap-6"
                    >
                        <div class="min-w-0">
                            <p
                                class="text-xs
                                       font-bold
                                       uppercase
                                       tracking-[0.16em]
                                       text-primary
                                       mb-2"
                            >
                                ${escapeHTML(
                                    formConfig.title
                                )}
                            </p>

                            <h3
                                class="text-xl
                                       sm:text-2xl
                                       font-bold
                                       tracking-tight
                                       leading-tight
                                       text-slate-900"
                            >
                                ${escapeHTML(
                                    job.title
                                )}
                            </h3>

                            <p
                                class="mt-2
                                       text-sm
                                       text-slate-500
                                       leading-relaxed"
                            >
                                ${escapeHTML(
                                    job.type
                                )}${
                                    job.location
                                    ? ` · ${escapeHTML(
                                        job.location
                                    )}`
                                    : ''
                                }
                            </p>
                        </div>

                        <button
                            type="button"
                            onclick="closeApplicationForm()"
                            aria-label="Close application form"
                            class="shrink-0
                                   w-10 h-10
                                   inline-flex
                                   items-center
                                   justify-center
                                   rounded-lg
                                   border
                                   border-slate-200
                                   text-slate-500
                                   hover:bg-slate-50
                                   hover:text-slate-900
                                   transition-colors"
                        >
                            <span
                                class="text-2xl leading-none"
                            >
                                &times;
                            </span>
                        </button>
                    </div>
                </div>

                <form
                    id="jobApplicationForm"
                    onsubmit="submitApplicationForm(event)"
                    enctype="multipart/form-data"
                >
                    <div
                        class="px-6 py-6
                               sm:px-8 sm:py-8
                               space-y-6"
                    >
                        <div
                            id="applicationFormStatus"
                            class="hidden
                                   rounded-lg
                                   border
                                   px-4 py-3
                                   text-sm
                                   leading-relaxed"
                            role="status"
                            aria-live="polite"
                        ></div>

                        <p
                            class="text-sm
                                   sm:text-base
                                   text-slate-600
                                   leading-relaxed"
                        >
                            ${escapeHTML(
                                subtitle
                            )}
                        </p>

                        <input
                            type="hidden"
                            name="job_id"
                            value="${escapeHTML(
                                job.id
                            )}"
                        >

                        <input
                            type="hidden"
                            name="job_title"
                            value="${escapeHTML(
                                job.title
                            )}"
                        >

                        <input
                            type="hidden"
                            name="job_type"
                            value="${escapeHTML(
                                job.type
                            )}"
                        >

                        <input
                            type="hidden"
                            name="job_location"
                            value="${escapeHTML(
                                job.location || ''
                            )}"
                        >

                        <input
                            type="hidden"
                            name="form_started"
                            value="${Date.now()}"
                        >

                        <input
                            type="hidden"
                            name="branch"
                            value="${escapeHTML(
                                isOverseas
                                ? 'pasay'
                                : localRouteKey
                            )}"
                        >

                        <div
                            aria-hidden="true"
                            class="absolute
                                   left-[-9999px]
                                   w-px h-px
                                   overflow-hidden"
                        >
                            <label>
                                Leave this field empty

                                <input
                                    type="text"
                                    name="website"
                                    tabindex="-1"
                                    autocomplete="off"
                                >
                            </label>
                        </div>

                        <div>
                            <p
                                class="block
                                       text-sm
                                       font-semibold
                                       text-slate-800
                                       mb-2"
                            >
                                Application Office
                            </p>

                            <div
                                class="w-full
                                       px-4 py-3
                                       rounded-lg
                                       border
                                       border-slate-300
                                       bg-slate-50
                                       text-sm
                                       font-semibold
                                       text-slate-800"
                            >
                                ${escapeHTML(
                                    applicationOffice
                                )}
                            </div>

                            ${
                                !localRouteAvailable
                                ? `
                                    <p
                                        class="mt-2
                                               text-xs
                                               text-red-600
                                               leading-relaxed"
                                    >
                                        No application office
                                        is currently assigned
                                        to this job location.
                                        Please contact Archway HR
                                        for assistance.
                                    </p>
                                `
                                : ''
                            }
                        </div>

                        <div
                            class="grid
                                   sm:grid-cols-2
                                   gap-5"
                        >
                            <div>
                                <label
                                    for="applicantFullName"
                                    class="block
                                           text-sm
                                           font-semibold
                                           text-slate-800
                                           mb-2"
                                >
                                    Full Name
                                    <span
                                        class="text-red-600"
                                    >
                                        *
                                    </span>
                                </label>

                                <input
                                    id="applicantFullName"
                                    name="full_name"
                                    type="text"
                                    required
                                    autocomplete="name"
                                    maxlength="120"
                                    class="w-full
                                           px-4 py-3
                                           rounded-lg
                                           border
                                           border-slate-300
                                           bg-white
                                           text-base
                                           sm:text-sm
                                           text-slate-900
                                           outline-none
                                           transition
                                           focus:border-primary
                                           focus:ring-2
                                           focus:ring-primary/20"
                                >
                            </div>

                            <div>
                                <label
                                    for="applicantMobile"
                                    class="block
                                           text-sm
                                           font-semibold
                                           text-slate-800
                                           mb-2"
                                >
                                    Mobile Number
                                    <span
                                        class="text-red-600"
                                    >
                                        *
                                    </span>
                                </label>

                                <input
                                    id="applicantMobile"
                                    name="mobile"
                                    type="tel"
                                    required
                                    autocomplete="tel"
                                    maxlength="30"
                                    class="w-full
                                           px-4 py-3
                                           rounded-lg
                                           border
                                           border-slate-300
                                           bg-white
                                           text-base
                                           sm:text-sm
                                           text-slate-900
                                           outline-none
                                           transition
                                           focus:border-primary
                                           focus:ring-2
                                           focus:ring-primary/20"
                                >
                            </div>
                        </div>

                        <div>
                            <label
                                for="applicantEmail"
                                class="block
                                       text-sm
                                       font-semibold
                                       text-slate-800
                                       mb-2"
                            >
                                Email Address
                                <span
                                    class="text-red-600"
                                >
                                    *
                                </span>
                            </label>

                            <input
                                id="applicantEmail"
                                name="email"
                                type="email"
                                required
                                autocomplete="email"
                                maxlength="180"
                                class="w-full
                                       px-4 py-3
                                       rounded-lg
                                       border
                                       border-slate-300
                                       bg-white
                                       text-base
                                       sm:text-sm
                                       text-slate-900
                                       outline-none
                                       transition
                                       focus:border-primary
                                       focus:ring-2
                                       focus:ring-primary/20"
                            >
                        </div>

                        <div>
                            <label
                                for="applicantResume"
                                class="block
                                       text-sm
                                       font-semibold
                                       text-slate-800
                                       mb-2"
                            >
                                Resume / CV
                                <span
                                    class="text-red-600"
                                >
                                    *
                                </span>
                            </label>

                            <input
                                id="applicantResume"
                                name="resume"
                                type="file"
                                required
                                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                onchange="validateResumeFile(this)"
                                class="block
                                       w-full
                                       rounded-lg
                                       border
                                       border-slate-300
                                       bg-white
                                       text-sm
                                       text-slate-600
                                       file:mr-4
                                       file:border-0
                                       file:border-r
                                       file:border-slate-200
                                       file:bg-slate-50
                                       file:px-4
                                       file:py-3
                                       file:text-sm
                                       file:font-semibold
                                       file:text-slate-700
                                       hover:file:bg-slate-100"
                            >

                            <p
                                class="mt-2
                                       text-xs
                                       text-slate-500"
                            >
                                PDF, DOC, or DOCX.
                                Maximum
                                ${escapeHTML(
                                    formConfig.maxResumeMB
                                )} MB.
                            </p>
                        </div>

                        <div>
                            <label
                                for="applicantMessage"
                                class="block
                                       text-sm
                                       font-semibold
                                       text-slate-800
                                       mb-2"
                            >
                                Short Message / Experience

                                <span
                                    class="font-normal
                                           text-slate-400"
                                >
                                    (Optional)
                                </span>
                            </label>

                            <textarea
                                id="applicantMessage"
                                name="message"
                                rows="4"
                                maxlength="1500"
                                placeholder="Briefly tell us about your relevant experience or availability."
                                class="w-full
                                       px-4 py-3
                                       rounded-lg
                                       border
                                       border-slate-300
                                       bg-white
                                       text-base
                                       sm:text-sm
                                       text-slate-900
                                       resize-y
                                       outline-none
                                       transition
                                       focus:border-primary
                                       focus:ring-2
                                       focus:ring-primary/20"
                            ></textarea>
                        </div>

                        <label
                            class="flex
                                   items-start
                                   gap-3
                                   text-sm
                                   text-slate-600
                                   leading-relaxed"
                        >
                            <input
                                type="checkbox"
                                name="privacy_consent"
                                value="yes"
                                required
                                class="mt-1
                                       h-4 w-4
                                       shrink-0
                                       accent-[#0B6E99]"
                            >

                            <span>
                                I consent to Archway International
                                and Marketing Services Inc.
                                processing my personal information
                                and Resume/CV for recruitment
                                purposes.

                                <span
                                    class="text-red-600"
                                >
                                    *
                                </span>
                            </span>
                        </label>
                    </div>

                    <div
                        class="px-6 py-5
                               sm:px-8
                               border-t
                               border-slate-200
                               bg-slate-50/70
                               flex
                               flex-col-reverse
                               sm:flex-row
                               sm:items-center
                               sm:justify-end
                               gap-3"
                    >
                        <button
                            type="button"
                            onclick="closeApplicationForm()"
                            class="px-5
                                   py-2.5
                                   rounded-lg
                                   text-sm
                                   font-semibold
                                   text-slate-600
                                   hover:text-slate-900
                                   hover:bg-slate-100
                                   transition-colors"
                        >
                            ${escapeHTML(
                                formConfig.closeBtn
                            )}
                        </button>

                        <button
                            id="applicationSubmitBtn"
                            type="submit"
                            ${
                                localRouteAvailable
                                ? ''
                                : 'disabled'
                            }
                            class="inline-flex
                                   min-h-11
                                   items-center
                                   justify-center
                                   px-6 py-2.5
                                   rounded-lg
                                   bg-primary
                                   text-white
                                   text-sm
                                   font-semibold
                                   hover:bg-primary-dark
                                   disabled:opacity-60
                                   disabled:cursor-not-allowed
                                   transition-colors"
                        >
                            ${escapeHTML(
                                formConfig.submitBtn
                            )}
                        </button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(
            modal
        );

        document.documentElement
        .style
        .overflow = 'hidden';

        document.body
        .style
        .overflow = 'hidden';

        setTimeout(() => {
            modal.classList.add(
                'modal-visible'
            );
        }, 10);

    }, 210);
}

        function validateResumeFile(input) {
            const file = input?.files?.[0];
            if (!file) return true;

            const formConfig = config.applicantsPage.applicationForm;
            const maxBytes = Number(formConfig.maxResumeMB || 5) * 1024 * 1024;
            const extension = file.name.split('.').pop()?.toLowerCase();
            const allowedExtensions = ['pdf', 'doc', 'docx'];

            if (!allowedExtensions.includes(extension)) {
                input.value = '';
                showApplicationFormStatus(
                    'Please upload a PDF, DOC, or DOCX Resume/CV.',
                    'error'
                );
                return false;
            }

            if (file.size > maxBytes) {
                input.value = '';
                showApplicationFormStatus(
                    `Resume/CV must be ${formConfig.maxResumeMB} MB or smaller.`,
                    'error'
                );
                return false;
            }

            showApplicationFormStatus('', 'clear');
            return true;
        }

        function showApplicationFormStatus(message, type = 'error') {
            const status = document.getElementById('applicationFormStatus');
            if (!status) return;

            if (!message || type === 'clear') {
                status.textContent = '';
                status.className =
                'hidden rounded-lg border px-4 py-3 text-sm leading-relaxed';
                return;
            }

            const isSuccess = type === 'success';
            status.textContent = message;
            status.className = `
                rounded-lg border px-4 py-3 text-sm leading-relaxed
                ${isSuccess
                ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                : 'border-red-200 bg-red-50 text-red-700'}
            `;
        }

        async function submitApplicationForm(event) {
            event.preventDefault();

            const form = event.currentTarget;
            const submitBtn = document.getElementById('applicationSubmitBtn');
            const formConfig = config.applicantsPage.applicationForm;
            const resumeInput = document.getElementById('applicantResume');
            const submittedJobTitle =
            form?.elements?.job_title?.value || 'Selected Position';

            if (!form || !submitBtn) return;
            if (!form.reportValidity()) return;
            if (!validateResumeFile(resumeInput)) return;

            submitBtn.disabled = true;
            submitBtn.textContent = formConfig.submittingLabel;
            showApplicationFormStatus('', 'clear');

            try {
                const response = await fetch(formConfig.endpoint, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                let result = {};
                try {
                    result = await response.json();
                } catch (error) {
                    result = {};
                }

                if (!response.ok || !result.success) {
                    throw new Error(
                        result.message ||
                        'Your application could not be sent. Please try again.'
                    );
                }

                const panel = form.querySelector('.px-6.py-6');
                const footer = form.querySelector('.border-t.border-slate-200');

                if (panel) {
                    panel.innerHTML = `
                        <div class="py-6 sm:py-8">
                            <p
                                class="text-xs font-bold uppercase
                                       tracking-[0.16em] text-emerald-700 mb-3"
                            >
                                Submission Complete
                            </p>

                            <h4
                                class="text-2xl sm:text-3xl
                                       font-extrabold tracking-tight
                                       text-slate-900"
                            >
                                ${escapeHTML(formConfig.successTitle)}
                            </h4>

                            <p
                                class="mt-4 text-sm sm:text-base
                                       text-slate-600 leading-relaxed"
                            >
                                ${escapeHTML(formConfig.successMessage)}
                            </p>

                            <p
                                class="mt-5 text-sm
                                       font-medium text-slate-700"
                            >
                                Position: ${escapeHTML(submittedJobTitle)}
                            </p>
                        </div>
                    `;
                }

                if (footer) {
                    footer.innerHTML = `
                        <button
                            type="button"
                            onclick="closeApplicationForm()"
                            class="inline-flex min-h-11
                                   items-center justify-center
                                   px-6 py-2.5 rounded-lg
                                   bg-primary text-white
                                   text-sm font-semibold
                                   hover:bg-primary-dark
                                   transition-colors"
                        >
                            ${escapeHTML(formConfig.closeBtn)}
                        </button>
                    `;
                }

                showToast('Application sent successfully');

            } catch (error) {
                showApplicationFormStatus(
                    error.message ||
                    'Your application could not be sent. Please try again.',
                    'error'
                );

                submitBtn.disabled = false;
                submitBtn.textContent = formConfig.submitBtn;
            }
        }

        function closeApplicationForm() {
            const modal = document.getElementById('applicationModal');
            if (!modal) return;

            modal.classList.remove('modal-visible');

            setTimeout(() => {
                modal.remove();
                document.documentElement.style.overflow = '';
                document.body.style.overflow = '';
            }, 200);
        }
