import { useSession } from 'next-auth/client';
import { useEffect } from 'react';
import { SWRConfig } from 'swr';

import fetcher from '../util/swr-util';

const ContextWrapper = ({ children }: any) => {
  const [session] = useSession();

  useEffect(() => {
    if (session?.accessToken && typeof window !== 'undefined') {
      window.sessionStorage.setItem('token', session?.accessToken);
    }
  }, [session?.accessToken]);

  return (
    <SWRConfig
      value={{
        fetcher: url =>
          fetcher(url, {
            headers: {
              ...(typeof window !== 'undefined'
                ? { Authorization: `Bearer ${window.sessionStorage.getItem('token')}` }
                : {}),
            },
          }),
      }}
    >
      {children}
    </SWRConfig>
  );
};
export default ContextWrapper;
