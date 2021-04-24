import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import LoginService from '../../../services/login/login';
const KIPROSH_MAIL = `@kiprosh.com`;

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
    async signIn(user) {
      const { email } = user;
      if (email.includes(KIPROSH_MAIL)) {
        return true;
      } else {
        return '/not-authorized';
      }
    },
    async jwt(token, _user, account) {
      if (account) {
        const { id_token } = account;
        const { data, error } = await LoginService.loginUser(id_token);
        if (error) {
          return token;
        }
        return { ...token, data };
      }
      return token;
    },
    async session(session, { data }) {
      session.accessToken = data.access_token;
      session.user.id = data.user.id;
      session.user.roleId = data.user.role_id;
      return session;
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
