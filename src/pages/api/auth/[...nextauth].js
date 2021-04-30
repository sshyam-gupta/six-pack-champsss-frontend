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
      if (email?.includes(KIPROSH_MAIL)) {
        return true;
      } else {
        return '/unauthorized';
      }
    },
    async jwt(token, _authToken, account) {
      if (account) {
        const { id_token } = account;
        const { data, error } = await LoginService.loginUser(id_token, token.name, token.picture);
        if (error) {
          return token;
        }
        return { ...token, data };
      }
      return token;
    },
    async session(session, { data }) {
      try {
        const { error, data: userData } = await LoginService.getCurrentUser(data?.user?.id, {
          Authorization: `Bearer ${data?.access_token}`,
          'Content-Type': 'application/json',
        });

        if (error) {
          return session;
        }

        session.accessToken = data?.access_token;
        session.user = {
          ...session.user,
          ...userData?.user,
        };

        session.points = userData?.points;

        return session;
      } catch (err) {
        return session;
      }
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
  process.env.NEXTAUTH_URL_INTERNAL = 'http://localhost:4000';
}
