const config = {
  // Brand
  companyName: "Archway International & Marketing Services, Inc.",
  shortName: "Archway",
  tagline: "We Recruit the Best Filipino Workers",
  year: "20th",
  poeaLicense: "POEA License No. 047-LB-10317-R",
  
  // Logo (config-driven)
  logo: {
    src: "assets/archwaylogo.png",  
    alt: "Archway Logo",
    height: 40                 
  },
  
  // Colors (premium refined blue)
  colors: {
    primary: "#0B6E99",
    primaryDark: "#084F6F",
    accent: "#00C2CB",
    dark: "#0F172A",
    light: "#F8FAFC",
    white: "#FFFFFF",
    muted: "#64748B"
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
    subtitle: `Now on its ${"20th"} year of operation, Archway has given thousands of deserving Filipinos stable local and overseas employment as nurses, doctors, laboratory technicians, accountants, office clerks, food service workers, programmers, computer engineers, domestic helpers, construction workers, teachers, carpenters, masons, and maintenance crew.`,
    ctaPrimary: "Browse Open Positions",
    ctaSecondary: "For Employers",
    image: "assets/hero.png" 
  },
  
  // Stats
  stats: [
    { value: "20+", label: "Years of Excellence" },
    { value: "1000+", label: "Workers Deployed" },
    { value: "Zero", label: "POEA Complaints" },
    { value: "Middle East", label: "Primary Markets" }
  ],
  
  // Jobs Section
  jobs: {
    title: "Now Hiring",
    local: {
      title: "Local Jobs",
      description: "Opportunities within the Philippines for skilled and professional workers.",
      button: "View Local Positions"
    },
    overseas: {
      title: "Overseas Jobs",
      description: "Deployments to the Middle East, especially Kingdom of Saudi Arabia.",
      button: "View Overseas Positions"
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
  
  // Contact
  contact: {
    title: "Get in Touch",
    address: "3rd Flr., SKK Building, 63-65 Sen. Gil Puyat Ave., Pasay City, Metro Manila, Philippines 1304",
    phones: [
      "Trunk Lines: (02) 8551-1035 / 8551-1037",
      "HR: +63 920 949 7844",
      "+63 917 871 6794",
      "+63 920 949 7845"
    ],
    emails: [
      "inquiry@archwayintl.com.ph",
      "hr@archwayintl.com.ph"
    ]
  },
  
  // Footer
  footer: {
    copyright: `© ${new Date().getFullYear()} Archway International & Marketing Services, Inc. All rights reserved.`
  }
  
};