//import {Request} from 'express'

export type AuthUser = {
  id: number;
  username: string;
};

export type AuthorizedUser = {
  username: string;
  passwordHash: string;
  id: string;
};


export interface AuthRequest extends Request {
  currentUser: AuthUser | undefined;
}
