import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'next-auth/client';
import theme from '../theme';
import { NextSeo } from 'next-seo';

import { AppProps } from 'next/app';
import Page from '../components/layout/Page';
import siteConfig from '../constants/site-config';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <ChakraProvider resetCSS theme={theme}>
        <NextSeo {...siteConfig.seo} />
        <Page>
          <Component {...pageProps} />
        </Page>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
