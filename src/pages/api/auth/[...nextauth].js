import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async redirect(url, baseUrl) {
      return baseUrl;
    },
  },
};

export default (req, res) => {
  setNextAuthUrl(req);
  NextAuth(req, res, options);
};
function setNextAuthUrl(req) {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const host = req.headers['host'];

  if (!host) {
    throw new Error(`The request has no host header which breaks authentication and authorization.`);
  }

  process.env.NEXTAUTH_URL = `${protocol}://${host}`;
}
