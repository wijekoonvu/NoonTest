import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { Session } from "inspector";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    GoogleProvider({
      clientId: "1014147826852-nidf84gu17juvbea6u6o77j6m4ujtte9.apps.googleusercontent.com",
      clientSecret:"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",
    }),
    // ...add more providers here
  ],
//   theme: {
//       logo: "https://media-exp1.licdn.com/dms/image/C5603AQHISADXMziEWQ/profile-displayphoto-shrink_200_200/0/1604915738647?e=1648684800&v=beta&t=PjplC6YzcCl1MRM5iKUR5eHouO4HJB2QEBqnOoteRq0",
//       brandColor: "#13287",
//       colorScheme: "auto",
//   },
secret: process.env.NEXTAUTH_SECRET,
pages: {
    signIn: "/auth/signin",
},
callbacks: {
    async Session({session, token, user}){
      session.user.username = session.user.name
      .split('')
      .join('')
      .toLocaleLowerCase();

      session.user.uid = token.sub;
      return session;
    }
}
});