import { Project, Certification, EducationItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Hoorain',
  lastName: 'Haqnawaz',
  fullName: 'Hoorain Haqnawaz',
  roleLine: 'Frontend Developer | UX Designer | AI Enthusiast',
  tagline: 'Turning Ideas into Impact',
  heroBio: 'I am a Computer Science final year student, passionate about building user-friendly web applications, solving real-world problems with technology, and exploring the power of AI and data.',
  aboutMeText: "I'm Hoorain Haqnawaz, a passionate Computer Science student with hands-on experience in web development, UX design, Python, and AI tools. I enjoy creating user-centered solutions and love learning new technologies. I am currently seeking Master's scholarship opportunities in Computer Science to further my research and contribute to innovative projects in the field of AI, Data Mining, and Intelligent Systems.",
  location: 'Jauharabad, Punjab, Pakistan',
  phone: '+92 304 5856474',
  email: 'hoorainhaqnawaz221@gmail.com',
  githubPortfolio: 'https://hoorain644.github.io/Hoor_portfolio/',
  githubUrl: 'https://github.com/hoorain644',
  linkedin: 'https://www.linkedin.com/in/hoorain-haqnawaz-086361324',
  avatarImage: '/src/assets/images/hoorain_avatar_1790527313828.jpg',
  fallbackImage: '/src/assets/images/hoor_original.jpeg',
};

export const SKILL_GROUPS = [
  {
    id: 'programming',
    title: 'Programming & Development',
    tags: 'HTML, CSS, JavaScript, PHP, Python, Node.js, MySQL, Firebase, Flutter (Basic)',
    iconType: 'code',
  },
  {
    id: 'ai_data',
    title: 'AI & Data Science',
    tags: 'Python, Machine Learning, Data Analysis, AI Tools, Prompt Engineering',
    iconType: 'brain',
  },
  {
    id: 'design_ux',
    title: 'Design & UX',
    tags: 'Figma, Adobe XD, Wireframing, Prototyping, User Research, Usability Testing',
    iconType: 'pen',
  },
  {
    id: 'tools',
    title: 'Tools & Platforms',
    tags: 'Git, GitHub, VS Code, MS Office',
    iconType: 'wrench',
  },
  {
    id: 'soft_skills',
    title: 'Soft Skills',
    tags: 'Communication, Problem-solving, Teaching, Collaboration, Project Management',
    iconType: 'users',
  },
];

export const FEATURED_PROJECTS = [
  {
    id: 'dairy-farm',
    title: 'Raja Haqnawaz Dairy Farm Management & Online Selling System',
    category: 'Full Stack Web Application',
    tag: 'Web Development',
    image: '/src/assets/images/dairy_farm_ui_1790527327136.jpg',
    demoType: 'dairy',
    liveUrl: 'https://bsf23005965-gif.github.io/raja-haqnawaz-dairy-farm/',
    description: 'Comprehensive livestock and dairy management ERP system integrating animal health profiles, milking yield metrics, and direct wholesale order processing.',
  },
  {
    id: 'voice-calculator',
    title: 'Multilingual Voice-Based Calculator',
    category: 'Final Year Project (FYP)',
    tag: 'AI & Python',
    image: '/src/assets/images/voice_calc_ui_1790527341217.jpg',
    demoType: 'calculator',
    liveUrl: '',
    description: 'Accessibility-first computational system combining multilingual speech recognition (Urdu & English) with mathematical AST parsing and auditory voice readouts.',
  },
  {
    id: 'ecommerce-site',
    title: 'E-Commerce Website',
    category: 'Frontend & Backend',
    tag: 'Web Development',
    image: '/src/assets/images/ecom_ui_1790527354415.jpg',
    demoType: 'ecommerce',
    liveUrl: 'https://hoorain789.github.io/hoor/',
    description: 'Responsive online storefront with dynamic category filters, shopping cart management, user authentication, and optimized PHP/MySQL database.',
  },
  {
    id: 'hotel-booking',
    title: 'Hotel Booking Website',
    category: 'Responsive Web Design',
    tag: 'Web Development',
    image: '/src/assets/images/hotel_ui_1790527366376.jpg',
    demoType: 'hotel',
    liveUrl: 'https://hoorain789.github.io/hooria/',
    description: 'User-friendly hotel reservation platform featuring interactive room suite tours, availability calendar, and seamless transparent booking flow.',
  },
];

export const CERTIFICATIONS_LIST = [
  {
    id: 'cert-1',
    title: 'Google AI Professional Certificate',
    issuer: 'Coursera',
    date: 'Completed Aug 2026',
    iconColor: '#EA4335',
  },
  {
    id: 'cert-2',
    title: 'Google IT Automation with Python',
    issuer: 'Coursera',
    date: 'Completed Sep 2026',
    iconColor: '#4285F4',
  },
  {
    id: 'cert-3',
    title: 'Google UX Design Certificate',
    issuer: 'Coursera',
    date: 'Completed Aug 2026',
    iconColor: '#FBBC05',
  },
  {
    id: 'cert-4',
    title: 'Python Crash Course',
    issuer: 'Coursera',
    date: 'Completed Sep 2026',
    iconColor: '#34A853',
  },
];

export const EXTRA_CERTIFICATIONS = [
  { title: 'Conduct UX Research & Test Early Concepts', issuer: 'Coursera · Google', date: 'Sep 2026' },
  { title: 'Build Wireframes & Low-Fidelity Prototypes', issuer: 'Coursera · Google', date: 'Aug 2026' },
  { title: 'Foundations of User Experience (UX) Design', issuer: 'Coursera · Google', date: 'Aug 2026' },
  { title: 'Design a User Experience for Social Good', issuer: 'Coursera · Google', date: 'Aug 2026' },
  { title: 'Accelerate Your Job Search with AI', issuer: 'Coursera · Google', date: 'Aug 2026' },
];

export const EXPERIENCE_TIMELINE = [
  {
    role: 'Computer Teacher',
    institution: 'Ali Memorial Public Model High School, Jauharabad',
    period: '2023 – Present',
    details: 'Instruction in Computer Science foundations, HTML/CSS, Python programming, and hands-on laboratory exercises for 120+ students.',
  },
  {
    role: 'Teaching & Research Experience',
    institution: 'CS Academic Mentorship & Project Guidance (Lahore / Jauharabad)',
    period: '2021 – 2023',
    details: 'Supervised student coding initiatives, conducted tutorial sessions in procedural programming, database design, and algorithmic problem-solving.',
  },
  {
    role: 'Student Leadership & Academic Societies',
    institution: 'University Computing Society & STEM Outreach',
    period: '2020 – 2023',
    details: 'Organized computational workshops, technology exhibitions, and peer coding study groups.',
  },
];

export const ARTICLES_AND_INSIGHTS = [
  {
    id: 'post-1',
    title: 'Designing Multilingual Voice Interfaces: UX Case Study of Voice-Based Calculator',
    summary: 'Exploration of acoustic AST parsing, bilingual voice recognition in English & Urdu, and accessibility-first computational interaction for non-English speakers.',
    date: 'Sep 2026',
    readTime: '5 min read',
    category: 'Human–Computer Interaction',
    link: '#projects',
  },
  {
    id: 'post-2',
    title: 'Architecting Digital ERP for Livestock: Raja Haqnawaz Dairy Farm System',
    summary: 'How full-stack web architecture, real-time cattle health telemetry, and automated sales invoicing streamline agricultural productivity.',
    date: 'Aug 2026',
    readTime: '6 min read',
    category: 'Full-Stack Engineering',
    link: 'https://bsf23005965-gif.github.io/raja-haqnawaz-dairy-farm/',
  },
  {
    id: 'post-3',
    title: 'Automating Real-World Systems with Python & Google IT Automation',
    summary: 'Insights gained from the 7-course Google Professional specialization covering OS automation, configuration management, and diagnostic scripts.',
    date: 'Jul 2026',
    readTime: '4 min read',
    category: 'Python Automation',
    link: '#certifications',
  },
];
