import LoginRequired from '../components/layout/LoginRequired';
import PageContainer from '../components/layout/PageContainer';
import { Stat, StatLabel, StatNumber } from '@chakra-ui/stat';
import * as AppData from '../constants/app.json';
import { Box, Grid, GridItem, Heading, SimpleGrid, Stack } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/color-mode';
import NumberFormatter from '../components/NumberFormatter';
import getGreetings from '../util/greetings';
import { useSession } from 'next-auth/client';

const Index = () => {
  const [session] = useSession();

  return (
    <LoginRequired>
      <PageContainer maxW="auto">
        <Heading fontFamily="Comfortaa">{`${getGreetings()}, ${
          session?.user?.name.split(' ')?.[0] ?? 'User'
        }`}</Heading>
        <Stack mt="2rem">
          <Grid templateColumns="repeat(6, 1fr)" gap={4}>
            <GridItem colSpan={[3, 4]}>
              <SimpleGrid columns={{ sm: 1, md: 2 }} gridGap="1rem">
                <Box p="1rem" borderRadius="md" boxShadow="md" bg={useColorModeValue('cyan.50', 'cyan.900')}>
                  <Stat>
                    <StatLabel fontSize="md">{`Available ${AppData.points}`}</StatLabel>
                    <StatNumber fontSize="4xl" color={useColorModeValue('cyan.500', 'cyan.400')}>
                      <NumberFormatter value={2000} />
                    </StatNumber>
                  </Stat>
                </Box>
                <Box p="1rem" borderRadius="md" boxShadow="md" bg={useColorModeValue('green.50', 'green.900')}>
                  <Stat>
                    <StatLabel fontSize="md">{`Claimed ${AppData.points}`}</StatLabel>
                    <StatNumber fontSize="4xl" color={useColorModeValue('green.500', 'green.400')}>
                      <NumberFormatter value={5000} />
                    </StatNumber>
                  </Stat>
                </Box>
              </SimpleGrid>
            </GridItem>
            <GridItem colSpan={[3, 2]} bg={useColorModeValue('orange.50', 'orange.800')} borderRadius="md" p="1rem">
              Chart
            </GridItem>
          </Grid>
        </Stack>
      </PageContainer>
    </LoginRequired>
  );
};

export default Index;
