export interface ResumeExample {
  slug: string;
  role: string;
  title: string;
  description: string;
  recommendedTemplate: string;
  recommendedTemplateName: string;
  skills: string[];
  actionVerbs: string[];
  sampleStructure: {
    summary: string;
    experience: string[];
  };
  formattingTips: string[];
  commonMistakes: string[];
  faqs: { question: string; answer: string }[];
  relatedExamples: { slug: string; title: string }[];
}

export const RESUME_EXAMPLES: ResumeExample[] = [
  {
    slug: 'software-engineer',
    role: 'Software Engineer',
    title: 'Software Engineer Resume Example & Writing Guide',
    description: 'Learn how to write a software engineer resume that highlights your coding skills, projects, and impact. See our sample structure and top action verbs.',
    recommendedTemplate: 'developer',
    recommendedTemplateName: 'Developer Portfolio',
    skills: ['JavaScript / TypeScript', 'React.js / Next.js', 'Node.js / Express', 'Python / Django', 'SQL / NoSQL Databases', 'REST APIs / GraphQL', 'Git / GitHub / CI/CD', 'AWS / Azure / GCP'],
    actionVerbs: ['Architected', 'Deployed', 'Engineered', 'Optimized', 'Refactored', 'Spearheaded', 'Integrated', 'Developed'],
    sampleStructure: {
      summary: 'Results-driven Software Engineer with 4+ years of experience designing and developing scalable web applications. Proficient in React, Node.js, and cloud infrastructure. Proven track record of improving system performance by 30% and successfully delivering complex projects on time.',
      experience: [
        'Engineered a high-performance REST API using Node.js and Express, reducing average response time by 40%.',
        'Spearheaded the migration of a legacy monolithic application to a modern microservices architecture using Docker and Kubernetes.',
        'Collaborated with a cross-functional team of 5 developers to implement new features using React and Redux.',
      ]
    },
    formattingTips: [
      'Include a prominent Technical Skills section near the top.',
      'Link your GitHub or personal portfolio in the contact section.',
      'Use bullet points to quantify your impact (e.g., "reduced load time by 20%").'
    ],
    commonMistakes: [
      'Listing every technology ever used, instead of focusing on what you actually know well.',
      'Failing to explain the business impact of the code you wrote.',
      'Using a two-column format that breaks ATS parsing.'
    ],
    faqs: [
      { question: 'Should I include projects on my software engineer resume?', answer: 'Yes! Personal or academic projects are crucial, especially if you have less than 3 years of professional experience.' },
      { question: 'Do I need a summary section?', answer: 'A short summary is helpful to establish your years of experience and core tech stack at a glance.' }
    ],
    relatedExamples: [
      { slug: 'data-analyst', title: 'Data Analyst' },
      { slug: 'student-resume', title: 'Computer Science Student' }
    ]
  },
  {
    slug: 'student-resume',
    role: 'College Student',
    title: 'College Student Resume Example & Guide',
    description: 'Writing a resume as a student with no experience? Focus on your education, projects, and extracurriculars. Use this student resume example as a template.',
    recommendedTemplate: 'graduate',
    recommendedTemplateName: 'Graduate Starter',
    skills: ['Research & Analysis', 'Academic Writing', 'Public Speaking', 'Time Management', 'Team Collaboration', 'Problem Solving', 'Data Collection', 'Microsoft Office Suite'],
    actionVerbs: ['Organized', 'Researched', 'Presented', 'Coordinated', 'Analyzed', 'Assisted', 'Drafted', 'Volunteered'],
    sampleStructure: {
      summary: 'Motivated and detail-oriented Business Administration student with a strong academic record (3.8 GPA). Experienced in leading group projects and organizing campus events. Seeking a summer internship in marketing to apply analytical skills and contribute to a dynamic team.',
      experience: [
        'Organized a campus-wide charity event that raised over $5,000, managing a team of 15 volunteers.',
        'Conducted extensive market research for a senior capstone project, analyzing data from 500+ survey respondents.',
        'Assisted professors with grading papers and tutoring freshmen students in introductory economics courses.',
      ]
    },
    formattingTips: [
      'Place your Education section at the top, right under your summary.',
      'Include your GPA if it is 3.5 or higher.',
      'Leverage relevant coursework to show subject-matter exposure.'
    ],
    commonMistakes: [
      'Including high school information after your sophomore year of college.',
      'Ignoring part-time jobs—even retail jobs show teamwork and reliability.',
      'Not including extracurricular leadership roles.'
    ],
    faqs: [
      { question: 'What if I have zero work experience?', answer: 'Focus heavily on academic projects, volunteering, clubs, and relevant coursework. Employers look for potential and soft skills at the student level.' }
    ],
    relatedExamples: [
      { slug: 'fresh-graduate', title: 'Fresh Graduate' }
    ]
  },
  {
    slug: 'fresh-graduate',
    role: 'Fresh Graduate',
    title: 'Fresh Graduate Resume Example & Tips',
    description: 'A complete guide and resume example for recent graduates entering the job market. Highlight your degree, internships, and potential.',
    recommendedTemplate: 'ats-minimal',
    recommendedTemplateName: 'ATS Minimal',
    skills: ['Critical Thinking', 'Adaptability', 'Communication', 'Project Management', 'Data Analysis', 'Leadership', 'Technical Writing', 'Cross-functional Collaboration'],
    actionVerbs: ['Achieved', 'Created', 'Designed', 'Initiated', 'Completed', 'Collaborated', 'Formulated', 'Delivered'],
    sampleStructure: {
      summary: 'Recent Computer Science graduate with a passion for data analytics and problem-solving. Completed two successful internships where I developed automated reporting tools using Python. Eager to leverage my technical foundation and rapid learning abilities in an entry-level Data Analyst role.',
      experience: [
        'Developed an automated data extraction script using Python during a 3-month summer internship, saving the team 10 hours of manual work weekly.',
        'Collaborated with senior analysts to create interactive dashboards in Tableau for client presentations.',
        'Completed a comprehensive senior project developing a predictive machine learning model with 85% accuracy.',
      ]
    },
    formattingTips: [
      'Highlight internships and co-ops as primary work experience.',
      'Keep the resume strictly to one page.',
      'Include a clear summary that states the role you are targeting.'
    ],
    commonMistakes: [
      'Using a "one size fits all" approach instead of tailoring to specific entry-level roles.',
      'Focusing too much on what you want to learn rather than the value you can bring immediately.',
      'Forgetting to proofread for basic spelling and grammar errors.'
    ],
    faqs: [
      { question: 'Should education still go first?', answer: 'Yes, if you graduated within the last year, Education should still be near the top. After your first full-time role, move it to the bottom.' }
    ],
    relatedExamples: [
      { slug: 'student-resume', title: 'College Student' },
      { slug: 'marketing-specialist', title: 'Marketing Specialist' }
    ]
  },
  {
    slug: 'teacher',
    role: 'Teacher',
    title: 'Teacher Resume Example & Writing Guide',
    description: 'Discover how to format a teacher resume. Highlight your certifications, classroom management skills, and student success rates.',
    recommendedTemplate: 'academic',
    recommendedTemplateName: 'Academic CV',
    skills: ['Curriculum Development', 'Classroom Management', 'Lesson Planning', 'Special Education', 'Educational Technology', 'Student Assessment', 'Parent-Teacher Communication', 'Differentiated Instruction'],
    actionVerbs: ['Educated', 'Instructed', 'Mentored', 'Facilitated', 'Assessed', 'Developed', 'Adapted', 'Fostered'],
    sampleStructure: {
      summary: 'Dedicated and compassionate Elementary School Teacher with 6 years of experience creating engaging, student-centered lesson plans. Proven ability to improve student test scores by 15% through differentiated instruction and technology integration. Committed to fostering a positive and inclusive classroom environment.',
      experience: [
        'Developed and implemented engaging curriculum for 3rd-grade students, resulting in a 15% increase in standardized math scores over two years.',
        'Fostered a highly inclusive classroom environment by integrating differentiated instruction techniques for students with diverse learning needs.',
        'Facilitated weekly parent-teacher communication through digital newsletters and an interactive classroom portal.',
      ]
    },
    formattingTips: [
      'Clearly state your certifications and licensures near the top.',
      'Use numbers to show class sizes and grade levels taught.',
      'Include specific educational technologies you are proficient in (e.g., Google Classroom, Canvas).'
    ],
    commonMistakes: [
      'Writing vague statements like "taught students" instead of specifying subjects, grades, and methodologies.',
      'Omitting state certifications, which are usually hard requirements.',
      'Forgetting to mention parent communication and administrative duties.'
    ],
    faqs: [
      { question: 'Can a teacher resume be two pages?', answer: 'Yes, especially if you have over 5-7 years of experience or extensive continuing education and committee involvement. However, one page is still preferred for newer teachers.' }
    ],
    relatedExamples: [
      { slug: 'student-resume', title: 'Student/Tutor' }
    ]
  },
  {
    slug: 'sales-representative',
    role: 'Sales Representative',
    title: 'Sales Representative Resume Example',
    description: 'Write a sales resume that proves your ability to close deals and exceed quotas. Get tips, action verbs, and a proven structure.',
    recommendedTemplate: 'corporate',
    recommendedTemplateName: 'Corporate Classic',
    skills: ['B2B Sales', 'CRM Software (Salesforce)', 'Lead Generation', 'Negotiation', 'Account Management', 'Cold Calling', 'Client Presentations', 'Sales Forecasting'],
    actionVerbs: ['Exceeded', 'Generated', 'Negotiated', 'Closed', 'Secured', 'Pioneered', 'Expanded', 'Outperformed'],
    sampleStructure: {
      summary: 'Results-driven Sales Representative with 5+ years of experience in B2B software sales. Consistent top performer, exceeding annual sales quotas by an average of 120% for three consecutive years. Skilled in lead generation, complex negotiations, and building long-term client relationships.',
      experience: [
        'Exceeded annual sales quota by 125% in 2023, generating over $1.2M in new software revenue.',
        'Secured and onboarded 15 new enterprise-level clients through targeted cold calling and personalized email campaigns.',
        'Negotiated complex, multi-year enterprise contracts, resulting in a 20% increase in average deal size.',
      ]
    },
    formattingTips: [
      'Numbers are everything. Quantify your sales, quota achievements, and revenue generated.',
      'Highlight specific sales methodologies you are trained in (e.g., SPIN, Challenger).',
      'Use a clean, corporate layout that gets straight to the numbers.'
    ],
    commonMistakes: [
      'Describing daily duties (e.g., "made cold calls") instead of achievements (e.g., "closed 50 deals via cold calling").',
      'Leaving out context for your numbers (e.g., what was the quota?).',
      'Failing to mention the CRM tools used.'
    ],
    faqs: [
      { question: 'Should I list my specific sales metrics?', answer: 'Absolutely. Mentioning exact revenue figures, percentage of quota attained, and territory size provides crucial context to hiring managers.' }
    ],
    relatedExamples: [
      { slug: 'marketing-specialist', title: 'Marketing Specialist' },
      { slug: 'customer-support', title: 'Customer Support' }
    ]
  },
  {
    slug: 'marketing-specialist',
    role: 'Marketing Specialist',
    title: 'Marketing Specialist Resume Example',
    description: 'Craft a marketing resume that showcases your campaigns, ROI, and creative skills. Find the best templates and action verbs here.',
    recommendedTemplate: 'marketing',
    recommendedTemplateName: 'Marketing Creative',
    skills: ['Digital Marketing', 'SEO / SEM', 'Content Strategy', 'Social Media Management', 'Email Marketing (Mailchimp)', 'Google Analytics', 'Copywriting', 'Campaign Management'],
    actionVerbs: ['Boosted', 'Campaigned', 'Launched', 'Maximized', 'Promoted', 'Tracked', 'Authored', 'Orchestrated'],
    sampleStructure: {
      summary: 'Creative and data-driven Marketing Specialist with 4 years of experience executing successful digital campaigns. Expertise in SEO, content strategy, and email marketing. Successfully increased organic website traffic by 45% and improved email open rates by 20% in the last year.',
      experience: [
        'Orchestrated a comprehensive SEO strategy that increased organic website traffic by 45% within 6 months.',
        'Launched and managed a targeted email marketing campaign that achieved a 25% open rate and a 10% conversion rate.',
        'Authored over 50 high-performing blog posts and whitepapers to establish industry thought leadership and generate inbound leads.',
      ]
    },
    formattingTips: [
      'Use a slightly more modern or creative template to show design sensibility, but keep it ATS-friendly.',
      'Focus on campaign metrics: CTR, conversion rates, and ROI.',
      'Include a link to an online portfolio if you are involved in content creation.'
    ],
    commonMistakes: [
      'Relying solely on buzzwords ("growth hacker", "synergy") without backing them up with data.',
      'Not specifying the scale of the campaigns managed (budget size, audience size).',
      'Ignoring the analytical side of marketing in favor of just creative tasks.'
    ],
    faqs: [
      { question: 'Do I need a portfolio for a marketing role?', answer: 'If your role involves copywriting, social media graphics, or campaign design, a portfolio is highly recommended to prove your creative chops.' }
    ],
    relatedExamples: [
      { slug: 'sales-representative', title: 'Sales Representative' },
      { slug: 'graphic-designer', title: 'Graphic Designer' }
    ]
  },
  {
    slug: 'project-manager',
    role: 'Project Manager',
    title: 'Project Manager Resume Example',
    description: 'Learn how to write a PM resume that highlights your leadership, budget management, and Agile/Scrum expertise.',
    recommendedTemplate: 'executive',
    recommendedTemplateName: 'Executive Leader',
    skills: ['Agile / Scrum Methodologies', 'Budget Management', 'Risk Assessment', 'Stakeholder Communication', 'Resource Allocation', 'Jira / Asana', 'Cross-functional Leadership', 'Quality Assurance'],
    actionVerbs: ['Directed', 'Executed', 'Facilitated', 'Managed', 'Orchestrated', 'Oversaw', 'Streamlined', 'Delivered'],
    sampleStructure: {
      summary: 'Certified Project Manager (PMP) with 7+ years of experience leading cross-functional teams in the tech sector. Proven expertise in Agile methodologies, delivering complex software projects on time and at least 10% under budget. Strong communicator skilled at aligning stakeholder expectations.',
      experience: [
        'Directed a cross-functional team of 12 engineers and designers to deliver a flagship mobile app 2 weeks ahead of schedule.',
        'Managed an annual project budget of $2M, consistently delivering projects 10-15% under budget through efficient resource allocation.',
        'Streamlined the Agile sprint planning process, reducing meeting times by 20% and increasing team velocity.',
      ]
    },
    formattingTips: [
      'State your PM certifications (PMP, Scrum Master) prominently in your title or summary.',
      'Detail the scale of your projects: team size, budget, and timeline.',
      'Use a clean, executive-level resume format.'
    ],
    commonMistakes: [
      'Failing to mention the project methodologies used (Agile, Waterfall, Kanban).',
      'Focusing only on project completion without mentioning business impact or stakeholder satisfaction.',
      'Being too vague about cross-functional team sizes.'
    ],
    faqs: [
      { question: 'Should I list every project I managed?', answer: 'No, focus on 3-4 major projects per role that highlight different aspects of your management skills (budgeting, crisis resolution, scaling).' }
    ],
    relatedExamples: [
      { slug: 'software-engineer', title: 'Software Engineer' }
    ]
  },
  {
    slug: 'customer-support',
    role: 'Customer Support',
    title: 'Customer Support Resume Example',
    description: 'A strong customer service resume focuses on communication, problem resolution, and CSAT scores. View our complete guide.',
    recommendedTemplate: 'ats-classic',
    recommendedTemplateName: 'Classic ATS-Friendly',
    skills: ['Conflict Resolution', 'Zendesk / Intercom', 'Active Listening', 'Troubleshooting', 'CRM Software', 'Multi-channel Support', 'Empathy', 'Time Management'],
    actionVerbs: ['Resolved', 'Assisted', 'Handled', 'Clarified', 'De-escalated', 'Supported', 'Addressed', 'Maintained'],
    sampleStructure: {
      summary: 'Empathetic Customer Support Specialist with 3 years of experience in fast-paced SaaS environments. Maintained a 98% Customer Satisfaction (CSAT) score while handling an average of 50+ tickets daily. Adept at de-escalating conflicts and turning frustrated users into brand advocates.',
      experience: [
        'Resolved an average of 50+ support tickets daily via email and live chat, maintaining a 98% CSAT score.',
        'De-escalated complex customer complaints, successfully retaining 90% of at-risk accounts through empathetic problem-solving.',
        'Assisted in creating a comprehensive internal knowledge base that reduced repetitive queries by 15%.',
      ]
    },
    formattingTips: [
      'Include metrics like daily ticket volume, CSAT scores, and average handling time.',
      'Mention specific helpdesk software you are proficient in (e.g., Zendesk, Jira Service Desk).',
      'Highlight multilingual skills if you have them.'
    ],
    commonMistakes: [
      'Not quantifying the volume of customers handled daily.',
      'Using generic terms like "good communication skills" instead of showing conflict resolution examples.',
      'Omitting technical troubleshooting skills.'
    ],
    faqs: [
      { question: 'How can I stand out for remote support roles?', answer: 'Highlight your experience with asynchronous communication, remote collaboration tools (Slack, Zoom), and self-motivated time management.' }
    ],
    relatedExamples: [
      { slug: 'sales-representative', title: 'Sales Representative' }
    ]
  },
  {
    slug: 'data-analyst',
    role: 'Data Analyst',
    title: 'Data Analyst Resume Example',
    description: 'Showcase your analytical skills, SQL knowledge, and data visualization expertise with this proven data analyst resume structure.',
    recommendedTemplate: 'two-column',
    recommendedTemplateName: 'Two Column Modern',
    skills: ['SQL (PostgreSQL, MySQL)', 'Python (Pandas, NumPy)', 'Data Visualization (Tableau, PowerBI)', 'Statistical Analysis', 'A/B Testing', 'Data Cleaning', 'Excel (Advanced)', 'Machine Learning Basics'],
    actionVerbs: ['Analyzed', 'Modeled', 'Visualized', 'Extracted', 'Forecasted', 'Quantified', 'Interpreted', 'Synthesized'],
    sampleStructure: {
      summary: 'Detail-oriented Data Analyst with 3+ years of experience transforming complex datasets into actionable business intelligence. Proficient in SQL, Python, and Tableau. Discovered data insights that led to a 15% reduction in customer churn and a 5% increase in operational efficiency.',
      experience: [
        'Analyzed customer usage data using SQL and Python to identify churn indicators, directly contributing to a 15% reduction in churn rate.',
        'Visualized complex datasets in Tableau, creating automated weekly dashboards for the executive leadership team.',
        'Extracted and cleaned data from multiple messy sources, improving overall data accuracy by 20% for marketing reports.',
      ]
    },
    formattingTips: [
      'Create a dedicated section for technical skills and categorize them (Languages, Tools, Databases).',
      'Always tie your data analysis back to a business outcome (e.g., increased revenue, saved time).',
      'Link to a GitHub repo containing your Jupyter notebooks or data projects.'
    ],
    commonMistakes: [
      'Listing tools without demonstrating how they were used to solve a problem.',
      'Failing to mention the size of the datasets you worked with.',
      'Writing bullet points that are too technical for a non-technical recruiter to understand.'
    ],
    faqs: [
      { question: 'Do I need to know Python to be a data analyst?', answer: 'While SQL and Excel are often the bare minimum, Python or R is highly preferred and will significantly boost your resume.' }
    ],
    relatedExamples: [
      { slug: 'software-engineer', title: 'Software Engineer' }
    ]
  },
  {
    slug: 'graphic-designer',
    role: 'Graphic Designer',
    title: 'Graphic Designer Resume Example',
    description: 'A graphic designer resume needs to look great while beating the ATS. Use our recommended creative templates and writing tips.',
    recommendedTemplate: 'creative-clean',
    recommendedTemplateName: 'Creative Clean',
    skills: ['Adobe Creative Suite (Photoshop, Illustrator, InDesign)', 'UI/UX Design', 'Figma', 'Typography', 'Branding & Identity', 'Print Design', 'Web Design', 'Color Theory'],
    actionVerbs: ['Designed', 'Illustrated', 'Conceptualized', 'Redesigned', 'Branded', 'Rendered', 'Visualized', 'Drafted'],
    sampleStructure: {
      summary: 'Creative Graphic Designer with 5 years of agency experience specializing in branding, digital assets, and print media. Highly proficient in Adobe Creative Suite and Figma. Successfully led the complete visual rebranding of 3 major clients, resulting in a 30% increase in their customer engagement.',
      experience: [
        'Conceptualized and designed a complete visual rebranding for a major e-commerce client, leading to a 30% increase in brand engagement.',
        'Designed over 100 digital marketing assets, including social media graphics, email templates, and banner ads.',
        'Collaborated with the marketing team to draft engaging print materials for 5 national trade shows.',
      ]
    },
    formattingTips: [
      'Provide a prominent link to your portfolio (Behance, Dribbble, or personal site).',
      'Use a clean, visually balanced template that shows your understanding of whitespace.',
      'Avoid heavy graphics that break ATS parsing—save your wild designs for your portfolio.'
    ],
    commonMistakes: [
      'Using unreadable decorative fonts for body text.',
      'Forgetting to describe the business goal of the designs you created.',
      'Submitting an image-only resume that cannot be read by tracking software.'
    ],
    faqs: [
      { question: 'Should my resume be a design masterpiece?', answer: 'It should be aesthetically pleasing but fundamentally readable. If an ATS cannot parse the text, a recruiter will never see your masterpiece.' }
    ],
    relatedExamples: [
      { slug: 'marketing-specialist', title: 'Marketing Specialist' }
    ]
  },
  {
    slug: 'accountant',
    role: 'Accountant',
    title: 'Accountant Resume Example',
    description: 'Build a rock-solid accounting resume. Highlight your CPA, financial reporting skills, and accuracy with our detailed guide.',
    recommendedTemplate: 'simple-bw',
    recommendedTemplateName: 'Simple B&W',
    skills: ['Financial Reporting', 'GAAP Compliance', 'Tax Preparation', 'QuickBooks / SAP', 'Account Reconciliation', 'Budget Forecasting', 'Auditing', 'Payroll Processing'],
    actionVerbs: ['Audited', 'Balanced', 'Calculated', 'Reconciled', 'Forecasted', 'Processed', 'Prepared', 'Maximized'],
    sampleStructure: {
      summary: 'Certified Public Accountant (CPA) with 6 years of experience in corporate finance and public accounting. Expert in financial reporting, tax preparation, and GAAP compliance. Successfully identified process inefficiencies, saving the company $45,000 annually in tax liabilities.',
      experience: [
        'Reconciled monthly bank statements and general ledger accounts for 5 corporate entities with 100% accuracy.',
        'Prepared and filed quarterly and annual tax returns, identifying deductions that saved clients over $45,000.',
        'Audited internal financial processes, recommending changes that reduced reporting time by 3 days per month.',
      ]
    },
    formattingTips: [
      'Place your CPA or relevant certifications next to your name or in a dedicated top section.',
      'Use a highly conservative, traditional resume format without colors or graphics.',
      'Quantify the size of the budgets or portfolios you managed.'
    ],
    commonMistakes: [
      'Failing to specify the accounting software platforms used (e.g., SAP, Oracle, NetSuite).',
      'Describing standard accounting duties without highlighting efficiency improvements or cost savings.',
      'Making formatting errors—accountants must demonstrate flawless attention to detail.'
    ],
    faqs: [
      { question: 'Do I need to list every type of tax return I prepared?', answer: 'Summarize them (e.g., Corporate 1120, Individual 1040) rather than exhaustively listing every single form, unless applying for a highly specialized tax role.' }
    ],
    relatedExamples: [
      { slug: 'data-analyst', title: 'Data Analyst' },
      { slug: 'project-manager', title: 'Project Manager' }
    ]
  },
  {
    slug: 'nurse-healthcare',
    role: 'Registered Nurse',
    title: 'Nursing & Healthcare Resume Example',
    description: 'Healthcare resumes require specific details about licenses, patient care, and compliance. Get the perfect nursing resume template.',
    recommendedTemplate: 'modern',
    recommendedTemplateName: 'Modern Professional',
    skills: ['Patient Care & Assessment', 'EMR/EHR Systems (Epic, Cerner)', 'Vital Signs Monitoring', 'Medication Administration', 'Triage', 'BLS / ACLS Certified', 'Infection Control', 'Patient Education'],
    actionVerbs: ['Administered', 'Assessed', 'Monitored', 'Educated', 'Triaged', 'Advocated', 'Documented', 'Treated'],
    sampleStructure: {
      summary: 'Compassionate Registered Nurse (RN) with 4 years of experience providing high-quality patient care in a fast-paced Med-Surg unit. BLS and ACLS certified. Recognized for excellent clinical skills, accurate EHR documentation, and the ability to remain calm and effective in high-stress situations.',
      experience: [
        'Monitored and assessed the condition of 5-7 acutely ill patients per shift, adjusting care plans as necessary.',
        'Administered medications and IV therapies with 100% compliance to safety protocols and five rights of medication administration.',
        'Educated patients and their families on post-discharge care, reducing 30-day readmission rates by 10%.',
      ]
    },
    formattingTips: [
      'List your nursing license number, state, and expiration date clearly at the top.',
      'Detail the types of units you worked in (e.g., Med-Surg, ICU, ER) and patient ratios.',
      'Include all active certifications (BLS, ACLS, PALS).'
    ],
    commonMistakes: [
      'Forgetting to mention the specific EHR systems used (Epic, Cerner, Meditech).',
      'Omitting details about charge nurse duties or committee involvement.',
      'Using a summary that focuses entirely on compassion without highlighting clinical competencies.'
    ],
    faqs: [
      { question: 'Should I include my clinical rotations?', answer: 'Only if you are a new graduate with less than 1 year of professional RN experience.' }
    ],
    relatedExamples: [
      { slug: 'teacher', title: 'Teacher' }
    ]
  }
];
