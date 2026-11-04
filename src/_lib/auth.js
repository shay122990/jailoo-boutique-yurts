import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { auth, signIn, signOut, handlers } = NextAuth({
  providers: [Google],

  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
  },
});
// http://localhost:3000/api/auth/signin
