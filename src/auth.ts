import { db } from "@/lib/db";
import { IMember } from "@/models/member.model";
import { MemberRepository } from "@/repositories/member.repository";
import bcrypt from "bcrypt";
import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { z } from "zod";
import { authConfig } from "./auth.config";
import { addNewMember, createUser, getUserByEmail } from "./lib/action";
// async function getUser(email: string): Promise<User | undefined> {
//   try {
//     const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
//     return user.rows[0];
//   } catch (error) {
//     console.error("Failed to fetch user:", error);
//     throw new Error("Failed to fetch user.");
//   }
// }
const memberRepo = new MemberRepository(db);

// Define the mapping from IMember to User type
function mapMemberToUser(member: IMember): User {
  return {
    id: String(member.id), // Convert id to string
    name: member.firstName,
    email: member.email,
    role: member.role
  };
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        console.log(credentials);
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(1) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await memberRepo.getByEmail(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            console.log("Passwords Match");
            return mapMemberToUser(user);
          } else {
            console.log("Passwords do not match");
            return null;
          }
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
    
  ],
  callbacks:{
    ...authConfig.callbacks,
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          if (user) {
            const existingUser = await getUserByEmail(user.email!);
            if (!existingUser) {
              const result = await createUser({
                firstName: user.name!,
                lastName: "",
                email: user.email!,
                phone: null,
                address: "",
                password: user.id!,
                role: "user",
              });
            }
          }
        } catch (error) {
          console.error("Error creating user:", error);
          return false;
        }
      }
      return true;
    },
  }
 
});
