import NextLink from 'next/link';
import { signOut } from 'next-auth/client';
import { DarkModeSwitch as ThemeSwitcher } from 'react-toggle-dark-mode';

import {
  useColorMode,
  Switch,
  chakra,
  useColorModeValue,
  useDisclosure,
  useUpdateEffect,
  Flex,
  Box,
  Stack,
} from '@chakra-ui/react';
import { useViewportScroll } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { MobileNavButton, MobileNavContent } from './MobileNav';

const Header = props => {
  const bg = useColorModeValue('white', 'gray.800');
  const ref = useRef<HTMLHeadingElement>();
  const [y, setY] = useState(0);
  const { height = 0 } = ref.current?.getBoundingClientRect() ?? {};

  const { scrollY } = useViewportScroll();
  useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);

  return (
    <chakra.header
      ref={ref}
      shadow={y > height ? 'sm' : undefined}
      transition="box-shadow 0.2s, background-color 0.2s"
      pos="sticky"
      top="0"
      zIndex="3"
      bg={bg}
      left="0"
      right="0"
      width="full"
      {...props}
    >
      <chakra.div height="4.5rem" mx="auto" maxW="1200px">
        <HeaderContent />
      </chakra.div>
    </chakra.header>
  );
};

function HeaderContent() {
  const mobileNav = useDisclosure();
  const isDarkMode = useDisclosure();

  const mobileNavBtnRef = useRef<HTMLButtonElement>();

  useUpdateEffect(() => {
    mobileNavBtnRef.current?.focus();
  }, [mobileNav.isOpen]);

  return (
    <>
      <Flex w="100%" h="100%" px="6" align="center" justify="space-between">
        <Flex align="center">
          <NextLink href="/" passHref>
            <chakra.a display="block" aria-label="Chakra UI, Back to homepage">
              <Box minW="4rem" fontSize="xl">
                Logo
              </Box>
            </chakra.a>
          </NextLink>
        </Flex>

        <Stack isInline justify="flex-end" w="100%" maxW="824px" spacing={4} align="center" color="gray.400">
          <a
            href={`/api/auth/signout`}
            onClick={e => {
              e.preventDefault();
              signOut();
            }}
          >
            Sign out
          </a>
          <MobileNavButton ref={mobileNavBtnRef} aria-label="Open Menu" onClick={mobileNav.onOpen} />
          <DarkModeSwitch />
        </Stack>
      </Flex>
      <MobileNavContent isOpen={mobileNav.isOpen} onClose={mobileNav.onClose} />
    </>
  );
}

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  return <ThemeSwitcher size={40} checked={isDark} onChange={toggleColorMode} />;
};

export default Header;
