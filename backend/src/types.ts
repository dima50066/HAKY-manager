import { Request } from "express";
import { User } from "./db/models/user";

export interface AuthenticatedRequest extends Request {
  user?: User;
  file?: Express.Multer.File;
  files?:
    | Express.Multer.File[]
    | { [fieldname: string]: Express.Multer.File[] };
}
