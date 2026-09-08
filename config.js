const config = {
// Brand
year: "20th",
poeaLicense: "POEA License No. 047-LB-10317-R",
  
  // Logo (config-driven)
  logo: {
    src: "assets/archwaylogo.png",  
    alt: "Archway Logo",
    height: 40                 
  },
  
  // POEA Badge (config-driven)
  poeaBadge: {
    src: "assets/POEA.png",        
    alt: "POEA Licensed - Zero Complaint & Zero Citation Record",
    height: 180,
    className: "mx-auto object-contain drop-shadow-md"
  },
  
  // Navigation
  nav: [
    { label: "Home", href: "index.html" },
    { label: "Applicants", href: "applicants.html" },
    { label: "Employers", href: "employers.html" },
    { label: "About Us", href: "about.html" }
  ],
  
  // Hero
  hero: {
    title: "We Recruit the Best Filipino Workers",
    subtitle: "Now on its 20th year of operation, Archway has given thousands of deserving Filipinos stable local and overseas employment as nurses, doctors, laboratory technicians, accountants, office clerks, food service workers, programmers, computer engineers, domestic helpers, construction workers, teachers, carpenters, masons, and maintenance crew.",
    ctaPrimary: "Browse Open Positions",
    ctaSecondary: "For Employers",
    images: [
      "assets/hero.png",
      "assets/hero2.png",
      "assets/hero3.png"
    ],
    slideInterval: 4000
  },
  
  // Stats
  stats: [
    { value: "20+", label: "Years of Excellence" },
    { value: "1000+", label: "Workers Deployed" },
    { value: "Zero", label: "POEA Complaints" },
    { value: "Middle East", label: "Primary Markets" }
  ],
  
  // Google Sheets — published CSV link ng job listings
  jobsSheetUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRPrhDfDncPY0424j46MYScWbs8cERFkPNIT0xY89GxowzfGkmCHZmh7BNtXh49-jR7FRm8LW9WHtxb/pub?gid=0&single=true&output=csv",
  
  // Jobs settings (config-driven)
  jobsConfig: {
    // Column mapping (order sa Google Sheet)
    columns: {
      id: 0,
      title: 1,
      type: 2,
      is_active: 3,
      specialization: 4,
      location: 5,
      experience: 6,
      certifications: 7,
      description: 8,
      requirements: 9
    },
    
    // Popup texts
    popup: {
      title: "Job Details",
      continueBtn: "Continue to Application",
      closeBtn: "Close",
      noDetails: "No additional details available for this job yet."
    }
  },
  
  // Jobs Section
  jobs: {
  title: "Now Hiring",
  local: {
    title: "Local Jobs"
  },
  overseas: {
    title: "Overseas Jobs"
  }
},
  
  // About
  about: {
    title: "Welcome to Archway",
    paragraphs: [
      "Archway International & Marketing Services, Inc. was officially registered with the Philippine SEC on October 25, 2006 and began its operations in January 2007. Since then it has deployed close to a thousand skilled, non-skilled and professional workers to the Middle East countries, especially to the Kingdom of Saudi Arabia.",
      "Its key mission is two-pronged: To provide our dedicated and hardworking countrymen decent job opportunities abroad, helping them achieve their lifelong dream of prosperity on the one hand, while providing fully-qualified workmen and professionals to clients of high ethical and moral standards, helping them in turn achieve their business goals on the other.",
      "Our agency draws its strength from a group of young and dynamic associates and staff, leveraging its solid experience in the field of local contractual manpower-providing services in the Philippines through its mother company, Archway Multi-Services Corporation.",
      "We stand proud by our clean record of Zero-complaint sanction and Zero-citation sanction from POEA."
    ]
  },
  
  // About Page (separate from homepage "about" preview)
  aboutPage: {
    headerTitle: "About Us",
    headerSubtitle: "We Create Opportunities for Candidates & Businesses",
    whoWeAreTitle: "Who We Are",
    whoWeAreParagraphs: [
      "Archway is a licensed, privately-owned recruitment and placement company based in Pasay City, Metro Manila, Philippines. Since 2001, Archway has successfully deployed many highly-qualified Filipino professionals, skilled workers and non-skilled workforce throughout the Middle East. Aside from overseas, likewise, we have provided thousands of local jobs to Filipinos.",
      "In our 20 years of service, we have witnessed the versatility and industry of the Filipinos and the desire to uplift the lives of their families, are the very important goals of our organization. Our quality assurance is borne by our appreciation of the importance of a systematic program of selection and placement of human resources allowing us to get down to the vital details of our clients' manpower demands and letting us customize our services to each of the clients' needs."
    ],
    highlight: "We stand proud by our clean record of <strong>Zero-complaint</strong> and <strong>Zero-citation</strong> sanction from POEA."
  },
  
  // Employers Page
  employersPage: {
    headerTitle: "For Employers",
    headerSubtitle: "Partner with Archway for quality and ethical Filipino manpower solutions.",
    reqTitle: "Documentary Requirements",
    reqIntro: [
      "The documentary requirements from principal employers vary depending on the host country's own set of rules and regulations pertaining to hiring foreign workers. POEA is also concerned on the state of economy, the records on human rights abuses being reported by the Philippine labor attaché back to our government. As such, additional requirements may be required by the POEA as it deems necessary in order to protect the welfare of the Filipino workers.",
      "However, the following are the typical basic requirements that are asked of our principal employers."
    ],
    requirements: [
      "Manpower Demand Letter (to the agency) – It enumerates the number of workers required, salaries & benefits and terms of employment;",
      "Special Power of Attorney (SPA) – This is a legal document binding the principal with the designated agency, vesting authority to the agency to recruit and deploy workers on their behalf;",
      "Master Employment Contract / Individual Contract – This is a legal document binding all parties: employer, agency and the worker, to a set of agreements concerning the job offered, salary offered, working schedules, rest days, and benefits. It also embodies terms of termination and expatriation at the end of the contract;",
      "Recruitment Agreement;",
      "Arabic Visa with English translation;",
      "Visa Delegation;",
      "Certificate of Commercial Registration;",
      "Photocopy of sponsor's national ID;",
      "Location map and photos of accommodation;",
      "Letter of Commitment;",
      "Survey Form if applicable;",
      "Revocation if applicable;",
      "Authorization letter of the authorized representative;",
      "ID copy of authorized representative."
    ],
    note: "All these documents will have to be presented to the Philippine Embassy or Consulate in the host country for verification and authentication before they are forwarded to the agency for submission to the POEA for acknowledgment and registration. It is important that these documents carry English translations."
  },
  
  // Applicants Page
  applicantsPage: {
    headerTitle: "Application Form",
    headerSubtitle: "Be the first to be notified of new job openings! Fill-up the form below and submit to HR.",

    branches: [
      { value: "pasay", label: "Pasay / Main HR" },
      { value: "bulacan", label: "Bulacan" },
      { value: "pampanga", label: "Pampanga" },
      { value: "la-union", label: "La Union" },
      { value: "laguna", label: "Laguna" },
      { value: "batangas", label: "Batangas" },
      { value: "cavite", label: "Cavite" },
      { value: "local", label: "Local" }
    ],
    
    // FormSubmit target
    formEndpoint: "https://formsubmit.co/jparaiso.digital@gmail.com",
    
    protocols: {
      title: "Job Interview Protocols",
      intro: [
        "There really is no better way to pass a personal interview than to fully prepare yourself for it. It therefore goes without saying that you should be able to defend your application for the position you applied for with total confidence.",
        "Defending your position is knowing the basics, theories and application of your knowledge in a given field or profession. Aside from being confident about yourself, you must also keep in mind the following pointers:"
      ],
      tips: [
        "Be on time. Arriving at least 30 minutes before the interview gives you enough time to freshen up, relax and compose yourself.",
        "Look your best. Wear clean and appropriate office attire or uniform in line with your trade or profession.",
        "Greet your interviewer with a smile of confidence. A good grip during a handshake typically conveys a feeling of confidence on your part. It is wise to ask the agency coordinator about the culture of the interviewer. If their culture is such that they do not do handshakes, simply greet your interviewer with a warm smile.",
        "Respond to questions in a clear manner. Simple English will do as long as it is clear and in the correct grammar. It is better to be honest to say “I am sorry” if you really do not know the answer. Wait for the interviewer to finish his question before answering.",
        "Answers to questions must be direct-to-the-point. Walang paligoy-ligoy at walang sad stories about your family. Negative comments about yourself or your family will earn you negative points only.",
        "Maintain good eye contact. Look into the eyes and lips of your interviewer when he speaks. It tells the interviewer how attentive you are.",
        "If you did not understand the question the first time, be polite to ask your interviewer to repeat his question: “I am sorry, could you please repeat your question?”",
        "At the end of the interview, thank your interviewer, mentioning his/her name. Ex: “Thank you, Mr. Jones, for the interview.”"
      ]
    },
    
    docs: {
      title: "Initial Documentary Requirements",
      overseas: {
        title: "Initial Requirements for Overseas Jobs",
        items: [
          "Resume with detailed Job Description",
          "Employment / Training Certificates",
          "Diploma & Transcript Of Records",
          "Board Certificates / PRC ID",
          "NBI Clearance",
          "Passport photos, 6 pcs. 2×2 Colored Photos (w/ collar)",
          "2 Whole-body photos ( 4R / in business attire with white background )"
        ]
      },
      local: {
        title: "Initial Requirements for Local Jobs",
        items: [
          "Resume with Job Description",
          "Employment / Training Certificates",
          "Diploma & Transcript Of Records",
          "NBI Clearance",
          "2×2 Colored Photos (w/ collar)"
        ]
      }
    },
    
    process: {
      title: "We'll Be There Every Step of the Way",
      subtitle: "From application to deployment — we guide you through the entire process.",
      steps: [
        { title: "Sourcing", desc: "We receive manpower requests from clients and begin searching for qualified candidates." },
        { title: "Initial Interview", desc: "Candidates undergo initial screening and interview by our recruitment team." },
        { title: "Pre-Selection", desc: "Shortlisted applicants are prepared and documents are checked for completeness." },
        { title: "Principal Interview", desc: "Selected candidates are presented to the foreign principal for final interview." },
        { title: "Final Selection", desc: "Successful candidates are officially selected and proceed to the next stage." },
        { title: "Travel Clearances", desc: "We assist with POEA processing, medicals, visas, and all required clearances." },
        { title: "Deployment", desc: "Workers are deployed to their destination. We remain available for support even after deployment." }
      ]
    }
  },
  
  adminPage: {
    headerTitle: "Jobs Dashboard",
    headerSubtitle: "Manage your job openings here — changes reflect on the website automatically.",
    
    // Client Google Sheet link — replace with final client-owned Sheet before handover
    sheetEditUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRPrhDfDncPY0424j46MYScWbs8cERFkPNIT0xY89GxowzfGkmCHZmh7BNtXh49-jR7FRm8LW9WHtxb/pubhtml?gid=0&single=true",
    
    instructions: {
      title: "How to Add or Update a Job Posting",
      steps: [
        {
          title: "Open the Jobs Sheet",
          desc: "Click the button below to open the spreadsheet in a new tab."
        },
        {
          title: "Add a new row",
          desc: "Fill in these columns: id (any unique number, e.g. 17), title (the job title), type, and is_active."
        },
        {
          title: "Type must be exact",
          desc: "For the \"type\" column, type it exactly as Local or Overseas (capital L, capital O). This is how the website sorts the jobs correctly."
        },
        {
          title: "is_active column",
          desc: "Type TRUE to show the job on the website, or FALSE to hide it without deleting."
        },
        {
          title: "Avoid commas",
          desc: "Do not use commas (,) inside the job title — it can break how the list is read. Use a dash (–) instead if needed."
        },
        {
          title: "To remove a job",
          desc: "Either delete the row, or set is_active to FALSE."
        },
        {
          title: "Give it a minute",
          desc: "Updates usually appear on the website within a minute or two. If not, try refreshing the page."
        }
      ]
    }
  },
  
  // Contact
  contact: {
    title: "Get in Touch",
    address: "3rd Flr., SKK Building, 63-65 Sen. Gil Puyat Ave., Pasay City, Metro Manila, Philippines 1304",
    mapEmbedUrl: "https://maps.google.com/maps?q=Archway%20Multi-Services%20Corporation%2C%2063-65%20Sen.%20Gil%20Puyat%20Ave%2C%20Pasay%20City%2C%20Metro%20Manila&output=embed",
    phones: [
      "Trunk Lines: (02) 8551-1035 / 8551-1037",
      "HR: +63 920 949 7844",
      "+63 917 871 6794",
      "+63 920 949 7845"
    ],
    emails: [
      "inquiry@archwayintl.com.ph",
      "Hr@Archway.com.ph"
    ]
  },
  
  // Footer
  footer: {
    copyright: `© ${new Date().getFullYear()} Archway International & Marketing Services, Inc. All rights reserved.`
  }
  
};