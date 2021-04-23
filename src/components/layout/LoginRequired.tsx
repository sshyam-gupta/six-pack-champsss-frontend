import React, { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

const LoginRequired: FunctionComponent = ({ children }) => {
  const router = useRouter();
  const [session, loading] = useSession();

  if (typeof window !== 'undefined' && loading) return null;

  React.useEffect(() => {
    if (!session) {
      router.push('/signin');
      return;
    }
  }, [loading, session, router]);

  const canAccess = session && !loading;

  return <>{canAccess && children}</>;
};

export default LoginRequired;
