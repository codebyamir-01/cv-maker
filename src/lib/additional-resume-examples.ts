import { ResumeExample } from "./resume-examples-data";

export const ADDITIONAL_EXAMPLES: ResumeExample[] = [
  {
    slug: 'product-manager',
    role: 'Product Manager',
    title: 'Product Manager Resume Example & Guide',
    description: 'A data-driven Product Manager resume example. Highlight your product roadmaps, cross-functional leadership, and Go-To-Market strategies.',
    recommendedTemplate: 'executive',
    recommendedTemplateName: 'Executive Leader',
    skills: ['Product Roadmap Development', 'Agile / Scrum', 'User Research', 'Go-To-Market (GTM) Strategy', 'Data Analytics', 'Cross-functional Leadership', 'Jira / Confluence', 'A/B Testing'],
    actionVerbs: ['Launched', 'Spearheaded', 'Prioritized', 'Iterated', 'Defined', 'Aligned', 'Pivoted', 'Shipped'],
    sampleStructure: {
      summary: 'Customer-obsessed Product Manager with 5+ years of experience leading cross-functional teams in the B2B SaaS space. Proven track record of taking products from 0 to 1, including launching a flagship analytics tool that generated $2M in ARR within the first year. Highly skilled in Agile methodologies and data-driven prioritization.',
      experience: [
        'Spearheaded the development and launch of a new analytics dashboard, resulting in a 40% increase in daily active users (DAU).',
        'Led a cross-functional team of 15 engineers, designers, and marketers to deliver 4 major product releases on time and under budget.',
        'Conducted over 100 user interviews to identify friction points, leading to UI/UX improvements that reduced churn by 15%.'
      ]
    },
    formattingTips: [
      'Focus heavily on metrics and the business impact of the products you shipped.',
      'Highlight your ability to align engineering, design, and marketing teams.',
      'Use action verbs that demonstrate leadership and execution, like "Launched" and "Shipped".'
    ],
    commonMistakes: [
      'Focusing too much on project management (timelines) instead of product management (strategy and outcomes).',
      'Failing to mention the size of the engineering teams you worked with.',
      'Not detailing the revenue or user growth impact of your product launches.'
    ],
    faqs: [
      { question: 'Should I include technical skills on a PM resume?', answer: 'Yes, especially if you are applying for Technical Product Manager (TPM) roles. Knowing SQL, API basics, or system architecture is a massive advantage.' }
    ],
    relatedExamples: [
      { slug: 'project-manager', title: 'Project Manager' },
      { slug: 'software-engineer', title: 'Software Engineer' }
    ]
  },
  {
    slug: 'financial-analyst',
    role: 'Financial Analyst',
    title: 'Financial Analyst Resume Example',
    description: 'Build a top-tier Financial Analyst resume. See how to quantify your financial modeling, forecasting, and Excel skills.',
    recommendedTemplate: 'corporate',
    recommendedTemplateName: 'Corporate Classic',
    skills: ['Financial Modeling', 'Variance Analysis', 'Forecasting & Budgeting', 'Advanced Excel (VBA/Macros)', 'ERP Systems (SAP, Oracle)', 'Data Visualization (Tableau)', 'Corporate Finance', 'Risk Management'],
    actionVerbs: ['Forecasted', 'Modeled', 'Reconciled', 'Evaluated', 'Optimized', 'Audited', 'Projected', 'Streamlined'],
    sampleStructure: {
      summary: 'Detail-oriented Financial Analyst with 4 years of experience in corporate finance and FP&A. Adept at building complex financial models and conducting variance analysis to drive strategic decision-making. Identified cost-saving opportunities that reduced departmental expenses by $150K annually.',
      experience: [
        'Developed robust financial models in Excel to forecast quarterly revenue and expenses with 95% accuracy.',
        'Conducted monthly variance analysis against the $10M operating budget, presenting actionable insights to C-level executives.',
        'Streamlined the month-end close process using VBA macros, reducing reporting time by 2 days.'
      ]
    },
    formattingTips: [
      'Use a highly professional, conservative resume template.',
      'Quantify the size of the budgets, revenues, or portfolios you analyzed.',
      'Explicitly list your advanced Excel skills (e.g., Pivot Tables, VLOOKUPs, VBA) as they are heavily filtered by ATS.'
    ],
    commonMistakes: [
      'Being too vague about the financial software used (mention SAP, Oracle, NetSuite, etc.).',
      'Failing to show the business outcome of your analysis (e.g., did your model save money?).',
      'Formatting errors—finance resumes must be mathematically and visually perfect.'
    ],
    faqs: [
      { question: 'Do I need a cover letter for a finance role?', answer: 'Yes, a cover letter allows you to explain complex financial projects in paragraph form, which is harder to do in bullet points.' }
    ],
    relatedExamples: [
      { slug: 'accountant', title: 'Accountant' },
      { slug: 'data-analyst', title: 'Data Analyst' }
    ]
  },
  {
    slug: 'ux-ui-designer',
    role: 'UX/UI Designer',
    title: 'UX/UI Designer Resume Example',
    description: 'Design a resume that beats the ATS while showcasing your creative UX/UI skills. Learn how to format your design portfolio links.',
    recommendedTemplate: 'creative-clean',
    recommendedTemplateName: 'Creative Clean',
    skills: ['User Research', 'Wireframing & Prototyping', 'Figma / Sketch', 'Usability Testing', 'Information Architecture', 'Interaction Design', 'Agile / Scrum', 'Basic HTML/CSS'],
    actionVerbs: ['Designed', 'Prototyped', 'Researched', 'Iterated', 'Redesigned', 'Conceptualized', 'Streamlined', 'Conducted'],
    sampleStructure: {
      summary: 'User-centric UX/UI Designer with 4+ years of experience designing intuitive digital products for SaaS platforms. Expert in Figma and rapid prototyping. Successfully redesigned a core user onboarding flow, resulting in a 25% increase in user retention and a 40% drop in support tickets.',
      experience: [
        'Led the end-to-end UX/UI redesign of the flagship mobile application, increasing daily active users by 30%.',
        'Conducted usability testing with 50+ users to identify pain points, leading to a streamlined checkout process that boosted conversion by 15%.',
        'Collaborated closely with product managers and engineers in an Agile environment to ensure pixel-perfect implementation.'
      ]
    },
    formattingTips: [
      'Your portfolio link is the most important part of your resume—make it highly visible at the top.',
      'Even though you are a designer, ensure your resume text is parsable by ATS (avoid placing text inside images).',
      'Highlight the tools you use (Figma, Miro, Principle) and your specific design methodologies.'
    ],
    commonMistakes: [
      'Creating an overly complex, graphic-heavy resume that Applicant Tracking Systems cannot read.',
      'Focusing only on the visual UI and neglecting the UX research and testing processes.',
      'Forgetting to mention the metrics that prove your design improved the product.'
    ],
    faqs: [
      { question: 'Should I use a graphical skill bar rating?', answer: 'No. Graphic skill bars (e.g., 4/5 stars for Figma) are confusing to ATS and don\'t give recruiters real context about your proficiency.' }
    ],
    relatedExamples: [
      { slug: 'graphic-designer', title: 'Graphic Designer' },
      { slug: 'software-engineer', title: 'Software Engineer' }
    ]
  },
  {
    slug: 'human-resources-manager',
    role: 'Human Resources Manager',
    title: 'Human Resources (HR) Manager Resume Example',
    description: 'Write an HR resume that demonstrates your ability to acquire talent, manage employee relations, and navigate compliance.',
    recommendedTemplate: 'corporate',
    recommendedTemplateName: 'Corporate Classic',
    skills: ['Talent Acquisition', 'Employee Relations', 'Performance Management', 'HRIS (Workday, BambooHR)', 'Onboarding & Training', 'Benefits Administration', 'Conflict Resolution', 'Labor Law Compliance'],
    actionVerbs: ['Recruited', 'Onboarded', 'Mediated', 'Implemented', 'Retained', 'Structured', 'Negotiated', 'Complied'],
    sampleStructure: {
      summary: 'Strategic Human Resources Manager with 8 years of experience building and scaling high-performing teams. Certified SHRM-CP. Proven ability to implement talent acquisition strategies that reduced time-to-hire by 20% while fostering a positive, inclusive company culture that decreased turnover by 15%.',
      experience: [
        'Directed full-cycle recruiting for 50+ open positions annually, reducing average time-to-hire from 45 days to 36 days.',
        'Implemented a new performance management and continuous feedback system, increasing employee satisfaction scores by 25%.',
        'Managed employee relations and mediated conflicts, ensuring 100% compliance with state and federal labor laws.'
      ]
    },
    formattingTips: [
      'Include your SHRM or HRCI certifications prominently.',
      'Quantify your HR metrics: time-to-hire, retention rates, and the number of employees you supported.',
      'Highlight your experience with specific HRIS platforms.'
    ],
    commonMistakes: [
      'Listing generic administrative duties instead of strategic HR initiatives.',
      'Failing to mention compliance and risk management experience.',
      'Not demonstrating how your HR strategies positively impacted the company\'s bottom line.'
    ],
    faqs: [
      { question: 'Should I include my experience with payroll?', answer: 'Yes, if you handled payroll, definitely list the specific software used (e.g., ADP, Gusto), as this is a highly sought-after hard skill.' }
    ],
    relatedExamples: [
      { slug: 'customer-support', title: 'Customer Support' }
    ]
  },
  {
    slug: 'executive-assistant',
    role: 'Executive Assistant',
    title: 'Executive Assistant Resume Example',
    description: 'An executive assistant resume must show extreme organization and trustworthiness. View our best templates and action verbs.',
    recommendedTemplate: 'simple-bw',
    recommendedTemplateName: 'Simple B&W',
    skills: ['Calendar Management', 'Travel Coordination', 'Meeting Facilitation', 'Expense Reporting', 'Event Planning', 'Microsoft Office Suite', 'Google Workspace', 'Confidentiality'],
    actionVerbs: ['Coordinated', 'Scheduled', 'Facilitated', 'Organized', 'Managed', 'Prepared', 'Streamlined', 'Drafted'],
    sampleStructure: {
      summary: 'Highly organized and proactive Executive Assistant with 6 years of experience supporting C-level executives in fast-paced corporate environments. Expert in complex calendar management, international travel coordination, and confidential communication. Recognized for anticipating executive needs and streamlining office operations.',
      experience: [
        'Managed complex, rapidly changing calendars for the CEO and CFO, scheduling over 30 meetings weekly across 4 time zones.',
        'Coordinated seamless international and domestic travel arrangements, including flights, accommodations, and detailed itineraries.',
        'Prepared and reconciled monthly executive expense reports, ensuring 100% adherence to company policies.'
      ]
    },
    formattingTips: [
      'Use a clean, highly structured resume template to reflect your organizational skills.',
      'Mention the titles of the executives you supported (e.g., Supported CEO and VP of Sales).',
      'Highlight software proficiency, especially calendar and expense tools.'
    ],
    commonMistakes: [
      'Being too modest—don\'t just say you "answered phones." Say you "managed confidential communications for the C-suite."',
      'Failing to highlight the scale of events or meetings you planned.',
      'Typos. An Executive Assistant resume must have zero errors.'
    ],
    faqs: [
      { question: 'How do I quantify an Executive Assistant role?', answer: 'Use numbers for the volume of emails/calls managed, the size of the budgets you oversaw, or the number of executives you supported simultaneously.' }
    ],
    relatedExamples: [
      { slug: 'project-manager', title: 'Project Manager' }
    ]
  }
];
