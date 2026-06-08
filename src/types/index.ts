export interface Card {
  question: string;
  answer: string;
}

export interface ThemeConfig {
  id: string;
  label: string;
  color: string;        // Tailwind bg color class for accent
  lightColor: string;   // Tailwind light bg class for cards/backgrounds
  textColor: string;    // Tailwind text color class for accent
  borderColor: string;  // Tailwind border color class
}

export type ThemeId = 'wiskunde' | 'nederlands' | 'geschiedenis';

export type View = 'home' | 'study';
