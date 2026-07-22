export interface SeoJob {
  slug: string;
  title: string;
  category: string;
  salary: string;
  growth: string;
  keywords: string[];
  description: string;
}

export const seoJobs: SeoJob[] = [
  {
    slug: "software-engineer",
    title: "Software Engineer",
    category: "Technology",
    salary: "$110,000 - $160,000",
    growth: "22% (Much faster than average)",
    keywords: ["React", "Node.js", "System Design", "Agile", "REST APIs", "AWS"],
    description: "Software Engineers design, develop, and maintain software applications. A strong resume must highlight technical stack proficiency, system architecture experience, and measurable impacts on application performance.",
  },
  {
    slug: "registered-nurse",
    title: "Registered Nurse (RN)",
    category: "Healthcare",
    salary: "$75,000 - $105,000",
    growth: "6% (Faster than average)",
    keywords: ["Patient Care", "BLS/ACLS Certified", "EMR/EHR", "Triage", "Medication Administration"],
    description: "Registered Nurses provide and coordinate patient care. Your resume must clearly state your licenses, certifications, clinical hours, and specific unit experience (e.g., ICU, ER, Pediatrics).",
  },
  {
    slug: "project-manager",
    title: "Project Manager",
    category: "Business",
    salary: "$90,000 - $130,000",
    growth: "7% (Faster than average)",
    keywords: ["Agile/Scrum", "Budget Management", "Stakeholder Communication", "Risk Mitigation", "Jira/Confluence"],
    description: "Project Managers lead cross-functional teams to deliver projects on time and within budget. Focus your resume on project scope (dollar value), team size, and successful delivery metrics.",
  },
  {
    slug: "data-analyst",
    title: "Data Analyst",
    category: "Technology",
    salary: "$70,000 - $100,000",
    growth: "23% (Much faster than average)",
    keywords: ["SQL", "Python", "Tableau/PowerBI", "Data Visualization", "Statistical Analysis"],
    description: "Data Analysts transform raw data into actionable business insights. An ATS-friendly resume should emphasize the tools you use and the business value your insights generated.",
  },
  {
    slug: "teacher",
    title: "Teacher",
    category: "Education",
    salary: "$50,000 - $80,000",
    growth: "4% (Average)",
    keywords: ["Curriculum Development", "Classroom Management", "Special Education", "Student Evaluation", "EdTech Tools"],
    description: "Teachers educate students and develop lesson plans. Highlight your state certifications, grade-level experience, and metrics like improved standardized test scores.",
  },
  {
    slug: "marketing-manager",
    title: "Marketing Manager",
    category: "Marketing",
    salary: "$85,000 - $135,000",
    growth: "10% (Faster than average)",
    keywords: ["Digital Marketing", "SEO/SEM", "Content Strategy", "Campaign Analytics", "Brand Positioning"],
    description: "Marketing Managers oversee advertising and promotional campaigns. Your resume must be deeply quantitative—show exactly how your campaigns increased ROI, traffic, or lead generation.",
  },
  {
    slug: "sales-executive",
    title: "Sales Executive",
    category: "Business",
    salary: "$60,000 - $120,000+",
    growth: "5% (Average)",
    keywords: ["B2B Sales", "Lead Generation", "CRM (Salesforce)", "Account Management", "Contract Negotiation"],
    description: "Sales Executives drive revenue growth. An effective sales resume must focus entirely on numbers: quota attainment percentages, territory growth, and major client acquisitions.",
  },
  {
    slug: "graphic-designer",
    title: "Graphic Designer",
    category: "Design",
    salary: "$50,000 - $80,000",
    growth: "3% (Slower than average)",
    keywords: ["Adobe Creative Suite", "UI/UX Design", "Typography", "Brand Identity", "Figma"],
    description: "Graphic Designers create visual concepts. While you need a portfolio, your ATS resume must still contain text-based keywords regarding the software you use and the types of media you produce.",
  },
  {
    slug: "customer-service-representative",
    title: "Customer Service Representative",
    category: "Support",
    salary: "$35,000 - $50,000",
    growth: "-4% (Decline)",
    keywords: ["Conflict Resolution", "Zendesk/Intercom", "High-Volume Call Handling", "Client Retention", "Active Listening"],
    description: "Customer Service Representatives are the frontline of client interaction. Emphasize metrics like Customer Satisfaction (CSAT) scores, call volume, and issue resolution time.",
  },
  {
    slug: "hr-manager",
    title: "Human Resources Manager",
    category: "Human Resources",
    salary: "$90,000 - $140,000",
    growth: "7% (Faster than average)",
    keywords: ["Talent Acquisition", "Employee Relations", "Onboarding", "Benefits Administration", "Compliance (OSHA/FMLA)"],
    description: "HR Managers oversee the administrative functions of an organization. Highlight your experience in scaling teams, reducing turnover, and implementing HRIS software.",
  }
];
