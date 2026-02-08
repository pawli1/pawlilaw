export enum LoadingState {
  IDLE = 'IDLE',
  THINKING = 'THINKING',
  STREAMING = 'STREAMING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR',
}

export interface LegalExample {
  id: string;
  title: string;
  category: string;
  prompt: string;
  iconName: 'Home' | 'Briefcase' | 'Copyright' | 'FileWarning' | 'Users';
}

export interface AdviceResponse {
  markdown: string;
  isThinking: boolean;
}