import {ReactNode} from 'react';

export interface ContextProviderType {
  children: ReactNode;
}

export interface ContextUserType {
  name: string;
  isAuthenticated: boolean;
}
