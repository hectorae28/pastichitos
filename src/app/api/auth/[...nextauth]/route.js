import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  type: "credentials",
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials;
        const user = {
          id: "1",
          name: "J Smith",
          emails: "jsmith@example.com",
        };

        if (email !== "hello@mail.com" || password !== "pass") {
          // Any object returned will be saved in `user` property of the JWT
          throw new Error("Email o contraseña incorecta, revise e intente de nuevo");
        } 
        return {
          id: "1234",
          name: "John Doe",
          email: "john@gmail.com",
          role: "admin",
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    // error: '/auth/error',
    // signOut: '/auth/signout'
  },
});
export { handler as GET, handler as POST }