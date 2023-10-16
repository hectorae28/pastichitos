import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {app} from "@/hooks/firebase";

const handler = NextAuth({
  type: "credentials",
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        const auth = getAuth(app);
         try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          if (userCredential) {
            return {
              email: userCredential.user.email,
              accessToken: userCredential.idToken,
            };
          } else return null;
        } catch (error) {
          throw new Error(error);
        } 
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.email = user.email;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.email = token.email;
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
export { handler as GET, handler as POST };
