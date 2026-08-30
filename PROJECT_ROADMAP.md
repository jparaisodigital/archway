# Archway Modern Website – Updated Roadmap

**Client:** Archway International & Marketing Services, Inc.  
**Fee:** ₱15,000  
**Stack:** Vanilla JS + Tailwind CSS (CDN) + Config-driven  
**Application Email:** hr@archwayintl.com.ph (FormSubmit currently points to jparaiso.digital@gmail.com for testing)  
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
- [x] Job Summary Card when coming from popup

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

### Status
- [x] Use **Google Sheets** as the source of jobs
- [x] Display Local & Overseas jobs from the Sheet
- [x] Client can edit jobs directly in Google Sheets (no custom admin needed)
- [x] `admin.html` – simple instructions + link to open Sheet
- [x] **Job Details Popup / Modal** on Apply click (resemblance to old site)
- [x] Filter by `is_active = TRUE`
- [x] Config-driven column mapping + popup texts (`config.jobsConfig`)
- [x] **Phase 2 ready** – description, requirements, location, specialization, experience, certifications automatically appear in popup when filled

### Google Sheet Structure (Current)

| Column          | Required | Notes                          |
|-----------------|----------|--------------------------------|
| id              | Yes      | Simple sequential (1, 2, 3...) |
| title           | Yes      | Job Title                      |
| type            | Yes      | `Local` or `Overseas` only     |
| is_active       | Yes      | `TRUE` / `FALSE`               |
| specialization  | No       | Optional                       |
| location        | No       | Optional                       |
| experience      | No       | Optional                       |
| certifications  | No       | Optional                       |
| description     | No       | Job Description / Responsibilities (multi-line supported) |
| requirements    | No       | Qualifications (multi-line supported) |

### Key Decisions
- **Old Job IDs** (AMSC-034, ALHIJRAH101, etc.) → **dropped**. Not needed.
- **ID generation** → simple sequential now. Supabase will auto-generate UUID later.
- **Popup** → shows all available details. Empty fields are hidden.
- **CSV Parser** → handles multi-line + quoted fields.
- **Future Supabase ready** → same field names will be used as table columns. Minimal code change needed.

### User Flow
1. Home → Local / Overseas tables (Title + Apply)
2. Click Apply → **Popup** with job details
3. Click “Continue to Application” → Applicants page (pre-filled + Job Summary Card)
4. Long form + resume upload

---

## Phase 7: Polish & Handover
- [ ] Responsive testing
- [ ] Form testing (switch FormSubmit to real HR email)
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
- Form → FormSubmit (file upload supported) – currently testing email
- Jobs → Google Sheets (simple & future-proof)
- **Future-ready for Supabase** (same field structure)
- No backend / no database in current scope
- Job Popup for better UX (closer to old site experience)

---

## Important Notes for Future AI / Developers

1. **All content & behavior** should stay in `config.js` as much as possible.
2. Jobs data comes from published Google Sheets CSV.
3. `fetchJobs()` uses a proper CSV parser that supports multi-line fields.
4. Popup is in `site.js` → `openJobPopup()` / `closeJobPopup()`.
5. When moving to Supabase later:
   - Create `jobs` table with same column names
   - Replace `fetchJobs()` with Supabase client query
   - Frontend logic (popup, tables, pre-fill) stays almost the same.
6. FormSubmit endpoint is currently `jparaiso.digital@gmail.com` for testing.  
   Change to `hr@archwayintl.com.ph` before final handover.
7. Contact emails displayed on site:
   - inquiry@archwayintl.com.ph
   - hr@archwayintl.com.ph