import { useColorMode } from '@chakra-ui/color-mode';
import { Flex } from '@chakra-ui/layout';
import Image from 'next/image';

function Logo() {
  const { colorMode } = useColorMode();
  return (
    <Flex alignItems="center" overflow="hidden">
      <Image
        src={colorMode === 'dark' ? '/images/logo-white.png' : '/images/logo-black.png'}
        height={60}
        width={200}
        layout="fixed"
        alt="Logo"
      />
    </Flex>
  );
}

export default Logo;
