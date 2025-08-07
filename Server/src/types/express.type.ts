import type { IUser } from '../models/users.model.js';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
