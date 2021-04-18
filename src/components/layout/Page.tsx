import { Box } from '@chakra-ui/layout';
import { Container } from 'next/app';
import { Footer } from '../Footer';
import Header from '../Header';
import PageTransition from './PageTransition';

const Page = ({ ...props }) => {
  return (
    <>
      <Header />
      <Container as="main" className="main-content">
        <Box display={{ base: 'block', md: 'flex' }}>
          {/* {sidebar || null} */}
          <div style={{ flex: 1 }}>
            <Box
              id="content"
              // pt={3}
              px={5}
              mt="4.5rem"
              mx="auto"
              maxW="48rem"
              minH="76vh"
            >
              <PageTransition>{props.children}</PageTransition>
            </Box>
            <Footer />
          </div>
        </Box>
      </Container>
    </>
  );
};

export default Page;
