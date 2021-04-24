import LoginRequired from '../components/layout/LoginRequired';
import PageContainer from '../components/layout/PageContainer';
import * as AppData from '../constants/app.json';
import { Grid, GridItem, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/color-mode';
import getGreetings from '../util/greetings';
import { useSession } from 'next-auth/client';
import DashboardBox from '../components/dashboard/DashboardBox';
import DashboardChart from '../components/dashboard/DashboardChart';
import { AvailableIcon, RedeemedIcon } from '../components/lottie/PlaceholderIcons';

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

  return (
    <LoginRequired>
      <PageContainer maxW="auto">
        <Heading fontFamily="Comfortaa">{`${getGreetings()}, ${
          session?.user?.name.split(' ')?.[0] ?? 'User'
        }`}</Heading>
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
                />
                <DashboardBox
                  bg={useColorModeValue('green.50', 'green.900')}
                  color={useColorModeValue('green.500', 'green.400')}
                  value={5000}
                  title={`Redeemed ${AppData.points}`}
                  icon={<RedeemedIcon px="3rem" py="2rem" />}
                />
              </SimpleGrid>
            </GridItem>
            <GridItem colSpan={[3, 2]}>
              <DashboardChart bg={useColorModeValue('orange.50', 'orange.800')} title="Chart" />
            </GridItem>
          </Grid>
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
