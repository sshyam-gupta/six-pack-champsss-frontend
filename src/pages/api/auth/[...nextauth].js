import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
export default NextAuth({
  // Configure one or more authentication providers here
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async redirect(url, baseUrl) {
      return baseUrl;
    },
  },
});
