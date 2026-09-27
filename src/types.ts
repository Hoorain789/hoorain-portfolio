export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'ai_voice' | 'fullstack' | 'web_ux';
  description: string;
  image: string;
  highlights: string[];
  techStack: string[];
  metrics: string;
  caseStudy: {
    problem: string;
    targetUsers: string;
    uxMethodology: string;
    solution: string;
    keyLearnings: string[];
    wireframeSteps: { step: string; title: string; detail: string }[];
  };
  demoType: 'calculator' | 'dairy' | 'hotel' | 'ecommerce';
  liveUrl?: string;
  githubUrl?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  badgeType: 'python' | 'ai' | 'ux' | 'career';
  credentialId?: string;
  overview: string;
  competencies: string[];
  coursesCount?: number;
}

export interface EducationItem {
  degree: string;
  institution: string;
  location?: string;
  scoreOrStatus: string;
  period: string;
  details: string;
}

export interface EndorsementItem {
  id: string;
  author: string;
  role: string;
  affiliation: string;
  comment: string;
  date: string;
}
