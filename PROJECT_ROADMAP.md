# Archway Modern Website – Updated Roadmap

**Client:** Archway International & Marketing Services, Inc.  
**Fee:** ₱15,000  
**Stack:** Vanilla JS + Tailwind CSS (CDN) + Config-driven  
**Application Email:** hr@archwayintl.com.ph (currently FormSubmit → jparaiso.digital@gmail.com for testing)  
**Realistic Timeline:** 5–7 days

---

## Immediate Priority (Today – for Meeting)

**Goal:** Working Application Form that sends to HR email 

- [x] Create simplified but long Application Form
- [x] Include Resume / CV file upload
- [x] Connect to Web3Forms / FormSubmit / Getform
- [x] Test sending to email
- [x] Make it look clean & modern

**This is what you will present in the meeting.**

---

## Phase 1: Foundation
- [x] Project setup
- [x] Config system (`config.js`)
- [x] Logo
- [x] Shared Navbar & Footer
- [x] Design system (colors, spacing, typography)

---

## Phase 2: Home Page
- [x] Modern Hero (with image carousel)
- [x] Local & Overseas Jobs section
- [x] Welcome / About preview
- [x] CTAs
- [x] Stats bar
- [x] Contact section + Google Maps embed

---

## Phase 3: Applicants Page
- [x] Application Form (priority – working email + file upload)
- [x] Job Interview Protocols (accordion)
- [x] Documentary Requirements (accordion)
- [x] Process Steps (“We’ll Be There Every Step of the Way”)
- [x] Pre-fill Job Type + Job Title from URL params / popup

---

## Phase 4: Employers Page
- [x] Documentary Requirements list
- [x] Contact / Partner CTA

---

## Phase 5: About Us Page
- [x] Company story (Who We Are)
- [x] Zero-complaint highlight
- [x] Contact CTA

---

## Phase 6: Jobs Management (Simplified + Future-proof)

### Current Status (Phase 1 – Basic Jobs)
- [x] Use **Google Sheets** as the source of jobs
- [x] Display Local & Overseas jobs from the Sheet
- [x] Client can edit jobs directly in Google Sheets (no custom admin needed)
- [x] `admin.html` – simple instructions + link to open Sheet
- [x] **Job Details Popup / Modal** on Apply click (resemblance to old site)
- [x] Filter by `is_active = TRUE`
- [x] Config-driven column mapping + popup texts (`config.jobsConfig`)

### Google Sheet Structure (Phase 1 – Current)

| Column     | Required | Notes                          |
|------------|----------|--------------------------------|
| id         | Yes      | Simple sequential (1, 2, 3...) |
| title      | Yes      | Job Title                      |
| type       | Yes      | `Local` or `Overseas` only     |
| is_active  | Yes      | `TRUE` / `FALSE`               |

### Planned Phase 2 Columns (add later when details are ready)
- specialization
- location
- experience
- certifications
- description
- requirements

### Key Decisions
- **Old Job IDs** (AMSC-034, ALHIJRAH101, etc.) → **dropped**. Not needed.
- **ID generation** → simple sequential now. Supabase will auto-generate UUID later.
- **Popup** → shows Job Title + Type for now. Will auto-show description/requirements when Phase 2 columns are filled.
- **Future Supabase ready** → same field names will be used as table columns. Minimal code change needed.

### User Flow
1. Home → Local / Overseas tables (Title + Apply)
2. Click Apply → **Popup** with job details
3. Click “Continue to Application” → Applicants page (pre-filled)
4. Long form + resume upload

---

## Phase 7: Polish & Handover
- [ ] Responsive testing
- [ ] Form testing (actual HR email)
- [ ] 1–2 revision rounds
- [ ] Handover files + instructions
- [ ] Final payment

---

## Out of Scope (Not included in ₱15,000)
- Real database / applicant tracking system
- Multi-user admin with roles
- Automated File ID system (like the old site)
- Payment gateway
- Ongoing maintenance
- Domain & hosting setup (unless simple)
- Advanced SEO or marketing tools

---

## Tech Decisions (Locked)
- Multi-page (Home, Applicants, Employers, About Us + admin.html)
- Vanilla JS + Tailwind CDN
- **Config-driven** everything (`config.js`)
- Form → FormSubmit / Web3Forms / Getform (file upload supported)
- Jobs → Google Sheets (simple & future-proof)
- **Future-ready for Supabase** (same field structure)
- No backend / no database in current scope
- Job Popup for better UX (closer to old site experience)

---

## Important Notes for Future AI / Developers

1. **All content & behavior** should stay in `config.js` as much as possible.
2. Jobs data comes from published Google Sheets CSV.
3. `fetchJobs()` already prepared for Phase 2 columns (just uncomment).
4. Popup is in `site.js` → `openJobPopup()` / `closeJobPopup()`.
5. When moving to Supabase later:
   - Create `jobs` table with same column names
   - Replace `fetchJobs()` with Supabase client query
   - Frontend logic (popup, tables, pre-fill) stays almost the same.
6. Current FormSubmit endpoint is temporary (jparaiso.digital@gmail.com). Change to `hr@archwayintl.com.ph` before handover.