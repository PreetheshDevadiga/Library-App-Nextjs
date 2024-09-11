import { Session, User } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    role?: string | null;
  }

  interface CustomSession extends Session {
    user?: User;
  }
}