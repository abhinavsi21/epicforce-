export type ContactReason = 
  | 'Investment / Partnership'
  | 'Product Collaboration'
  | 'Technology'
  | 'Community'
  | 'Media'
  | 'General Inquiry';

export interface ContactSubmission {
  id?: string;
  created_at?: string;
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  reason: ContactReason;
  message: string;
  status?: 'new' | 'reviewed' | 'contacted';
}

export interface Founder {
  id: string;
  name: string;
  role: string;
  quote?: string;
  bio: string[];
  focus: string;
  imageAlt: string;
  connectUrl: string;
  connectPlatform: 'linkedin' | 'instagram';
}

export interface Pillar {
  number: string;
  title: string;
  description: string;
  keyAspects: string[];
}

export interface RoadmapPhase {
  phase: string;
  title: string;
  timeline: string;
  status: 'current' | 'upcoming' | 'future';
  milestones: string[];
}
