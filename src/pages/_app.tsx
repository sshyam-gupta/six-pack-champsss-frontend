import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'next-auth/client';
import theme from '../theme';
import { DefaultSeo } from 'next-seo';
import dayjs from 'dayjs';

import { AppProps } from 'next/app';
import siteConfig from '../constants/site-config';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import RouteLoadingIndicator from '../components/RouteLoadingIndicator';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import ContextWrapper from '../components/ContextWrapper';

dayjs.extend(localizedFormat);

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [state, setState] = useState({
    isRouteChanging: false,
    loadingKey: 0,
  });
  const [session, setSession] = useState(pageProps.session);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setState(prevState => ({
        ...prevState,
        isRouteChanging: true,
        loadingKey: prevState.loadingKey ^ 1,
      }));
    };

    const handleRouteChangeEnd = () => {
      setState(prevState => ({
        ...prevState,
        isRouteChanging: false,
      }));
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeEnd);
    router.events.on('routeChangeError', handleRouteChangeEnd);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeEnd);
      router.events.off('routeChangeError', handleRouteChangeEnd);
    };
  }, [router.events]);

  return (
    <>
      <RouteLoadingIndicator isRouteChanging={state.isRouteChanging} />
      <Provider
        options={{
          clientMaxAge: 60,
          keepAlive: 5 * 60,
        }}
        session={pageProps.session}
      >
        <ChakraProvider resetCSS theme={theme}>
          <DefaultSeo {...siteConfig.seo} />
          <ContextWrapper>
            <Component {...pageProps} session={session} updateSession={setSession} />
          </ContextWrapper>
        </ChakraProvider>
      </Provider>
    </>
  );
}

export default MyApp;
