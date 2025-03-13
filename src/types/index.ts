export interface Question {
    id: number;
    text: string;
    type: 'text' | 'radio' | 'checkbox';
    options?: string[];
  }
  
  export interface Survey {
    id: number;
    title: string;
    questions: Question[];
  }