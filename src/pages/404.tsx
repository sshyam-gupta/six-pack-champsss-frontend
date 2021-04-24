import { Text } from '@chakra-ui/layout';
import PageContainer from '../components/layout/PageContainer';
import UncontrolledLottie from '../components/lottie/UncontrolledLottie';
import animationData from '../../public/lotties/not-found.json';
import LoginRequired from '../components/layout/LoginRequired';

function NotFound() {
  return (
    <LoginRequired>
      <PageContainer maxW="48rem">
        <UncontrolledLottie height={300} width={300} options={{ animationData: animationData }} />
        <Text fontSize="xl" textAlign="center" fontFamily="Comfortaa">
          Page not found
        </Text>
      </PageContainer>
    </LoginRequired>
  );
}

export default NotFound;
