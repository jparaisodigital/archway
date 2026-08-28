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
        "Our agency draws its strength from a group of young and dynamic associates and staff, leveraging its more than 15 years of solid experience in the field of local contractual manpower-providing services in the Philippines through its mother company, Archway Multi-Services Corporation.",
        "We stand proud by our clean record of Zero-complaint sanction and Zero-citation sanction from POEA."
      ]
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