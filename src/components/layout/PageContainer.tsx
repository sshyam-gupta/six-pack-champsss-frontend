import { Box, Container } from '@chakra-ui/layout';
import { Footer } from '../Footer';
import Header from '../Header';
import Sidebar from '../Sidebar';
import PageTransition from './PageTransition';

const PageContainer = ({ ...props }) => {
  return (
    <>
      <Header />
      <Container maxW="container.xl" as="main" className="main-content" h="calc(100vh - 6rem)">
        <Box display={['block', 'block', 'flex']} h="100%">
          <Sidebar />
          <Box flex={1} overflow="auto" h="100%">
            <Box id="content" px={5} mt="4.5rem" mx="auto" maxW="48rem" minH="60vh">
              <PageTransition>{props.children}</PageTransition>
            </Box>
            <Footer />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default PageContainer;
