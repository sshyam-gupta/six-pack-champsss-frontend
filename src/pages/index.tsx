import { Box } from '@chakra-ui/layout';
import LoginRequired from '../components/PrivateRoute/LoginRequired';
import SelectComponent from '../components/shared/Select';
import PageContainer from '../components/layout/PageContainer';
const Index = () => {
  return (
    <LoginRequired>
      <PageContainer>
        <Box w="24rem" mt="1rem">
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
      </PageContainer>
    </LoginRequired>
  );
};

export default Index;
