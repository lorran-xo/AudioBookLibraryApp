import { ReactNode } from 'react';

export interface ContextProviderType {
  children: ReactNode;
}

export interface ContextUserType {
  name: string;
  isAuthenticated: boolean;
}

export interface ContextAudiobooksDataType {
  books: any[]; // comes from an external api so it is hard to tell exactly the types.
}