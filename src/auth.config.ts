import type { NextAuthConfig } from "next-auth";
import { fetchUserDetails } from "./lib/action";

export const authConfig = {
  pages: {
    signIn: "/login", 
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // const usersDetails =await fetchUserDetails();
      // const userDetails=usersDetails!.userDetails;
      const isLoggedIn = !!auth?.user;
      const user = auth?.user;


      if (!user) {
        return false;
      }

      // const adminPath=userDetails.role==="admin" ? "/admin" : "/home";
      const path = user.email === "shrava@gmail.com" ? "/admin" : "/home";
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