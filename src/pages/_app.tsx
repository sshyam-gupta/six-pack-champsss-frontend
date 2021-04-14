import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'next-auth/client';
import theme from '../theme';
import { AppProps } from 'next/app';
import Page from '../components/layout/Page';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <ChakraProvider resetCSS theme={theme}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
