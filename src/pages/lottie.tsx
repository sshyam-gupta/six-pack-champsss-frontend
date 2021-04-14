import UncontrolledLottie from '../components/lottie/UncontrolledLottie';
import { Flex, Stack, Text } from '@chakra-ui/layout';
import { useColorMode } from '@chakra-ui/color-mode';
import { AiOutlineGoogle } from 'react-icons/ai';

import animationData from '../public/lotties/24393-online-work.json';
import { Button } from '@chakra-ui/button';

function LottiePage() {
  const { colorMode } = useColorMode();

  return (
    <Flex
      height="100vh"
      justify="space-between"
      flexDirection={['column-reverse', 'column-reverse', 'column-reverse', 'row']}
      position="relative"
    >
      <Flex flex={3} justify="center" alignItems="center" p={['1rem', null, '2rem']}>
        <UncontrolledLottie options={{ animationData: animationData }} />
      </Flex>
      <Flex
        flexDirection="column"
        p="1rem"
        flex={2}
        h="100%"
        bg={`mode.${colorMode}.secondaryBg`}
        textAlign="center"
        alignItems="center"
        pt={['5rem', null, '8rem']}
      >
        <Stack>
          <Text fontSize="lg">Six Pack Champsss</Text>
          <Text fontSize="xs" as="i">
            Presents
          </Text>
          <Text fontSize="4xl" fontFamily="Comfortaa">
            Kiprosh Laureate Awards Portal
          </Text>
        </Stack>

        <Button mt="2rem" leftIcon={<AiOutlineGoogle />}>
          Login with Google
        </Button>
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
}

export default LottiePage;
