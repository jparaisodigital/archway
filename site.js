// site.js

// ===== SHARED =====
function renderNav(activePage) {
    return `
      <nav class="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
          <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
              <a href="index.html" class="flex items-center gap-3">
                  <img src="${config.logo.src}" alt="${config.logo.alt}" style="height: ${config.logo.height}px; width: auto;" class="object-contain">
              </a>
              <div class="hidden md:flex items-center gap-8 text-sm font-medium">
                  ${config.nav.map(item => `
                      <a href="${item.href}" class="${item.href === activePage ? 'text-primary font-semibold' : 'text-slate-600 hover:text-primary transition'}">${item.label}</a>
                  `).join('')}
              </div>
              <a href="index.html#contact" class="hidden md:inline-flex items-center px-5 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition">
                  Contact Us
              </a>
              <button onclick="toggleMobileMenu()" class="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-slate-700 hover:bg-slate-100 transition" aria-label="Menu">
                  <svg id="menu-icon-open" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
                  <svg id="menu-icon-close" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
          </div>
          <div id="mobileMenu" class="md:hidden hidden border-t border-slate-200 bg-white">
              <div class="px-6 py-4 flex flex-col gap-1">
                  ${config.nav.map(item => `
                      <a href="${item.href}" class="px-3 py-2.5 rounded-lg text-sm font-medium ${item.href === activePage ? 'text-primary bg-primary/5 font-semibold' : 'text-slate-600 hover:bg-slate-50'}">${item.label}</a>
                  `).join('')}
                  <a href="index.html#contact" class="mt-2 inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition">
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

function renderFooter() {
    return `
      <footer class="bg-slate-900 text-slate-400 py-8 text-center text-sm space-y-1">
          <p>${config.footer.copyright}</p>
          <p class="text-xs">${config.poeaLicense}</p>
      </footer>
    `;
}

// ===== JOBS DATA (mula sa Google Sheets) =====
async function fetchJobs() {
    try {
        const res = await fetch(config.jobsSheetUrl);
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
    return `
      <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div class="p-6 border-b border-slate-100">
              <h3 class="text-xl font-bold text-slate-900">${title}</h3>
          </div>
          <div class="max-h-96 overflow-y-auto">
              <table class="w-full text-sm">
                  <thead class="bg-slate-50 sticky top-0">
                      <tr>
                          <th class="text-left px-4 py-2 font-semibold text-slate-600">Job Title</th>
                          <th class="text-right px-4 py-2 font-semibold text-slate-600">Apply</th>
                      </tr>
                  </thead>
                  <tbody>
                      ${jobs.length === 0 ? `
                          <tr><td colspan="2" class="px-4 py-6 text-center text-slate-400">No openings right now.</td></tr>
                      ` : jobs.map(job => `
                          <tr class="border-t border-slate-100 hover:bg-slate-50">
                              <td class="px-4 py-3 text-slate-700">${job.title}</td>
                              <td class="px-4 py-3 text-right">
                                  <button 
                                      onclick="openJobPopup('${job.id}', '${job.title.replace(/'/g, "\\'")}', '${job.type}')"
                                      class="inline-block px-4 py-1.5 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition">
                                      Apply
                                  </button>
                              </td>
                          </tr>
                      `).join('')}
                  </tbody>
              </table>
          </div>
      </div>
    `;
}

// ===== HOME PAGE =====
function renderJobsLoading(title) {
    return `
      <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div class="p-6 border-b border-slate-100">
              <h3 class="text-xl font-bold text-slate-900">${title}</h3>
          </div>
          <div class="p-10 text-center text-slate-400 text-sm">Loading job listings...</div>
      </div>
    `;
}

function renderHomePage() {
    const app = document.getElementById('app');
    const c = config;
    
    app.innerHTML = `
    ${renderNav('index.html')}
    
    <div class="fade-in-content">
    <section class="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden" id="home">
          <div class="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-dark"></div>
          ${c.hero.images.map((img, i) => `<div class="hero-bg-image ${i === 0 ? 'active' : ''}" style="background-image:url('${img}');"></div>`).join('')}
          <div class="relative max-w-7xl mx-auto px-6">
              <div class="max-w-3xl">
                  <p class="text-accent font-semibold tracking-wide uppercase text-sm mb-4">${c.year} Year of Excellence</p>
                  <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">${c.hero.title}</h1>
                  <p class="text-lg text-white/90 leading-relaxed mb-10 max-w-2xl">${c.hero.subtitle}</p>
                  <div class="flex flex-wrap gap-4">
                      <a href="#jobs" class="inline-flex items-center px-7 py-3.5 rounded-full bg-white text-primary font-semibold shadow-lg hover:shadow-xl transition">${c.hero.ctaPrimary}</a>
                      <a href="employers.html" class="inline-flex items-center px-7 py-3.5 rounded-full border-2 border-white/40 text-white font-semibold hover:bg-white/10 transition">${c.hero.ctaSecondary}</a>
                  </div>
              </div>
          </div>
      </section>
  
      <section class="relative -mt-10 z-10 reveal">
          <div class="max-w-7xl mx-auto px-6">
              <div class="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
                  ${c.stats.map(s => `
                      <div class="text-center">
                          <div class="text-3xl lg:text-4xl font-extrabold text-primary mb-1">${s.value}</div>
                          <div class="text-sm text-slate-500 font-medium">${s.label}</div>
                      </div>
                  `).join('')}
              </div>
          </div>
      </section>
  
      <section class="py-20 lg:py-28 reveal" id="jobs">
          <div class="max-w-7xl mx-auto px-6">
              <div class="text-center mb-14">
                  <h2 class="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">${c.jobs.title}</h2>
                  <p class="text-slate-500 max-w-xl mx-auto">Explore current opportunities for Filipino professionals and skilled workers.</p>
              </div>
              <div class="grid md:grid-cols-2 gap-8" id="jobsGrid">
                  ${renderJobsLoading(c.jobs.local.title)}
                  ${renderJobsLoading(c.jobs.overseas.title)}
              </div>
          </div>
      </section>
  
      <section class="py-20 lg:py-28 bg-white reveal" id="about">
          <div class="max-w-7xl mx-auto px-6">
              <div class="max-w-3xl mx-auto text-center mb-12">
                  <h2 class="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-6">${c.about.title}</h2>
              </div>
              <div class="max-w-3xl mx-auto space-y-6 text-slate-600 leading-relaxed">
                  ${c.about.paragraphs.map(p => `<p>${p}</p>`).join('')}
              </div>
              <div class="mt-12 text-center">
                  <span class="inline-flex items-center px-4 py-2 rounded-full bg-green-50 text-green-700 text-sm font-medium">
                      ✓ Zero-complaint & Zero-citation sanction from POEA
                  </span>
              </div>
          </div>
      </section>
  
      <section class="py-20 lg:py-28 bg-primary text-white reveal" id="contact">
          <div class="max-w-7xl mx-auto px-6">
              <div class="grid lg:grid-cols-2 gap-12 items-start">
                  <div>
                      <h2 class="text-3xl lg:text-4xl font-extrabold mb-6">${c.contact.title}</h2>
                      <p class="text-white/80 mb-8 leading-relaxed">We are ready to assist applicants and employers. Reach out to us through any of the channels below.</p>
                      <div class="space-y-5">
                          <div class="flex gap-4">
                              <div class="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                              </div>
                              <div>
                                  <div class="font-medium mb-1">Address</div>
                                  <div class="text-white/80 text-sm leading-relaxed">${c.contact.address}</div>
                              </div>
                          </div>
                          <div class="flex gap-4">
                              <div class="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                              </div>
                              <div>
                                  <div class="font-medium mb-1">Phone</div>
                                  <div class="text-white/80 text-sm space-y-1">${c.contact.phones.map(p => `<div>${p}</div>`).join('')}</div>
                              </div>
                          </div>
                          <div class="flex gap-4">
                              <div class="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                              </div>
                              <div>
                                  <div class="font-medium mb-1">Email</div>
                                  <div class="text-white/80 text-sm space-y-1">${c.contact.emails.map(e => `<div>${e}</div>`).join('')}</div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
                      <h3 class="text-xl font-bold mb-6">Send a Message</h3>
                      <form id="contactForm" class="space-y-4">
    <!-- FormSubmit Settings -->
    <input type="hidden" name="_subject" value="New Message from Archway Website">
    <input type="hidden" name="_template" value="table">
    <input type="hidden" name="_captcha" value="false">

    <input type="text" name="Name" placeholder="Your Name" class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-accent" required>
    
    <input type="email" name="Email" placeholder="Email Address" class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-accent" required>
    
    <select name="Role" class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-accent" required>
        <option value="" class="text-slate-900">I am a...</option>
        <option value="Job Applicant" class="text-slate-900">Job Applicant</option>
        <option value="Employer / Client" class="text-slate-900">Employer / Client</option>
    </select>
    
    <textarea name="Message" rows="4" placeholder="Your Message" class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-accent" required></textarea>
    
    <button type="submit" id="contactSubmitBtn" class="w-full py-3.5 rounded-xl bg-white text-primary font-semibold hover:bg-slate-100 transition flex items-center justify-center gap-2">
        <span>Send Message</span>
        <!-- Loading Spinner (hidden by default) -->
        <svg id="contactSpinner" class="hidden animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </button>

    <!-- Success Message (hidden by default) -->
    <div id="contactSuccess" class="hidden mt-4 p-4 rounded-xl bg-green-500/20 border border-green-400/30 text-center">
        <p class="text-green-300 font-medium">✓ Message sent successfully!</p>
        <p class="text-green-200/80 text-sm mt-1">We'll get back to you soon.</p>
    </div>
    
    <!-- Error Message (hidden by default) -->
    <div id="contactError" class="hidden mt-4 p-4 rounded-xl bg-red-500/20 border border-red-400/30 text-center">
        <p class="text-red-300 font-medium">✗ Failed to send message.</p>
        <p class="text-red-200/80 text-sm mt-1">Please try again later.</p>
    </div>
</form>
                  </div>
              </div>
          </div>
      </section>
    
      <section class="reveal">
          <iframe
              src="${c.contact.mapEmbedUrl}"
              width="100%"
              height="420"
              style="border:0; display:block;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Archway Office Location">
          </iframe>
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
            grid.innerHTML = renderJobTable(c.jobs.local.title, localJobs) + renderJobTable(c.jobs.overseas.title, overseasJobs);
        }
    });

    // ===== CONTACT FORM HANDLER  =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btn = document.getElementById('contactSubmitBtn');
            const successMsg = document.getElementById('contactSuccess');
            const errorMsg = document.getElementById('contactError');
            const spinner = document.getElementById('contactSpinner');
            
            // Reset messages
            successMsg.classList.add('hidden');
            errorMsg.classList.add('hidden');

            // Loading state
            btn.disabled = true;
            btn.querySelector('span').textContent = 'Sending...';
            if (spinner) spinner.classList.remove('hidden');
            btn.classList.add('opacity-70');

            try {
                const formData = new FormData(contactForm);
                
                const response = await fetch('https://formsubmit.co/ajax/jparaiso.digital@gmail.com', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    contactForm.reset();
                    successMsg.classList.remove('hidden');
                    
                    setTimeout(() => {
                        successMsg.classList.add('hidden');
                    }, 5000);
                } else {
                    errorMsg.classList.remove('hidden');
                }
            } catch (err) {
                console.error(err);
                errorMsg.classList.remove('hidden');
            } finally {
                btn.disabled = false;
                btn.querySelector('span').textContent = 'Send Message';
                if (spinner) spinner.classList.add('hidden');
                btn.classList.remove('opacity-70');
            }
        });
    }
}  

// ===== SCROLL REVEAL  =====
function initScrollReveal() {
    const observerOptions = { threshold: 0.15, rootMargin: "0px 0px -40px 0px" };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, observerOptions);
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ===== ABOUT PAGE =====
function renderAboutPage() {
    const app = document.getElementById('app');
    const p = config.aboutPage;
    
    app.innerHTML = `
      ${renderNav('about.html')}
  
      <div class="bg-primary text-white py-12">
          <div class="max-w-4xl mx-auto px-4 text-center">
              <h1 class="text-3xl md:text-4xl font-bold mb-3">${p.headerTitle}</h1>
              <p class="text-white/90">${p.headerSubtitle}</p>
          </div>
      </div>
  
      <div class="max-w-4xl mx-auto px-4 py-12">
          <div class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-10 space-y-8">
              <div>
                  <h2 class="text-xl font-bold text-primary mb-4">${p.whoWeAreTitle}</h2>
                  ${p.whoWeAreParagraphs.map(para => `<p class="text-slate-600 leading-relaxed mb-4">${para}</p>`).join('')}
              </div>
              <div class="bg-slate-50 rounded-xl p-5">
                  <p class="text-slate-600 leading-relaxed">${p.highlight}</p>
              </div>
              <div class="pt-2">
                  <a href="index.html#contact" class="inline-flex items-center px-7 py-3.5 rounded-full bg-primary text-white font-semibold hover:bg-primary-dark transition">
                      Get in Touch
                  </a>
              </div>
          </div>
      </div>
  
      ${renderFooter()}
    `;
}

// ===== EMPLOYERS PAGE =====
function renderEmployersPage() {
    const app = document.getElementById('app');
    const p = config.employersPage;
    
    app.innerHTML = `
      ${renderNav('employers.html')}
    
      <div class="bg-primary text-white py-12">
          <div class="max-w-4xl mx-auto px-4 text-center">
              <h1 class="text-3xl md:text-4xl font-bold mb-3">${p.headerTitle}</h1>
              <p class="text-white/90">${p.headerSubtitle}</p>
          </div>
      </div>
    
      <div class="max-w-4xl mx-auto px-4 py-12">
          <div class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-10 space-y-10">
              <div>
                  <h2 class="text-xl font-bold text-primary mb-4">${p.reqTitle}</h2>
                  ${p.reqIntro.map(para => `<p class="text-slate-600 leading-relaxed mb-4">${para}</p>`).join('')}
              </div>
    
              <div>
                  <ol class="space-y-4 text-slate-600 list-decimal list-inside">
                      ${p.requirements.map(req => `<li>${req}</li>`).join('')}
                  </ol>
              </div>
    
              <div class="bg-slate-50 rounded-xl p-5 text-slate-600 text-sm leading-relaxed">
                  <p class="mb-3">${p.note}</p>
                  <p>
                      If you have any questions regarding the above, do not hesitate to get in touch with our Recruitment Officer via email at
                      <a href="mailto:${config.contact.emails[0]}" class="text-primary font-medium hover:underline">${config.contact.emails[0]}</a>.
                      We'll be happy to hear from you.
                  </p>
              </div>
    
              <div class="pt-2">
                  <a href="index.html#contact" class="inline-flex items-center px-7 py-3.5 rounded-full bg-primary text-white font-semibold hover:bg-primary-dark transition">
                      Contact Us / Partner With Us
                  </a>
              </div>
          </div>
      </div>
    
      ${renderFooter()}
    `;
}

// ===== ADMIN / JOBS DASHBOARD PAGE (client-only) =====
function renderAdminPage() {
    const app = document.getElementById('app');
    const p = config.adminPage;
    
    app.innerHTML = `
      ${renderNav('admin.html')}
    
      <div class="bg-primary text-white py-12">
          <div class="max-w-4xl mx-auto px-4 text-center">
              <div class="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-semibold uppercase tracking-wide">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                  Client Access Only
              </div>
              <h1 class="text-3xl md:text-4xl font-bold mb-3">${p.headerTitle}</h1>
              <p class="text-white/90">${p.headerSubtitle}</p>
          </div>
      </div>
    
      <div class="max-w-4xl mx-auto px-4 py-12">
          <div class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-10 space-y-8">
    
              <div class="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 rounded-xl p-6">
                  <div>
                      <h2 class="text-lg font-bold text-slate-900 mb-1">Jobs Sheet</h2>
                      <p class="text-sm text-slate-500">Open your spreadsheet to add, edit, or remove job openings.</p>
                  </div>
                  <a href="${p.sheetEditUrl}" target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary-dark transition shrink-0">
                      Open Jobs Sheet
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                  </a>
              </div>
    
              <div>
                  <h2 class="text-xl font-bold text-primary mb-6">${p.instructions.title}</h2>
                  <div class="relative">
                      <div class="absolute left-5 top-0 bottom-0 w-0.5 bg-primary/20"></div>
                      <div class="space-y-8">
                          ${p.instructions.steps.map((step, i) => `
                              <div class="relative flex gap-5">
                                  <div class="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center shrink-0 z-10 shadow-md text-sm">${i + 1}</div>
                                  <div class="pt-1.5">
                                      <h3 class="font-semibold text-slate-800 mb-1">${step.title}</h3>
                                      <p class="text-sm text-slate-500 leading-relaxed">${step.desc}</p>
                                  </div>
                              </div>
                          `).join('')}
                      </div>
                  </div>
              </div>
    
              <div class="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-800 leading-relaxed flex gap-3">
                  <svg class="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  <p>This page is not listed on the public menu — it's meant for internal use only. Keep this link private and only share it with authorized staff.</p>
              </div>
    
          </div>
      </div>
    
      ${renderFooter()}
    `;
}

// ===== APPLICANTS PAGE =====
let applicantJobsData = [];

function renderJobTypeOptions(jobs, selectedType) {
    const types = [...new Set(jobs.map(j => j.type).filter(Boolean))];
    return `<option value="">Select...</option>` +
    types.map(t => `<option value="${t}" ${t === selectedType ? 'selected' : ''}>${t}</option>`).join('');
}

function renderJobTitleOptions(jobs, type, selectedTitle) {
    if (!type) {
        return `<option value="">Please select a Job Type first</option>`;
    }
    const filtered = jobs.filter(j => j.type === type);
    if (filtered.length === 0) {
        return `<option value="">Select a Position...</option>`;
    }
    return `<option value="">Select...</option>` +
    filtered.map(j => `<option value="${j.title}" ${j.title === selectedTitle ? 'selected' : ''}>${j.title}</option>`).join('');
}

function onJobTypeChange() {
    const type = document.getElementById('jobTypeSelect').value;
    const titleSelect = document.getElementById('jobTitleSelect');
    titleSelect.innerHTML = renderJobTitleOptions(applicantJobsData, type, '');
}

function renderApplicantsPage() {
    const app = document.getElementById('app');
    const p = config.applicantsPage;
    
    // Ang ?job= at ?type= mula sa URL (galing sa "Apply" click sa homepage)
    const urlParams = new URLSearchParams(window.location.search);
    const preselectedType = urlParams.get('type') || '';
    const preselectedJobTitle = urlParams.get('job') || '';
    
    const languageOptions = [
        "English-fluent", "English-mediocre",
        "Spanish-fluent", "Spanish-mediocre",
        "French-fluent", "French-mediocre",
        "Arabic-fluent", "Arabic-mediocre",
        "Mandarin-fluent", "Mandarin-mediocre",
        "Russian-fluent", "Russian-mediocre",
        "not applicable"
    ];
    
    const renderLanguageDropdown = (num) => `
      <select name="Language ${num}" class="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none">
          <option value=""></option>
          ${languageOptions.map(opt => `<option>${opt}</option>`).join('')}
      </select>
    `;
    
    app.innerHTML = `
    ${renderNav('applicants.html')}
    <div class="fade-in-content">
    
    <div class="bg-primary text-white py-12">
              <div class="max-w-4xl mx-auto px-4 text-center">
                  <h1 class="text-3xl md:text-4xl font-bold mb-3">${p.headerTitle}</h1>
                  <p class="text-white/90">${p.headerSubtitle}</p>
              </div>
          </div>
    
          <div class="max-w-4xl mx-auto px-4 py-12">
    
          <!-- JOB SUMMARY CARD (lalabas lang kapag may pre-selected job) -->
    <div id="jobSummaryCard" class="hidden mb-6 bg-white rounded-2xl shadow-lg border border-primary/20 overflow-hidden">
        <div class="bg-primary/5 px-6 py-4 border-b border-primary/10 flex items-center justify-between">
            <div>
                <p class="text-xs font-semibold text-primary uppercase tracking-wide">You are applying for</p>
                <h2 id="summaryJobTitle" class="text-xl font-bold text-slate-900 mt-0.5"></h2>
            </div>
            <span id="summaryJobType" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white"></span>
        </div>
        <div class="px-6 py-3 text-sm text-slate-500">
            Please complete the form below. Your selected job is already pre-filled.
        </div>
    </div>
    
              <div class="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                  <form action="${p.formEndpoint}" method="POST" enctype="multipart/form-data" class="p-6 md:p-10 space-y-8">
                      <input type="hidden" name="_subject" value="New Job Application - Archway">
                      <input type="hidden" name="_captcha" value="false">
                      <input type="hidden" name="_template" value="table">
    
                      <div>
                          <h2 class="text-lg font-bold text-primary mb-4 border-b pb-2">Job Preference</h2>
                              <div class="grid md:grid-cols-2 gap-4">
                              <div>
                                  <label class="block text-sm font-medium mb-1">Job Type *</label>
                                  <select id="jobTypeSelect" name="Job Type" required onchange="onJobTypeChange()" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none">
                                      <option value="">Loading job types...</option>
                                  </select>
                              </div>
                              <div>
                                  <label class="block text-sm font-medium mb-1">Job Applying For *</label>
                                  <select id="jobTitleSelect" name="Job Applying For" required class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none">
                                      <option value="">Please select a Job Type first</option>
                                  </select>
                              </div>
                              <div>
                                  <label class="block text-sm font-medium mb-1">Expected Monthly Salary</label>
                                  <input type="text" name="Expected Monthly Salary" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none">
                              </div>
                          </div>
                      </div>
    
                      <div>
                          <h2 class="text-lg font-bold text-primary mb-4 border-b pb-2">Personal Information</h2>
                          <div class="grid md:grid-cols-2 gap-4">
                              <div><label class="block text-sm font-medium mb-1">First Name *</label><input type="text" name="First Name" required class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none"></div>
                              <div><label class="block text-sm font-medium mb-1">Middle Name</label><input type="text" name="Middle Name" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none"></div>
                              <div><label class="block text-sm font-medium mb-1">Last Name *</label><input type="text" name="Last Name" required class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none"></div>
                              <div>
                                  <label class="block text-sm font-medium mb-1">Gender *</label>
                                  <select name="Gender" required class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none">
                                      <option value="">Select...</option>
                                      <option>Male</option>
                                      <option>Female</option>
                                  </select>
                              </div>
                              <div><label class="block text-sm font-medium mb-1">Birthdate *</label><input type="date" name="Birthdate" required class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none"></div>
                              <div><label class="block text-sm font-medium mb-1">Birthplace</label><input type="text" name="Birthplace" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none"></div>
                              <div><label class="block text-sm font-medium mb-1">Citizenship *</label><input type="text" name="Citizenship" value="Filipino" required class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none"></div>
                              <div>
                                  <label class="block text-sm font-medium mb-1">Civil Status *</label>
                                  <select name="Civil Status" required class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none">
                                      <option value="">Select...</option>
                                      <option>Single</option>
                                      <option>Married</option>
                                      <option>Widowed</option>
                                      <option>Separated</option>
                                  </select>
                              </div>
                              <div class="md:col-span-2"><label class="block text-sm font-medium mb-1">Address *</label><input type="text" name="Address" required class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none"></div>
                              <div><label class="block text-sm font-medium mb-1">City *</label><input type="text" name="City" required class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none"></div>
                              <div><label class="block text-sm font-medium mb-1">Zip Code</label><input type="text" name="Zip Code" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none"></div>
                              <div><label class="block text-sm font-medium mb-1">Country *</label><input type="text" name="Country" value="Philippines" required class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none"></div>
                              <div><label class="block text-sm font-medium mb-1">Mobile Phone *</label><input type="tel" name="Mobile Phone" required class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none"></div>
                              <div><label class="block text-sm font-medium mb-1">Email *</label><input type="email" name="Email" required class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none"></div>
                              <div><label class="block text-sm font-medium mb-1">SSS No.</label><input type="text" name="SSS No" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none"></div>
                              <div><label class="block text-sm font-medium mb-1">PhilHealth No.</label><input type="text" name="PhilHealth No" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none"></div>
                              <div><label class="block text-sm font-medium mb-1">Pag-IBIG No.</label><input type="text" name="Pag-IBIG No" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none"></div>
                              <div><label class="block text-sm font-medium mb-1">TIN</label><input type="text" name="TIN" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none"></div>
                          </div>
                      </div>
    
                      <div>
                          <h2 class="text-lg font-bold text-primary mb-4 border-b pb-2">In Case of Emergency</h2>
                          <div class="grid md:grid-cols-2 gap-4">
                              <div><label class="block text-sm font-medium mb-1">Contact Person *</label><input type="text" name="Emergency Contact Person" required class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none"></div>
                              <div><label class="block text-sm font-medium mb-1">Relationship</label><input type="text" name="Emergency Relationship" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none"></div>
                              <div><label class="block text-sm font-medium mb-1">Phone *</label><input type="tel" name="Emergency Phone" required class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none"></div>
                              <div><label class="block text-sm font-medium mb-1">Address</label><input type="text" name="Emergency Address" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none"></div>
                          </div>
                      </div>
    
                                        <div>
                      <h2 class="text-lg font-bold text-primary mb-4 border-b pb-2">Academic Information</h2>
                      <div class="space-y-4">
                          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div>
                                  <label class="block text-sm font-medium mb-1">High School Graduate? *</label>
                                  <select name="High School Graduate" required class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none">
                                      <option value="">Select...</option>
                                      <option>Yes</option>
                                      <option>No</option>
                                  </select>
                              </div>
                              <div>
                                  <label class="block text-sm font-medium mb-1">College Graduate? *</label>
                                  <select name="College Graduate" required class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none">
                                      <option value="">Select...</option>
                                      <option>Yes</option>
                                      <option>No</option>
                                  </select>
                              </div>
                              <div>
                                  <label class="block text-sm font-medium mb-1">Masteral Graduate?</label>
                                  <select name="Masteral Graduate" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none">
                                      <option value="">Select...</option>
                                      <option>Yes</option>
                                      <option>No</option>
                                  </select>
                              </div>
                              <div>
                                  <label class="block text-sm font-medium mb-1">PhD Graduate?</label>
                                  <select name="PhD Graduate" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none">
                                      <option value="">Select...</option>
                                      <option>Yes</option>
                                      <option>No</option>
                                  </select>
                              </div>
                          </div>
                          <div>
                              <label class="block text-sm font-medium mb-1">College & Post-Graduate Education</label>
                              <textarea name="College and Post-Graduate Education" rows="2" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none" placeholder="If applicable, write here the course taken, degree obtained, the name of the school, year graduated"></textarea>
                          </div>
                          <div>
                              <label class="block text-sm font-medium mb-1">High School & Elementary Education</label>
                              <textarea name="High School and Elementary" rows="2" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none" placeholder="Write here the highest grade completed, the name of school, year graduated"></textarea>
                          </div>
                          <div>
                              <label class="block text-sm font-medium mb-1">Professional Licenses</label>
                              <input type="text" name="Professional Licenses" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none">
                          </div>
                      </div>
                  </div>
    
                                        <div>
                      <h2 class="text-lg font-bold text-primary mb-4 border-b pb-2">Skills</h2>
                      <div class="space-y-4">
                          <div>
                              <label class="block text-sm font-medium mb-1">Languages Spoken</label>
                              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                                  <div>
                                      <span class="text-xs text-slate-500">1.</span>
                                      ${renderLanguageDropdown(1)}
                                  </div>
                                  <div>
                                      <span class="text-xs text-slate-500">2.</span>
                                      ${renderLanguageDropdown(2)}
                                  </div>
                                  <div>
                                      <span class="text-xs text-slate-500">3.</span>
                                      ${renderLanguageDropdown(3)}
                                  </div>
                              </div>
                          </div>
                          <div class="grid md:grid-cols-2 gap-4">
                              <div><label class="block text-sm font-medium mb-1">Knowledge of Software / Tools</label><input type="text" name="Software Tools" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none" placeholder="MS Word, Excel, Photoshop, etc."></div>
                              <div><label class="block text-sm font-medium mb-1">Other Special Skills</label><input type="text" name="Special Skills" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none"></div>
                          </div>
                          <div>
                              <label class="block text-sm font-medium mb-1">Seminars Attended</label>
                              <textarea name="Seminars Attended" rows="2" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none" placeholder="Title of seminars & dates attended"></textarea>
                          </div>
                      </div>
                  </div>
    
                      <div>
                          <h2 class="text-lg font-bold text-primary mb-4 border-b pb-2">Previous Employments</h2>
                          <textarea name="Previous Employments" rows="4" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none" placeholder="Previous employers, dates employed, position held, & tasks performed"></textarea>
                      </div>
    
                      <div>
                          <h2 class="text-lg font-bold text-primary mb-4 border-b pb-2">Resume / CV Upload</h2>
                          <div>
                              <label class="block text-sm font-medium mb-1">Upload your Resume (PDF or Word) *</label>
                              <input type="file" name="Resume" accept=".pdf,.doc,.docx" required class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none">
                              <p class="text-xs text-slate-500 mt-1">Accepted: PDF, DOC, DOCX • Max recommended size: 5MB</p>
                          </div>
                      </div>
    
                      <div class="bg-slate-50 p-4 rounded-lg text-sm text-slate-600">
                          <label class="flex items-start gap-3">
                              <input type="checkbox" name="Consent" required class="mt-1">
                              <span>I certify that the information provided is true and correct. I understand that any false statement may result in the rejection of my application. I also consent to the processing of my personal data in accordance with the Data Privacy Act of 2012.</span>
                          </label>
                      </div>
    
                      <div class="pt-4">
                          <button type="submit" class="w-full md:w-auto px-10 py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition">Submit Application</button>
                      </div>
                  </form>
              </div>
          </div>
    
          <div class="max-w-4xl mx-auto px-4 pb-16 space-y-6">
              <div class="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden reveal">
                  <button onclick="toggleSection('protocols')" class="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-slate-50 transition">
                      <h2 class="text-lg font-bold text-primary">${p.protocols.title}</h2>
                      <span id="icon-protocols" class="text-2xl text-primary transition-transform duration-300">+</span>
                  </button>
                  <div id="protocols" class="accordion-content px-5 md:px-6 text-slate-600 leading-relaxed space-y-3 text-sm">
                      <div class="pb-6">
                          ${p.protocols.intro.map(para => `<p>${para}</p>`).join('')}
                          <ol class="list-decimal list-inside space-y-2 ml-1">
                              ${p.protocols.tips.map(tip => `<li>${tip}</li>`).join('')}
                          </ol>
                      </div>
                  </div>
              </div>
    
              <div class="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden reveal">
                  <button onclick="toggleSection('docs')" class="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-slate-50 transition">
                      <h2 class="text-lg font-bold text-primary">${p.docs.title}</h2>
                      <span id="icon-docs" class="text-2xl text-primary transition-transform duration-300">+</span>
                  </button>
                  <div id="docs" class="accordion-content px-5 md:px-6 text-slate-600 leading-relaxed text-sm">
                      <div class="pb-6 space-y-6">
                          <div>
                              <h3 class="font-semibold text-slate-800 mb-2">${p.docs.overseas.title}</h3>
                              <ul class="list-disc list-inside space-y-1 ml-1">${p.docs.overseas.items.map(i => `<li>${i}</li>`).join('')}</ul>
                          </div>
                          <div>
                              <h3 class="font-semibold text-slate-800 mb-2">${p.docs.local.title}</h3>
                              <ul class="list-disc list-inside space-y-1 ml-1">${p.docs.local.items.map(i => `<li>${i}</li>`).join('')}</ul>
                          </div>
                      </div>
                  </div>
              </div>
    
              <div class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-10">
                  <h2 class="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-2">${p.process.title}</h2>
                  <p class="text-center text-slate-500 mb-12 text-sm">${p.process.subtitle}</p>
                  <div class="relative max-w-2xl mx-auto">
                      <div class="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/20"></div>
                      <div class="space-y-10">
                          ${p.process.steps.map((step, i) => `
                              <div class="relative flex gap-6">
                                  <div class="w-12 h-12 rounded-full bg-primary text-white font-bold text-lg flex items-center justify-center shrink-0 z-10 shadow-md">${i + 1}</div>
                                  <div class="pt-1">
                                      <h3 class="font-semibold text-slate-800 text-lg mb-1">${step.title}</h3>
                                      <p class="text-sm text-slate-500 leading-relaxed">${step.desc}</p>
                                  </div>
                              </div>
                          `).join('')}
                      </div>
                  </div>
              </div>
          </div>
    
                  ${renderFooter()}
          </div>
        `;
    
    initScrollReveal();
    
    fetchJobs().then(jobs => {
        applicantJobsData = jobs;
        const typeSelect = document.getElementById('jobTypeSelect');
        const titleSelect = document.getElementById('jobTitleSelect');
        if (typeSelect) typeSelect.innerHTML = renderJobTypeOptions(jobs, preselectedType);
        if (titleSelect) titleSelect.innerHTML = renderJobTitleOptions(jobs, preselectedType, preselectedJobTitle);
        
        // Show Job Summary Card if coming from popup / URL
        if (preselectedJobTitle) {
            const card = document.getElementById('jobSummaryCard');
            const titleEl = document.getElementById('summaryJobTitle');
            const typeEl = document.getElementById('summaryJobType');
            
            if (card && titleEl && typeEl) {
                titleEl.textContent = preselectedJobTitle;
                typeEl.textContent = preselectedType || 'Job';
                card.classList.remove('hidden');
            }
        }
    });
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
function openJobPopup(id, title, type) {
    // Find the full job object so we can show extra details
    const job = (window._allJobs || []).find(j => j.id === id) || { id, title, type };
    
    // Remove existing modal if any
    const existing = document.getElementById('jobModal');
    if (existing) existing.remove();
    
    // Helper: only show a field if it has value
    const field = (label, value) => {
        if (!value) return '';
        return `
            <div>
                <p class="text-slate-500 text-xs mb-1">${label}</p>
                <p class="font-medium text-slate-800 whitespace-pre-line">${value}</p>
            </div>
        `;
    };
    
    const hasExtraDetails = job.specialization || job.location || job.experience || 
    job.certifications || job.description || job.requirements;
    
    const modal = document.createElement('div');
    modal.id = 'jobModal';
    modal.className = 'fixed inset-0 z-[100] flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" onclick="closeJobPopup()"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6 border-b border-slate-100">
                <div class="flex items-start justify-between gap-4">
                    <div>
                        <p class="text-xs font-semibold text-primary uppercase tracking-wide mb-1">${config.jobsConfig.popup.title}</p>
                        <h3 class="text-xl font-bold text-slate-900">${job.title}</h3>
                    </div>
                    <button onclick="closeJobPopup()" class="text-slate-400 hover:text-slate-600 text-2xl leading-none">&times;</button>
                </div>
            </div>
    
            <div class="p-6 space-y-5">
                <div class="grid grid-cols-2 gap-4 text-sm">
                    ${field('Type', job.type)}
                    ${field('Job ID', job.id)}
                    ${field('Specialization', job.specialization)}
                    ${field('Location', job.location)}
                    ${field('Years Experience', job.experience)}
                    ${field('Certifications', job.certifications)}
                </div>
    
                ${job.description ? `
                    <div>
                        <p class="text-slate-500 text-xs mb-1">Job Description (Responsibilities)</p>
                        <p class="text-sm text-slate-700 whitespace-pre-line leading-relaxed">${job.description}</p>
                    </div>
                ` : ''}
    
                ${job.requirements ? `
                    <div>
                        <p class="text-slate-500 text-xs mb-1">Requirements (Qualifications)</p>
                        <p class="text-sm text-slate-700 whitespace-pre-line leading-relaxed">${job.requirements}</p>
                    </div>
                ` : ''}
    
                ${!hasExtraDetails ? `
                    <div class="bg-slate-50 rounded-xl p-4 text-sm text-slate-500">
                        ${config.jobsConfig.popup.noDetails}
                    </div>
                ` : ''}
            </div>
    
            <div class="p-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                <button onclick="closeJobPopup()" 
                    class="flex-1 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition">
                    ${config.jobsConfig.popup.closeBtn}
                </button>
                <a href="applicants.html?job=${encodeURIComponent(job.title)}&type=${encodeURIComponent(job.type)}" 
                    class="flex-1 px-5 py-2.5 rounded-xl bg-primary text-white font-semibold text-center hover:bg-primary-dark transition">
                    ${config.jobsConfig.popup.continueBtn}
                </a>
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