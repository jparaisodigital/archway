// main.js – fully config-driven renderer
document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (!app || !config) return;
  
  const c = config;
  
  // Helper
  const el = (tag, classes = '', content = '') => {
    const e = document.createElement(tag);
    if (classes) e.className = classes;
    if (content) e.innerHTML = content;
    return e;
  };
  
  // ========== NAV ==========
  const nav = el('nav', 'fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200');
  nav.innerHTML = `
      <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#home" class="flex items-center gap-3">
  <img 
    src="${c.logo.src}" 
    alt="${c.logo.alt}" 
    style="height: ${c.logo.height}px; width: auto;"
    class="object-contain"
  />
</a>
        <div class="hidden md:flex items-center gap-8">
          ${c.nav.map(item => `
            <a href="${item.href}" class="text-sm font-medium text-slate-600 hover:text-primary transition">${item.label}</a>
          `).join('')}
        </div>
        <a href="#contact" class="hidden md:inline-flex items-center px-5 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition">
          Contact Us
        </a>
        <!-- Mobile menu button (simple) -->
        <button id="mobile-menu-btn" class="md:hidden p-2 text-slate-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
    `;
  app.appendChild(nav);
  
  // ========== HERO ==========
  const hero = el('section', 'relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden');
  hero.id = 'home';
  hero.innerHTML = `
      <div class="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-dark"></div>
      <div class="absolute inset-0 opacity-20" style="background-image:url('${c.hero.image}'); background-size:cover; background-position:center;"></div>
      <div class="relative max-w-7xl mx-auto px-6">
        <div class="max-w-3xl">
          <p class="text-accent font-semibold tracking-wide uppercase text-sm mb-4">${c.year} Year of Excellence</p>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            ${c.hero.title}
          </h1>
          <p class="text-lg text-white/90 leading-relaxed mb-10 max-w-2xl">
            ${c.hero.subtitle}
          </p>
          <div class="flex flex-wrap gap-4">
            <a href="#jobs" class="inline-flex items-center px-7 py-3.5 rounded-full bg-white text-primary font-semibold shadow-lg hover:shadow-xl transition">
              ${c.hero.ctaPrimary}
            </a>
            <a href="#employers" class="inline-flex items-center px-7 py-3.5 rounded-full border-2 border-white/40 text-white font-semibold hover:bg-white/10 transition">
              ${c.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </div>
    `;
  app.appendChild(hero);
  
  // ========== STATS ==========
  const stats = el('section', 'relative -mt-10 z-10');
  stats.innerHTML = `
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
    `;
  app.appendChild(stats);
  
  // ========== JOBS ==========
  const jobs = el('section', 'py-20 lg:py-28');
  jobs.id = 'jobs';
  jobs.innerHTML = `
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-14">
          <h2 class="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">${c.jobs.title}</h2>
          <p class="text-slate-500 max-w-xl mx-auto">Explore current opportunities for Filipino professionals and skilled workers.</p>
        </div>
        <div class="grid md:grid-cols-2 gap-8">
          <div class="group bg-white rounded-2xl border border-slate-200 p-8 hover:border-primary/30 hover:shadow-xl transition duration-300">
            <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3">${c.jobs.local.title}</h3>
            <p class="text-slate-500 mb-6 leading-relaxed">${c.jobs.local.description}</p>
            <a href="applicants.html" class="inline-flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
  ${c.jobs.local.button}
  ...
</a>
  
          </div>
          <div class="group bg-white rounded-2xl border border-slate-200 p-8 hover:border-primary/30 hover:shadow-xl transition duration-300">
            <div class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
              <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3">${c.jobs.overseas.title}</h3>
            <p class="text-slate-500 mb-6 leading-relaxed">${c.jobs.overseas.description}</p>
            <a href="applicants.html" class="inline-flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
  ${c.jobs.overseas.button}
  ...
</a>

          </div>
        </div>
      </div>
    `;
  app.appendChild(jobs);
  
  // ========== ABOUT ==========
  const about = el('section', 'py-20 lg:py-28 bg-white');
  about.id = 'about';
  about.innerHTML = `
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
    `;
  app.appendChild(about);
  
  // ========== CONTACT ==========
  const contact = el('section', 'py-20 lg:py-28 bg-primary text-white');
  contact.id = 'contact';
  contact.innerHTML = `
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
                  <div class="text-white/80 text-sm space-y-1">
                    ${c.contact.phones.map(p => `<div>${p}</div>`).join('')}
                  </div>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div>
                  <div class="font-medium mb-1">Email</div>
                  <div class="text-white/80 text-sm space-y-1">
                    ${c.contact.emails.map(e => `<div>${e}</div>`).join('')}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
            <h3 class="text-xl font-bold mb-6">Send a Message</h3>
            <form class="space-y-4" onsubmit="event.preventDefault(); alert('Thank you! This is a demo form.');">
              <input type="text" placeholder="Your Name" class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-accent" required>
              <input type="email" placeholder="Email Address" class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-accent" required>
              <select class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-accent">
                <option value="" class="text-slate-900">I am a...</option>
                <option value="applicant" class="text-slate-900">Job Applicant</option>
                <option value="employer" class="text-slate-900">Employer / Client</option>
              </select>
              <textarea rows="4" placeholder="Your Message" class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-accent" required></textarea>
              <button type="submit" class="w-full py-3.5 rounded-xl bg-white text-primary font-semibold hover:bg-slate-100 transition">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    `;
  app.appendChild(contact);
  
  // ========== FOOTER ==========
  const footer = el('footer', 'bg-slate-900 text-slate-400 py-10');
  footer.innerHTML = `
      <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3">
  <img 
  src="${c.logo.src}" 
  alt="${c.logo.alt}" 
  style="height: 36px; width: auto;"
  class="object-contain"
/>
</div>
        <p class="text-sm text-center">${c.footer.copyright}</p>
        <p class="text-xs">${c.poeaLicense}</p>
      </div>
    `;
  app.appendChild(footer);
  
  // Simple mobile menu toggle (optional enhancement)
  const btn = document.getElementById('mobile-menu-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      alert('Mobile menu – for demo lang. Pwede nating gawing full dropdown later.');
    });
  }
});