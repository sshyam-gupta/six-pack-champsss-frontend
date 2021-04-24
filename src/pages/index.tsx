import LoginRequired from '../components/layout/LoginRequired';
import PageContainer from '../components/layout/PageContainer';
import * as AppData from '../constants/app.json';
import { Grid, GridItem, SimpleGrid, Stack, Text } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/color-mode';
import getGreetings from '../util/greetings';
import { useSession } from 'next-auth/client';
import DashboardBox from '../components/dashboard/DashboardBox';
import DashboardChart from '../components/dashboard/DashboardChart';
import { AvailableIcon, RedeemedIcon } from '../components/lottie/PlaceholderIcons';
import Activities from '../components/Activities';
import { useToast } from '@chakra-ui/toast';

type HomeProps = {
  quotes?: {
    content: string;
    authorSlug: string;
    length: number;
    author: string;
    tags: string[];
  };
};

const Index = (props: HomeProps) => {
  const [session] = useSession();
  const toast = useToast();

  return (
    <LoginRequired>
      <PageContainer pageTitle={`${getGreetings()}, ${session?.user?.name.split(' ')?.[0] ?? 'User'}`}>
        {props.quotes ? (
          <Stack isInline mt="0.5rem">
            <Text>
              <em>{`"${props.quotes.content}"`}</em>
              <b> -{props.quotes.author}</b>
            </Text>
          </Stack>
        ) : null}
        <Stack mt="2rem">
          <Grid templateColumns="repeat(6, 1fr)" gap={4}>
            <GridItem colSpan={[3, 4]}>
              <SimpleGrid columns={{ sm: 1, md: 2 }} gridGap="1rem" h="100%">
                <DashboardBox
                  bg={useColorModeValue('cyan.50', 'cyan.900')}
                  color={useColorModeValue('cyan.500', 'cyan.400')}
                  value={2000}
                  title={`Available ${AppData.points}`}
                  icon={<AvailableIcon px="3rem" py="2rem" />}
                  onRedeem={() => {
                    toast({
                      description: 'Redeeming in process',
                      variant: 'top-accent',
                      isClosable: true,
                      position: 'top',
                    });
                  }}
                />
                <DashboardBox
                  bg={useColorModeValue('green.50', 'green.900')}
                  color={useColorModeValue('green.500', 'green.400')}
                  value={5000}
                  title={`Redeemed ${AppData.points}`}
                  icon={<RedeemedIcon transform="scaleX(-1)" px="3rem" py="2rem" />}
                />
              </SimpleGrid>
            </GridItem>
            <GridItem colSpan={[3, 2]}>
              <DashboardChart bg={useColorModeValue('purple.50', 'purple.800')} title="Chart" />
            </GridItem>
          </Grid>
        </Stack>
        <Stack mt="2rem">
          <Activities />
        </Stack>
      </PageContainer>
    </LoginRequired>
  );
};

export async function getStaticProps() {
  const res = await fetch(`https://api.quotable.io/random?maxLength=100&tags=technology|famous-quotes|inspirational`);
  const data = await res.json();

  return {
    props: { quotes: data ?? {} },
  };
}

export default Index;
