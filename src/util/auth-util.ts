import { getSession } from 'next-auth/client';

export const requirePageAuth = async ({ req }) => {
  const session = await getSession(req);

  if (!session) {
    // If no user, redirect to login
    return {
      props: {},
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  return { props: { session } };
};
