import { Box } from '@chakra-ui/layout';
import LoginRequired from '../components/PrivateRoute/LoginRequired';

const Index = () => {
  return (
    <LoginRequired>
      <Box>Protected</Box>
    </LoginRequired>
  );
};

export default Index;
