import LoginRequired from '../components/layout/LoginRequired';
import PageContainer from '../components/layout/PageContainer';
import * as AppData from '../constants/app.json';
import { Grid, GridItem, SimpleGrid, Stack, Text } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/color-mode';
import getGreetings from '../util/greetings';
import { getSession, useSession } from 'next-auth/client';
import DashboardBox from '../components/dashboard/DashboardBox';
import DashboardChart from '../components/dashboard/DashboardChart';
import { AvailableIcon, RedeemedIcon } from '../components/lottie/PlaceholderIcons';
import Activities from '../components/Activities';
import { useToast } from '@chakra-ui/toast';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Session } from 'next-auth';
import { useDisclosure } from '@chakra-ui/hooks';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogCloseButton,
} from '@chakra-ui/modal';
import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import RedeemService from '../services/redeem/redeem';

type HomeProps = {
  quotes?: {
    content: string;
    authorSlug: string;
    length: number;
    author: string;
    tags: string[];
  };
};

const Dashboard = (props: HomeProps) => {
  const [data] = useSession();
  const [session, setSession] = useState<Session | null>(data);
  const toast = useToast();
  const cancelRef = useRef();
  const [pointsToRedeem, setPointsToRedeem] = useState<number>();
  const klapsCountDialogDisclosure = useDisclosure();
  const klapsConfirmationDialogDisclosure = useDisclosure();
  const [isRedeeming, setIsRedeeming] = useState(false);

  useEffect(() => {
    async function getUser() {
      const response = await getSession();
      setSession(response);
    }
    getUser();
  }, []);

  // @ts-ignore
  const points = session?.points;
  const initiateRedeem = useCallback(() => {
    if (pointsToRedeem > points?.available_points || pointsToRedeem <= AppData['min-points-to-redeem'] - 1) {
      toast({
        description: `You can redeem ${AppData.points} between ${AppData['min-points-to-redeem']} - ${points?.available_points}`,
        status: 'error',
        isClosable: true,
        position: 'top',
      });
    } else {
      klapsCountDialogDisclosure.onClose();
      klapsConfirmationDialogDisclosure.onOpen();
    }
  }, [pointsToRedeem, klapsConfirmationDialogDisclosure, klapsCountDialogDisclosure, points, toast]);

  const confirmRedeem = useCallback(async () => {
    setIsRedeeming(true);
    const payload = {
      redeem_request: {
        points: pointsToRedeem,
      },
    };
    const { error } = await RedeemService.redeemKlaps(payload);
    setIsRedeeming(false);
    if (error) {
      toast({
        description: error,
        status: 'error',
        isClosable: true,
        position: 'top',
      });
      return;
    }
    setSession({
      ...session,
      //@ts-ignore
      points: { ...session.points, available_points: points.available_points - pointsToRedeem },
    });
    toast({
      description: `Redeemed ${pointsToRedeem} ${AppData.points} successfully, you will receive reward in 3-4 working days.`,
      variant: 'top-accent',
      isClosable: true,
      position: 'top',
    });
    klapsConfirmationDialogDisclosure.onClose();
  }, [toast, klapsConfirmationDialogDisclosure, session, points, pointsToRedeem]);

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
                  value={points?.available_points ?? 0}
                  title={`Available ${AppData.points}`}
                  icon={<AvailableIcon px="3rem" py="2rem" />}
                  onRedeem={
                    points?.available_points >= AppData['min-points-to-redeem'] && klapsCountDialogDisclosure.onOpen
                  }
                />
                <DashboardBox
                  bg={useColorModeValue('green.50', 'green.900')}
                  color={useColorModeValue('green.500', 'green.400')}
                  value={points?.redeemed_points ?? 0}
                  title={`Redeemed ${AppData.points}`}
                  icon={<RedeemedIcon transform="scaleX(-1)" px="3rem" py="2rem" />}
                />
              </SimpleGrid>
            </GridItem>
            {points?.projects?.length ? (
              <GridItem colSpan={[3, 2]}>
                <DashboardChart
                  bg={useColorModeValue('purple.50', 'purple.800')}
                  data={points?.projects.map(project => ({
                    id: project.name,
                    label: project.name,
                    value: project.total_points,
                  }))}
                />
              </GridItem>
            ) : null}
          </Grid>
        </Stack>
        <Stack mt="2rem">
          <Activities />
        </Stack>
      </PageContainer>
      <AlertDialog
        isCentered
        isOpen={klapsCountDialogDisclosure.isOpen}
        leastDestructiveRef={cancelRef}
        onClose={klapsCountDialogDisclosure.onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Enter {AppData.points} to Redeem
              <AlertDialogCloseButton />
            </AlertDialogHeader>

            <AlertDialogBody>
              <Input
                placeholder={`Enter ${AppData.points} to Redeem`}
                value={pointsToRedeem}
                onChange={({ target: { value } }) => setPointsToRedeem(parseInt(value))}
                type="number"
                min={AppData['min-points-to-redeem']}
                max={points?.available_points ?? 0}
              />
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={klapsCountDialogDisclosure.onClose} variant="ghost">
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={initiateRedeem}
                ml={3}
                disabled={!pointsToRedeem || pointsToRedeem > points?.available_points}
              >
                Redeem
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <AlertDialog
        isCentered
        isOpen={klapsConfirmationDialogDisclosure.isOpen}
        leastDestructiveRef={cancelRef}
        onClose={klapsConfirmationDialogDisclosure.onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Redeem {AppData.points}
              <AlertDialogCloseButton />
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text fontSize="2xl">
                Redeem {pointsToRedeem} {AppData.points}
              </Text>
              <Text fontSize="md">
                Are you sure you want to redeem {pointsToRedeem} {AppData.points} ?
              </Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => {
                  klapsConfirmationDialogDisclosure.onClose();
                  klapsCountDialogDisclosure.onOpen();
                }}
                variant="ghost"
                disabled={isRedeeming}
              >
                Back
              </Button>
              <Button isLoading={isRedeeming} colorScheme="red" onClick={confirmRedeem} ml={3}>
                Redeem
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
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

export default Dashboard;
