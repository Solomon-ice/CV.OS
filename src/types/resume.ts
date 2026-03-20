export interface SectionItem {
  title: string;
  subtitle: string;
  date: string;
  description: string;
}

export interface ResumeData {
  _id?: string;
  name: string;
  email: string;
  title: string;
  summary: string;
  experience: SectionItem[];
  education: SectionItem[];
  skills: string[];
  projects: SectionItem[];
  theme: string;
  updatedAt: string;
}
