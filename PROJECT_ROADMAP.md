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

| Column | Required | Notes |
|---|---|---|
| id | Yes | Simple sequential (1, 2, 3...) |
| title | Yes | Job Title |
| type | Yes | `Local` or `Overseas` only |
| is_active | Yes | `TRUE` / `FALSE` |
| specialization | No | Optional |
| location | No | Optional |
| experience | No | Optional |
| certifications | No | Optional |
| description | No | Job Description / Responsibilities (multi-line supported) |
| requirements | No | Qualifications (multi-line supported) |

### Key Decisions

- **Old Job IDs** (AMSC-034, ALHIJRAH101, etc.) → **dropped**. Not needed.
- **ID generation** → simple sequential now. Supabase will auto-generate UUID later if ever needed.
- **Popup** → shows all available details. Empty fields are hidden.
- **CSV Parser** → handles multi-line + quoted fields.
- **Future Supabase ready** → same field names can be used as table columns if the Client later wants a database.

### User Flow

1. Home → Local / Overseas tables (Title + Apply)
2. Click Apply → **Popup** with job details
3. Click “Continue to Application” → Applicants page (pre-filled + Job Summary Card)
4. Applicant fills out form + uploads Resume/CV
5. Application is sent through FormSubmit
6. HR receives application through email

---

# Phase 7: Security & Pre-Handover

**Goal:** Add reasonable security before the website goes live.

**Important:**  
Do NOT switch to the real HR email yet.  
Keep using `jparaiso.digital@gmail.com` while testing.

We will finish and test the security first.

---

## Step 1 – Make a Backup

- [ ] Create a full backup of the current working website
- [ ] Keep a copy before changing security-related code

**Simple explanation:**  
If something breaks while adding security, we can restore the working version.

---

## Step 2 – Keep the Test Email During Development

Current testing email:

`jparaiso.digital@gmail.com`

Final production email:

`hr@archwayintl.com.ph`

- [ ] Keep the test email while developing
- [ ] Use dummy/fake applicant information during testing
- [ ] Do not use real applicant information unless necessary
- [ ] Switch to the HR email only after all tests pass

**Simple explanation:**  
Test everything using my own email first so we do not spam or disturb the HR company.

---

## Step 3 – Add Anti-Spam / Bot Protection

- [ ] Enable CAPTCHA / anti-bot protection on Application Form
- [ ] Enable anti-spam protection on Contact Form
- [ ] Add a hidden honeypot field if supported

**Simple explanation:**  
This helps stop bots from sending hundreds of fake applications or spam emails.

---

## Step 4 – Secure Resume / CV Upload

Current allowed files:

- PDF
- DOC
- DOCX

Security checks:

- [ ] Allow only approved Resume/CV file types
- [ ] Block unnecessary or dangerous file types
- [ ] Set a reasonable file size limit
- [ ] Test a valid PDF
- [ ] Test a valid DOC/DOCX
- [ ] Test an invalid file type
- [ ] Test an oversized file

**Simple explanation:**  
Applicants should only be able to upload normal Resume/CV files.

Do not allow executable files or random file types.

---

## Step 5 – Secure Google Sheet Data Before Displaying It

- [ ] Escape / sanitize job data coming from Google Sheets
- [ ] Protect Job Title
- [ ] Protect Description
- [ ] Protect Requirements
- [ ] Protect Location
- [ ] Protect Specialization
- [ ] Protect Experience
- [ ] Protect Certifications

**Simple explanation:**  
The website should treat Google Sheet content as normal text.

If strange HTML or script code is accidentally entered into the Sheet, it should NOT run as website code.

This protects the website from XSS / code injection.

---

## Step 6 – Check Google Sheet Permissions

- [ ] Job Sheet contains job listings only
- [ ] Do NOT store applicant information in the Google Sheet
- [ ] Do NOT store Resume/CV files in the Google Sheet
- [ ] Only authorized Client / HR Google accounts should have Edit access
- [ ] Public website only reads the published job-listing data

**Simple explanation:**  
The Google Sheet is only for jobs.

Applicant data goes to HR email, not into a public Sheet.

---

## Step 7 – Treat `admin.html` as a Helper Page Only

- [ ] Do not store passwords inside `admin.html`
- [ ] Do not store applicant records inside `admin.html`
- [ ] Do not store secret information inside `admin.html`
- [ ] Google account permissions remain the real protection for editing jobs

**Simple explanation:**  
`admin.html` is not a real password-protected admin system.

It is only a simple page that helps the Client open/manage the Google Sheet.

---

## Step 8 – Check Frontend Files for Secrets

Before deployment, check:

- [ ] `config.js`
- [ ] `site.js`
- [ ] HTML files
- [ ] `.env`
- [ ] Other project files

Make sure there are NO:

- Passwords
- Gmail passwords
- Google account passwords
- Private API keys
- Private tokens
- Hosting passwords
- Secret credentials

**Simple explanation:**  
HTML and JavaScript files on a public website can be inspected by visitors.

Never put real passwords or secret keys inside frontend code.

---

## Step 9 – HTTPS Check

Final website must use:

`https://`

NOT:

`http://`

- [ ] SSL / HTTPS active
- [ ] Website loads using HTTPS
- [ ] Application form works using HTTPS
- [ ] Contact form works using HTTPS

**Simple explanation:**  
HTTPS protects information while it travels between the applicant's browser and the website/service.

Most modern hosting providers include HTTPS automatically.

---

## Step 10 – Add Basic Browser Security Headers

Before production deployment, add/check reasonable security headers such as:

- [ ] Content Security Policy (CSP)
- [ ] `X-Content-Type-Options`
- [ ] Referrer Policy
- [ ] Clickjacking / frame protection
- [ ] Other basic hosting security headers if supported

**Simple explanation:**  
These are extra instructions given to the browser to make the website harder to abuse.

---

## Step 11 – Test the Application Form Using Dummy Data

Create a fake applicant for testing.

Example:

- Name: Test Applicant
- Email: personal test email
- Phone: dummy number
- Resume: safe dummy PDF

Test:

- [ ] Job Type arrives correctly
- [ ] Job Title arrives correctly
- [ ] Personal information arrives correctly
- [ ] Resume/CV arrives correctly
- [ ] Application email arrives
- [ ] Thank You / acknowledgement works
- [ ] Form resets or redirects correctly
- [ ] No errors appear

**Simple explanation:**  
Make sure the complete application flow works before giving it to HR.

---

## Step 12 – Test Wrong / Invalid Inputs

Try submitting:

- [ ] Missing required information
- [ ] Invalid email address
- [ ] Wrong Resume file type
- [ ] Oversized Resume
- [ ] Strange symbols / text
- [ ] HTML-like text such as `<script>`
- [ ] Empty fields

**Expected result:**

The website should not break.

Malicious-looking text should appear only as normal text and should never execute as code.

---

## Step 13 – Basic Spam Test

- [ ] Submit several test applications
- [ ] Check if CAPTCHA appears / works
- [ ] Check if bots or repeated submissions are reasonably protected
- [ ] Confirm HR inbox will not easily be flooded

**Simple explanation:**  
We are not doing a professional stress test.

We only want to make sure basic anti-spam protection is working.

---

## Step 14 – Final Google Sheets Test

- [ ] Add a test job
- [ ] Edit a test job
- [ ] Set `is_active = TRUE`
- [ ] Confirm job appears on website
- [ ] Set `is_active = FALSE`
- [ ] Confirm job disappears
- [ ] Test description
- [ ] Test requirements
- [ ] Test multi-line text
- [ ] Test Apply popup
- [ ] Test Continue to Application
- [ ] Test Job Title pre-fill

---

## Step 15 – Responsive Testing

Test website on:

- [ ] Desktop
- [ ] Laptop
- [ ] Tablet
- [ ] Mobile

Check:

- [ ] Navigation
- [ ] Hero
- [ ] Job tables
- [ ] Job popup
- [ ] Application form
- [ ] Resume upload
- [ ] Accordions
- [ ] Contact form
- [ ] Google Map
- [ ] Footer

---

## Step 16 – Switch From Test Email to Real HR Email

ONLY after all previous tests pass.

Change:

`jparaiso.digital@gmail.com`

to:

`hr@archwayintl.com.ph`

Then:

- [ ] Activate / verify FormSubmit using HR email if required
- [ ] Submit ONE final controlled test application
- [ ] Confirm HR receives the application
- [ ] Confirm Resume/CV arrives
- [ ] Confirm correct applicant information arrives
- [ ] Confirm acknowledgement works
- [ ] Remove remaining testing configuration

---

## Step 17 – Client Account Security

Recommend to Client / HR:

- [ ] Use a strong HR email password
- [ ] Enable Two-Factor Authentication / MFA
- [ ] Enable 2FA on Google account
- [ ] Only authorized HR personnel should access applicant emails
- [ ] Only authorized Client personnel should edit the Jobs Google Sheet
- [ ] Production accounts should be owned or controlled by the Client

**Simple explanation:**  
Website security also depends on the Client protecting their own email and Google accounts.

---

## Step 18 – Final Security Check

Before handover:

- [ ] No passwords in website code
- [ ] No private API keys in frontend
- [ ] No unnecessary test credentials
- [ ] CAPTCHA / anti-spam works
- [ ] Resume upload restrictions work
- [ ] Google Sheet content is safely displayed
- [ ] HTTPS works
- [ ] Security headers are active where supported
- [ ] Application goes to HR email
- [ ] Contact form goes to correct company email
- [ ] Google Sheet job listings work
- [ ] `admin.html` contains no private applicant data
- [ ] Thank You / acknowledgement works
- [ ] Website works on mobile and desktop

---

## Security Flow – Simple Version

Final expected flow:

**Applicant**
↓  
Opens Archway Website
↓  
Selects Job
↓  
Fills Application Form
↓  
Uploads Resume/CV
↓  
Anti-Spam / CAPTCHA Check
↓  
FormSubmit / Selected Email Service
↓  
**HR Email**
↓  
HR handles the application internally

### Important

There is:

- NO applicant database
- NO applicant dashboard
- NO ATS
- NO resume archive/database made by Developer
- NO applicant data stored in Google Sheets

Google Sheets is used for **job listings only**.

---

# Phase 8: Polish & Handover

- [ ] Complete Security Checklist
- [ ] Responsive testing
- [ ] Final Application Form testing
- [ ] Switch FormSubmit to real HR email
- [ ] Final Contact Form testing
- [ ] 1–2 revision rounds
- [ ] Client approval
- [ ] Handover files
- [ ] Basic usage instructions
- [ ] Final payment

---

## Out of Scope (Not included in ₱15,000)

- Real database / applicant tracking system
- Multi-user admin with roles
- Applicant / HR dashboard
- Automated File ID system (like the old site)
- Custom backend for applicant records
- Resume archive/database
- Payment gateway
- Ongoing maintenance outside agreed support
- Domain & hosting setup unless simple/agreed
- Advanced SEO or marketing tools
- Major redesigns
- New integrations outside the original scope

---

## Tech Decisions (Locked)

- Multi-page website:
  - Home
  - Applicants
  - Employers
  - About Us
  - `admin.html`

- **Vanilla JavaScript**
- Tailwind CSS CDN
- Config-driven structure using `config.js`
- Form → FormSubmit
- Jobs → Google Sheets
- No backend
- No applicant database
- No ATS
- Job Popup for better UX
- Resume/CV delivered through email

### Vite Decision

**Do NOT migrate to Vite before current handover.**

Reason:

- Current Vanilla JS website is already working
- Vite is not required for the current Client requirement
- Security improvements are more important before handover
- Migrating now may introduce unnecessary bugs before delivery

Vite + Vanilla JS may be studied or used for future projects / future versions.

---

## Important Notes for Future AI / Developers

1. **All content & behavior** should stay in `config.js` as much as possible.

2. Jobs data comes from published Google Sheets CSV.

3. `fetchJobs()` uses a proper CSV parser that supports multi-line fields.

4. Popup is in:

   `site.js`

   Functions:

   `openJobPopup()`

   `closeJobPopup()`

5. Google Sheet must contain **job information only**.

6. Applicant records and Resume/CV files must NOT be stored in the public Google Sheet.

7. When displaying Google Sheet data, safely escape/sanitize external values before inserting them into HTML.

8. Application form currently uses the testing email:

   `jparaiso.digital@gmail.com`

9. Before final handover, switch Application Form to:

   `hr@archwayintl.com.ph`

10. Contact emails displayed on site:

   - inquiry@archwayintl.com.ph
   - hr@archwayintl.com.ph

11. Production accounts should preferably belong to / be controlled by the Client.

12. Do not place passwords or private secrets inside frontend JavaScript.

13. Use dummy applicant information during development/security testing.

14. Enable reasonable anti-spam protection before launch.

15. Final production website must use HTTPS.

16. `admin.html` is only a helper/instruction page and is NOT a real authenticated admin dashboard.

17. Current stack remains Vanilla JS for this project.

18. Vite migration is postponed until after the current Client project or for a future version.

---

# Final Pre-Handover Order

Follow this order:

1. Backup working website
2. Keep test email active
3. Add anti-spam protection
4. Secure Resume/CV upload
5. Secure Google Sheet rendering
6. Check Google Sheet permissions
7. Check frontend for secrets
8. Configure HTTPS
9. Add/check security headers
10. Test Application Form with dummy data
11. Test invalid inputs
12. Test basic spam protection
13. Test Google Sheets
14. Test desktop/mobile responsiveness
15. Switch to real HR email
16. Send final controlled test application
17. Confirm HR receives Resume + applicant information
18. Client enables 2FA/MFA
19. Final client review
20. Handover
21. Final payment

---

# Current Main Goal

Do not overcomplicate the system.

The Client only needs:

**Job Listings + Application Form + Resume Upload + HR Email Delivery**

Keep the architecture simple, secure, and easy for the Client to use.