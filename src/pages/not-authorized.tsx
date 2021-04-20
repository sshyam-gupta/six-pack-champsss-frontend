import Link from 'next/link';
import { Flex, Stack, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import UncontrolledLottie from '../components/lottie/UncontrolledLottie';
import animationData from '../public/lotties/33049-binoculars.json';
const OutsideOrganization = () => {
  return (
    <Flex
      height="100vh"
      justify="space-between"
      flexDirection={['column', 'column', 'column', 'row-reverse']}
      position="relative"
      alignItems="center"
      overflowY="hidden"
    >
      <Stack flex={1} p="2rem">
        <Text fontSize="4xl" fontFamily="Comfortaa">
          You are not authorize to access this application
        </Text>
        <Link href="/signin">
          <Button variant="link">Try Again</Button>
        </Link>
      </Stack>

      <Flex flex={3} justify="center" alignItems="center" maxW={['100%', '60%', '40%', '60%']}>
        <UncontrolledLottie options={{ animationData: animationData }} />
      </Flex>
      <Flex position="absolute" bottom="0" left="0" right="0" transform="rotate(180deg)" zIndex="-1">
        <svg viewBox="0 0 1440 200">
          <path
            fill="rgba(55, 59, 66, 1)"
            d="M 0 25 C 292.40000000000003 25 438.59999999999997 110 731 110 L 731 110 L 731 0 L 0 0 Z"
            strokeWidth="0"
          />
          <path
            fill="rgba(55, 59, 66, 1)"
            d="M 730 110 C 1014 110 1156 58 1440 58 L 1440 58 L 1440 0 L 730 0 Z"
            strokeWidth="0"
          />
        </svg>
      </Flex>
    </Flex>
  );
};
export default OutsideOrganization;
