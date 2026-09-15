const config = {
  // Brand
  dmwLicense: "DMW License No. DMW-656-LB-10092025-R",
  
  // Logo (config-driven)
  logo: {
    src: "assets/archwaylogo.png",  
    alt: "Archway Logo",
    height: 40                 
  },

  // Logo DMW
  dmwBadge: {
    src: "assets/DMW.png",
    alt: "DMW LICENSED - Zero Complaint & Zero Citation Record"
},
  
  // Navigation
  nav: [
    { label: "Home", href: "index.html" },
    { label: "How to Apply", href: "applicants.html" },
    { label: "Employers", href: "employers.html" },
    { label: "About Us", href: "about.html" }
  ],
  
  hero: {
    eyebrow: "25 YEARS OF RECRUITMENT EXCELLENCE",
    title: "We Recruit the Best Filipino Workers",
    subtitle: "Connecting qualified Filipino talent with trusted local and overseas employers.",
    ctaPrimary: "View Job Openings",
    ctaSecondary: "How to Apply",
  
    trustItems: [
      "25 Years of Service",
      "DMW LICENSED",
      "Zero Complaint Record"
    ],
  
    images: [
      "assets/hero.png",
      "assets/hero2.png",
      "assets/hero3.png"
  ],
  
  mobileImages: [
      "assets/mobile1.png",
      "assets/mobile2.png",
      "assets/mobile3.png"
  ],
  
  slideInterval: 4500,
  },
  
  // Stats
  stats: [
    { value: "20+", label: "Years of Excellence" },
    { value: "1000+", label: "Workers Deployed" },
    { value: "Zero", label: "DMW Complaints" },
    { value: "Local + Overseas", label: "Opportunities" }
  ],
  
  // Google Sheets — published CSV link ng job listings
  jobsSheetUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQsBk0u1xhSjpgwp195BHWQ1DKbms8M1MirNqEejwDnOkciyrRex7s0aoJMMFsalvVtw04Xm0PpV5am/pub?gid=0&single=true&output=csv",
  siteSettingsSheetUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQsBk0u1xhSjpgwp195BHWQ1DKbms8M1MirNqEejwDnOkciyrRex7s0aoJMMFsalvVtw04Xm0PpV5am/pub?gid=2131700161&single=true&output=csv",
  // Jobs settings (config-driven)
  jobsConfig: {
    // Column mapping
    columns: {
      id: 0,
      title: 1,
      type: 2,
      is_active: 3,
      info: 4,
      specialization: 5,
      location: 6,
      experience: 7,
      certifications: 8,
      description: 9,
      requirements: 10
  },
    
    // Popup texts
    popup: {
      title: "Job Details",
      applyBtn: "How to Apply",
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

  homeApply: {
    eyebrow: "How to Apply",
    title: "Start Your Application in Three Steps",
    subtitle: "Browse an opening, review the details, then follow the application instructions for the job.",
  
    steps: [
      {
        number: "01",
        title: "Find an Opening",
        desc: "Browse available Local or Overseas positions."
      },
      {
        number: "02",
        title: "Review the Job",
        desc: "Check the position details, qualifications, and requirements."
      },
      {
        number: "03",
        title: "Contact the Right Branch",
        desc: "Local applicants may select the nearest branch, while overseas applications are handled by Pasay / Main HR."
      }
    ],
  
    cta: "View Full Application Guide"
  },
  
  // About
  about: {
    title: "Welcome to Archway",
    paragraphs: [
      "Archway Multi-Services Corporation began its operations serving Filipino jobseekers and has since deployed close to a thousand skilled, non-skilled and professional workers to the Middle East countries, especially to the Kingdom of Saudi Arabia.",
      "Its key mission is two-pronged: To provide our dedicated and hardworking countrymen decent job opportunities abroad, helping them achieve their lifelong dream of prosperity on the one hand, while providing fully-qualified workmen and professionals to clients of high ethical and moral standards, helping them in turn achieve their business goals on the other."
    ]
  },
  
  // About Page (separate from homepage "about" preview)
aboutPage: {
  headerTitle: "About Us",
  headerSubtitle: "We Create Opportunities for Candidates & Businesses",
  whoWeAreTitle: "Who We Are",

  whoWeAreParagraphs: [
    "Archway International is a licensed recruitment agency duly registered with the Department of Migrant Workers (DMW). We specialize in the recruitment and deployment of qualified professionals, skilled workers, and technicians to the Middle East and other international markets.",
  
    "Over the years, we have successfully partnered with clients across a wide range of industries, including <strong>FMCG, Hospitality, Construction & Installation, Operations & Maintenance, Support Services, Medical, Furniture Manufacturing, Heavy Machinery, and Engineering</strong>.",
  
    "Our extensive recruitment experience, commitment to quality, and strict compliance with government regulations have enabled us to establish long-standing and trusted relationships with clients and partners worldwide.",
  
    "In our 20 years of service, we have witnessed the versatility and industry of the Filipinos and the desire to uplift the lives of their families, are the very important goals of our organization. Our quality assurance is borne by our appreciation of the importance of a systematic program of selection and placement of human resources allowing us to get down to the vital details of our clients' manpower demands and letting us customize our services to each of the clients' needs."
  ],

  highlight: "Licensed and duly registered with the <strong>Department of Migrant Workers (DMW)</strong>."
},
  
  // Employers Page
  employersPage: {
    headerTitle: "For Employers",
    headerSubtitle: "Partner with Archway for quality and ethical Filipino manpower solutions.",
    reqTitle: "Documentary Requirements",
    reqIntro: [
      "The documentary requirements from principal employers vary depending on the host country's own set of rules and regulations pertaining to hiring foreign workers. DMW is also concerned on the state of economy, the records on human rights abuses being reported by the Philippine labor attaché back to our government. As such, additional requirements may be required by the DMW as it deems necessary in order to protect the welfare of the Filipino workers.",
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
    note: "All these documents will have to be presented to the Philippine Embassy or Consulate in the host country for verification and authentication before they are forwarded to the agency for submission to the DMW for acknowledgment and registration. It is important that these documents carry English translations."
  },
  
  // Applicants Page
  applicantsPage: {
    headerTitle: "How to Apply",
    headerSubtitle: "Here's what to prepare and how the process works. To apply, select a job on our Home page and follow the branch instructions shown for that position.",
    
    branches: [
      { value: "pasay", label: "Pasay / Main HR", email: "Hr@Archway.com.ph" },
      { value: "bulacan", label: "Bulacan", email: "Archway.bulacan@intl.com.ph" },
      { value: "pampanga", label: "Pampanga", email: "Archway.pampanga@intl.com.ph" },
      { value: "la-union", label: "La Union", email: "Archway.launion@intl.com.ph" },
      { value: "laguna", label: "Laguna", email: "Archway.laguna@intl.com.ph" },
      { value: "batangas", label: "Batangas", email: "Archway.batangas@intl.com.ph" },
      { value: "cavite", label: "Cavite", email: "Archway.cavite@intl.com.ph" },
      { value: "local", label: "Local", email: "Archway.local@intl.com.ph" }
    ],
    
    // Branch Selector Modal
    branchSelector: {
      title: "How to Apply",
      subtitle: "Select the branch nearest you. We'll show you the email address to send your resume and application to.",
      selectLabel: "Preferred Branch",
      placeholder: "Select a branch...",
      instruction: "Send your resume and application documents to this email address:",
      copyBtn: "Copy Email",
      copiedLabel: "Copied!",
      closeBtn: "Close"
    },
    
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
        { title: "Travel Clearances", desc: "We assist with DMW processing, medicals, visas, and all required clearances." },
        { title: "Deployment", desc: "Workers are deployed to their destination. We remain available for support even after deployment." }
      ]
    }
  },
  
  // Contact
  contact: {
    title: "Get in Touch",
    address: "7F Unit 708A, Philflex Bay Center, Coral Way Drive, Pasay City",
    mapEmbedUrl: "https://maps.google.com/maps?q=Philflex%20Bay%20Center%2C%20Coral%20Way%20Drive%2C%20Pasay%20City&output=embed",
    phones: [
      "Tel: (02) 863-11088 loc. 109"
    ],
    emails: [
      "inquiry@archwayintl.com.ph",
      "Hr@Archway.com.ph"
    ]
  },
  
  // Footer
  footer: {
    copyright: `© ${new Date().getFullYear()} Archway Multi-Services Corporation. All rights reserved.`
  }
  
};