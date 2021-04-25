import React, { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

const LoginRequired: FunctionComponent = ({ children }) => {
  const router = useRouter();
  const [session, loading] = useSession();

  React.useEffect(() => {
    if (!session && !loading) {
      router.push('/signin');
      return;
    }
  }, [loading, session, router]);

  if (typeof window !== 'undefined' && loading) return null;

  const canAccess = session && !loading;

  return <>{canAccess && children}</>;
};

export default LoginRequired;
