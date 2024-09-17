import type { CustomSession, NextAuthConfig, Session } from "next-auth";

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

export const authConfig = {
  pages: {
    signIn: "/login", 
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        const userData = {
          id: user?.id,
          name: user?.name,
          email: user?.email,
          role: user?.role,
        };
        token = { ...userData };
      }
      return token;
    },
    session({ session, token }: { session: CustomSession; token: any }) {
      if (token) {
        session.user = token;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      // const usersDetails =await fetchUserDetails();
      // const userDetails=usersDetails!.userDetails;
      const isLoggedIn = !!auth?.user;
      const user = auth?.user;

      const paths = nextUrl.pathname;

      const publicPaths = ["/", "/signup", "/login"]; 
      const isPublicPath = publicPaths.includes(paths);

      if (isPublicPath) {
        return true; 
      }

      if (!user) {
        return false;
      }

      // const adminPath=userDetails.role==="admin" ? "/admin" : "/home";
      const path = user.role === "admin" ? "/admin" : "/home";
      const isOnDashboard = nextUrl.pathname.startsWith(path);
      if (isOnDashboard) {
        if (isLoggedIn) {
          return true;
        }
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL(path, nextUrl));
      }
      return true;
    },
    // async redirect({ url, baseUrl }) {
    //   console.log("url", url);
    //   console.log("baseUrl", baseUrl);
    //   return url.startsWith(baseUrl) ? baseUrl + "/home" : url;
    // },
  },
  providers: [],
} satisfies NextAuthConfig;