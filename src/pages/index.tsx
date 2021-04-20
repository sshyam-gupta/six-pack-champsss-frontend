import { Box } from '@chakra-ui/layout';
import LoginRequired from '../components/PrivateRoute/LoginRequired';
import SelectComponent from '../components/shared/Select';

const Index = () => {
  return (
    <LoginRequired>
      <Box>Protected</Box>
      <Box w="24rem" mt="1rem" p="2rem">
        <SelectComponent
          options={[
            { label: 'Shyam', value: '11' },
            { label: 'Shubham', value: '12' },
            { label: 'Prayesh', value: '13' },
            { label: 'Supriya', value: '14' },
            { label: 'Athira', value: '15' },
          ]}
        />
      </Box>
    </LoginRequired>
  );
};

export default Index;
