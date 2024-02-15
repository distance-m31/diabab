import { AuthUser } from '../types';

export {}

declare global {
  namespace Express {
    export interface Request {
      currentUser?: AuthUser;
    }
  }
}

