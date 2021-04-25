import { Box, Container, Heading } from '@chakra-ui/layout';
import { useRef, useState, useLayoutEffect, useCallback } from 'react';
import { Footer } from '../Footer';
import Header from '../Header';
import Sidebar from '../Sidebar';
import PageTransition from './PageTransition';
import debounce from 'lodash/debounce';

const PageContainer = props => {
  const scrollBodyRef = useRef(null);

  const [isHeaderHidden, setHeaderHidden] = useState(false);

  const onScroll = useCallback(e => {
    setHeaderHidden(e.target.scrollTop > 80);
  }, []);

  const debouncedScroll = debounce(onScroll, 100);

  useLayoutEffect(() => {
    scrollBodyRef?.current?.addEventListener('scroll', debouncedScroll);

    return () => scrollBodyRef?.current?.removeEventListener('scroll', debouncedScroll);
  }, []);

  return (
    <>
      <Header title={isHeaderHidden ? props.pageTitle : ''} />
      <Container maxW="container.xl" as="main" className="main-content" p="0">
        <Box display={['block', 'block', 'flex']}>
          <Sidebar />
          <Box flex={1} h="calc(100vh - 5rem)" overflow="auto" ref={scrollBodyRef}>
            <Box
              id="content"
              px={5}
              mt={['2rem', '2rem', '3rem']}
              mx="auto"
              maxW="auto"
              minH="70vh"
              position="relative"
              {...props}
            >
              <PageTransition>
                {props.pageTitle ? <Heading fontFamily="Comfortaa">{props.pageTitle}</Heading> : null}
                {props.children}
              </PageTransition>
            </Box>
            <Footer />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default PageContainer;
