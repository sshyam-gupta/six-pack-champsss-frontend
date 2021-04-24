import { Box, Container } from '@chakra-ui/layout';
import { Footer } from '../Footer';
import Header from '../Header';
import Sidebar from '../Sidebar';
import PageTransition from './PageTransition';

const PageContainer = props => {
  return (
    <>
      <Header />
      <Container maxW="container.xl" as="main" className="main-content" p="0">
        <Box display={['block', 'block', 'flex']}>
          <Sidebar />
          <Box flex={1} h="calc(100vh - 5rem)" overflow="auto">
            <Box id="content" px={5} mt="3rem" mx="auto" maxW="auto" minH="70vh" {...props}>
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
