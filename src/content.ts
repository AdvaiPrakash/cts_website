export interface NavItem {
  label: string;
  href: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  badge: string;
  primaryCta: string;
  secondaryCta: string;
  card1Val: string;
  card1Sub: string;
  card1Label: string;
  card2Val: string;
  card2Sub: string;
  card2Label: string;
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  highlighted?: boolean;
  checklist?: string[];
}

export interface WhyChooseUsContent {
  badge: string;
  title: string;
  subtitle: string;
  items: WhyChooseUsItem[];
  cta: string;
}

export interface CourseItem {
  id: string;
  title: string;
  image: string;
  link: string;
  eligibility?: string;
  fees: string;
  duration: string;
  batch: string;
  syllabus: string[];
  description: string;
  rating?: number;
  badge?: string;
}

export interface CoursesContent {
  badge: string;
  title: string;
  subtitle: string;
  items: CourseItem[];
}

export interface BusinessImpactStat {
  val: string;
  label: string;
  desc: string;
  year: string;
}

export interface BusinessImpactContent {
  title: string;
  stats: BusinessImpactStat[];
}

export interface TeamLeader {
  name: string;
  role: string;
  image: string;
}

export interface TeamContent {
  badge: string;
  title: string;
  subtitle: string;
  leaders: TeamLeader[];
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
}

export interface TestimonialContent {
  title: string;
  items: TestimonialItem[];
}

export interface WorksheetItem {
  title: string;
  desc: string;
  link: string;
}

export interface WorksheetsContent {
  title: string;
  items: WorksheetItem[];
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface FeaturesContent {
  title: string;
  subtitle: string;
  items: FeatureItem[];
}

export interface VisionContent {
  title: string;
  subtitle: string;
  paragraphs: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqContent {
  title: string;
  subtitle: string;
  items: FaqItem[];
}

export interface FooterContent {
  copyright: string;
  links: NavItem[];
}

export interface SiteContent {
  brand: {
    name: string;
    logoText: string;
  };
  navigation: NavItem[];
  hero: HeroContent;
  whyChooseUs: WhyChooseUsContent;
  courses: CoursesContent;
  businessImpact: BusinessImpactContent;
  team: TeamContent;
  testimonials: TestimonialContent;
  worksheets: WorksheetsContent;
  features: FeaturesContent;
  vision: VisionContent;
  faq: FaqContent;
  footer: FooterContent;
}

export const CONTENT: SiteContent = {
  brand: {
    name: "CTS",
    logoText: "Creative Tax Solutions",
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Courses", href: "/features" },
    { label: "Gallery", href: "/gallery" },
    { label: "Certificates", href: "/certificates" },
    { label: "Contact", href: "/contact" },
  ],
  hero: {
    badge: "Professional Training Academy",
    title: "Become a Job-Ready Accounting Professional",
    subtitle: "Practical training in Accounting, GST, Income Tax, Tally Prime, SAP, and Business Compliance.",
    primaryCta: "View Courses",
    secondaryCta: "Free Consultation",
    card1Val: "10+",
    card1Sub: "Courses Available",
    card1Label: "Professional Courses",
    card2Val: "Expert",
    card2Sub: "Faculty Support",
    card2Label: "Faculty Support",
  },
  whyChooseUs: {
    badge: "Why to choose Us ?",
    title: "Learn Accurate Record Keeping",
    subtitle: "Industry-oriented training designed to equip students and professionals with practical skills, statutory knowledge, and career-ready expertise.",
    items: [
      {
        id: "accounting",
        title: "Practical Accounting",
        description: "Hands-on training in financial record-keeping, double-entry bookkeeping, ledger management, and financial statement finalization.",
        checklist: ["Start career as Accountant", "Hands-on data entry", "Real ledger management"],
      },
      {
        id: "career",
        title: "Career",
        description: "Pathway to becoming a certified GST practitioner, tax consultant, or independent accountant with high industry demand.",
        checklist: ["GST Practitioner path", "TAX Consultant roadmap", "Professional certification"],
      },
      {
        id: "filing",
        title: "Filing",
        description: "Comprehensive learning of e-filing statutory returns including GST, Income Tax, TDS, PF, and ESI compliance.",
        checklist: ["GST online return filing", "Income Tax (IT) e-filing", "Statutory audit compliance"],
      },
      {
        id: "gst-rules",
        title: "GST ACT And Rules",
        description: "In-depth section-wise analysis of GST regulations, legal frameworks, and regular statutory updates for practitioners.",
        checklist: ["GST Act fundamentals", "Latest legal updates", "Business tax strategies"],
      },
    ],
    cta: "Explore Courses",
  },
  courses: {
    badge: "Our Services",
    title: "Our Courses",
    subtitle: "Bridge the gap between academic education and industry requirements. Explore our hands-on, practical certification courses in Accounting, GST, Income Tax, Corporate Audits, and ERP systems led by seasoned practitioners.",
    items: [
      {
        id: "gst-taxation",
        title: "Diploma in GST & Taxation",
        eligibility: "+2 and Above (Degree holders eligible for GST Practitioner)",
        fees: "₹20,000/-",
        duration: "6 Months",
        batch: "Sunday Batch",
        image: "/course-taxation.jpg",
        link: "/features/gst-taxation",
        description: "Comprehensive program covering ledger posting, balance sheets, and advanced tax computation.",
        rating: 4.9,
        badge: "Popular",
        syllabus: [
          "Basics of Accounting",
          "Day Book",
          "GST Computation",
          "Set Off Entry",
          "Ledger Posting",
          "Trial Balance",
          "Schedules",
          "Calculation of Closing Stock",
          "Trading & Profit & Loss Account",
          "Balance Sheet",
          "GST Section-wise Analysis",
          "Ratios of Accounting",
          "Projected Trading & Profit & Loss Account",
          "Preparation of Project Report for Business Loan",
          "Filing of GST Return",
          "Income Tax Return Filing",
          "Tally with GST",
          "ESI",
          "PF",
          "TDS"
        ]
      },
      {
        id: "gst-gulf-vat",
        title: "GST & Gulf VAT",
        eligibility: "Degree and Above",
        fees: "₹25,000/-",
        duration: "6 Months",
        batch: "Sunday Batch",
        image: "/course-accounting.jpg",
        link: "/features/gst-gulf-vat",
        description: "Master corporate VAT rules, calculations, and compliance across India and the GCC countries.",
        rating: 4.8,
        badge: "Top Rated",
        syllabus: [
          "DGST + Gulf VAT Act & Rules"
        ]
      },
      {
        id: "cgstp",
        title: "Certified GST Practitioner Course (CGSTP)",
        eligibility: "+2 and Above",
        fees: "₹15,000/-",
        duration: "3+1 Months",
        batch: "Sunday Batch – 6 Months",
        image: "/course-taxation.jpg",
        link: "/features/cgstp",
        description: "In-depth section-wise analysis, return e-filing, and practical accounting with Tally ERP 9.",
        rating: 4.9,
        badge: "Best Seller",
        syllabus: [
          "Basics of Accounting",
          "Day Book",
          "GST Computation",
          "Set Off Entry",
          "Ledger Posting",
          "Trial Balance",
          "Schedules",
          "Calculation of Closing Stock",
          "Trading & Profit & Loss Account",
          "Balance Sheet",
          "GST Section-wise Analysis",
          "Ratios of Accounting",
          "Projected Trading & Profit & Loss Account",
          "Preparation of Project Report for Business Loan",
          "Filing of GST Return",
          "Income Tax Return Filing",
          "Tally with GST"
        ]
      },
      {
        id: "cpa",
        title: "Certified Practical Accountant (CPA)",
        eligibility: "SSLC/+2 and Above",
        fees: "₹5,000/-",
        duration: "2 Months",
        batch: "Sunday Batch – 3 Months",
        image: "/course-cpa.jpg",
        link: "/features/cpa",
        description: "Foundation course focusing on day-book entry, ledger finalization, and basic Tally tools.",
        rating: 4.7,
        badge: "Trending",
        syllabus: [
          "Basics of Accounting",
          "Day Book",
          "Ledger Preparation Using Day Book",
          "Finalization of Accounts",
          "Tally (Basics)"
        ]
      },
      {
        id: "tally-gst",
        title: "Computerised Accounting (Tally ERP 9 with GST & E-Filing)",
        eligibility: "+2 and Above",
        fees: "₹7,000/-",
        duration: "2 Months",
        batch: "Sunday Batch – 3 Months",
        image: "/course-tally.jpg",
        link: "/features/tally-gst",
        description: "Develop professional hands-on expertise in digital ledger posting and statutory return filing.",
        rating: 4.8,
        badge: "Popular",
        syllabus: [
          "Tally in Detail",
          "GST Entries",
          "Making GST Reports"
        ]
      },
      {
        id: "sap-fico",
        title: "Computerised Accounting (SAP – One Module)",
        eligibility: "+2 and Above",
        fees: "₹30,000/-",
        duration: "2 Months",
        batch: "Sunday Batch – 3 Months",
        image: "/course-sap.jpg",
        link: "/features/sap-fico",
        description: "Specialized ERP training focusing on corporate accounting, reporting, and asset management.",
        rating: 4.9,
        badge: "Advanced",
        syllabus: [
          "SAP – One Module"
        ]
      },
      {
        id: "online-filing",
        title: "Online Filing",
        eligibility: "Anyone interested",
        fees: "₹3,500/-",
        duration: "1 Month",
        batch: "Sunday Batch – 2 Months",
        image: "/course-taxation.jpg",
        link: "/features/online-filing",
        description: "Focused practical modules on GST portal registration, e-filing, and direct tax compliance.",
        rating: 4.6,
        badge: "Short Term",
        syllabus: [
          "GST Filing",
          "Income Tax Filing"
        ]
      }
    ]
  },
  businessImpact: {
    title: "Our Business Impact",
    stats: [
      {
        val: "30%",
        label: "Businesses that work with CTS reduce tax liability",
        desc: "Reduction in corporate and personal tax liabilities with modern accounting models.",
        year: "2021",
      },
      {
        val: "80%",
        label: "Automating accounting processes reduces manual workload",
        desc: "Automation implementation leading to major drop in administrative cycles.",
        year: "2023",
      },
      {
        val: "78%",
        label: "Small businesses see higher profits after hiring CTS",
        desc: "Increase in small business margins through expert-guided compliance strategy.",
        year: "2025",
      },
    ],
  },
  team: {
    badge: "Personal and Business Accounting Team",
    title: "Meet Our Leaders",
    subtitle: "Our success stems from a seasoned professional team bringing extensive experience and expertise to every client engagement.",
    leaders: [
      {
        name: "Daniel Brila",
        role: "President",
        image: "/team-daniel.jpg",
      },
      {
        name: "Rebeca Johnson",
        role: "Senior Tax Manager",
        image: "/team-rebeca.jpg",
      },
    ],
  },
  testimonials: {
    title: "What Our Students Say",
    items: [
      {
        quote: "I had a very good experience of learning Accounting, Taxation, Accounting softwares and advanced excel. Creative Tax have good and experienced faculty. I would highly recommend this Institute.",
        author: "Raj",
        role: "Ernakulam",
      },
      {
        quote: "I joined Creative Tax Solutions in June batch for Tally programme. I learned totally practical work like Inventory, GST Accounting, TDS Accounting, Payroll training. Seriously my experience was good and I will recommend you to join.",
        author: "Pragya",
        role: "Trivandrum",
      },
      {
        quote: "Best institute for Accounting & Taxation. Teaching staff are excellent. Classroom facilities are good. I will recommend you join Creative Tax Solutions for best career.",
        author: "Shreya",
        role: "Kollam",
      },
      {
        quote: "The great decision I took is to learn Accounting & Taxation from Creative Tax. Teaching method is so good. Faculty are so good. I had a very good experience there. I will recommend you to join Creative Tax Solution for best career.",
        author: "Rakesh",
        role: "Ernakulam",
      },
      {
        quote: "Best institute for practical learning. As promised while joining they provided me the real data to practice .This helped me to enhance my practical skill which is very important while considering for job .",
        author: "Anand",
        role: "Kottayam",
      },
      {
        quote: "I joined Creative Tax as part of my GST upgradation. My office send [me]... really thankful to the Faculty team. In short span they helped to master GST rules, calculations and workings.",
        author: "Sreedevi",
        role: "Ernakulam",
      },
    ],
  },
  worksheets: {
    title: "Helpful Worksheets to Simplify Your Finances",
    items: [
      {
        title: "Entity Summary Worksheet",
        desc: "To summarize your multimember LLC, partnership, or corporation's financial information.",
        link: "/worksheets/entity-summary.pdf",
      },
      {
        title: "Tax Info Sheet",
        desc: "We'll need these tax documents and information to file your corporate and personal returns.",
        link: "/worksheets/tax-info.pdf",
      },
      {
        title: "Rental Real Estate Worksheet",
        desc: "To summarize income and expenses from a rental unit under current tax rules.",
        link: "/worksheets/rental-property.pdf",
      },
    ],
  },
  features: {
    title: "Smart Tax Strategy",
    subtitle: "Everything you need to navigate corporate and personal tax environments with absolute confidence.",
    items: [
      {
        id: "strategy",
        title: "Strategic Tax Planning",
        description: "Year-round optimization strategies that minimize liabilities and align perfectly with your business goals.",
        icon: "TrendingUp",
      },
      {
        id: "compliance",
        title: "Compliance & Advisory",
        description: "Flawless execution of federal, state, and international tax filings backed by expert CPA oversight.",
        icon: "ShieldCheck",
      },
      {
        id: "r-d-credits",
        title: "R&D Tax Credits",
        description: "Uncover hidden savings by identifying and claiming federal and state research and development tax credits.",
        icon: "Lightbulb",
      },
      {
        id: "audit-defense",
        title: "Audit Representation",
        description: "Rest easy with robust, professional representation and defense for IRS and state audit notices.",
        icon: "Award",
      },
    ],
  },
  vision: {
    title: "The CTS Vision",
    subtitle: "Reimagining tax advisory for the modern era.",
    paragraphs: [
      "For decades, tax consulting has remained opaque, reactive, and driven by legacy methodologies. At Creative Tax Solutions, we believe that modern enterprises deserve better. We view taxes not as an annual burden, but as a dynamic financial lever that can fuel innovation and accelerate growth.",
      "By integrating advanced analytics with personalized advisory, we convert complex compliance requirements into strategic opportunities. Our vision is to empower builders, investors, and leaders to focus on what they do best, secure in the knowledge that their tax architecture is built for scale.",
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    subtitle: "Answers to common questions about our services and process.",
    items: [
      {
        question: "How does CTS differ from a traditional CPA firm?",
        answer: "CTS goes beyond standard filing. We act as strategic partners, using predictive modeling and proactive tax planning to identify structural tax savings throughout the year, rather than just reacting during tax season.",
      },
      {
        question: "What industries do you specialize in?",
        answer: "While we advise clients across various sectors, we have specialized groups for high-growth technology startups, real estate syndicates, family offices, and cross-border enterprises.",
      },
      {
        question: "How do we get started?",
        answer: "Simply click 'Schedule a Consultation' to book a brief introductory call with one of our principal tax advisors. We will review your current situation and draft a tailored roadmap.",
      },
    ],
  },
  footer: {
    copyright: "© 2026 Creative Tax Solutions (CTS). All rights reserved.",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
};
