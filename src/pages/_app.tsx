import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'next-auth/client';
import theme from '../theme';
import { DefaultSeo } from 'next-seo';

import { AppProps } from 'next/app';
import siteConfig from '../constants/site-config';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <ChakraProvider resetCSS theme={theme}>
        <DefaultSeo {...siteConfig.seo} />
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
