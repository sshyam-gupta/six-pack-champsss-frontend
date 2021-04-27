import NextLink from 'next/link';
import { signOut, useSession } from 'next-auth/client';
import { DarkModeSwitch as ThemeSwitcher } from 'react-toggle-dark-mode';

import {
  useColorMode,
  chakra,
  useColorModeValue,
  useDisclosure,
  Flex,
  Box,
  Stack,
  Heading,
  Menu,
  MenuButton,
  Center,
  Avatar,
  MenuList,
  MenuItem,
  Button,
  CloseButton,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { MobileNavButton, MobileNavContent } from './MobileNav';
import Logo from './Logo';
import { IoMdLogOut } from 'react-icons/io';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { CgProfile } from 'react-icons/cg';
import { useRouter } from 'next/router';
import { AiOutlineMenu } from 'react-icons/ai';

const Header = props => {
  const bg = useColorModeValue('white', 'gray.800');
  const ref = useRef<HTMLHeadingElement>();

  return (
    <chakra.header
      ref={ref}
      transition="box-shadow 0.2s, background-color 0.2s"
      pos="sticky"
      top="0"
      zIndex="3"
      bg={bg}
      left="0"
      right="0"
      width="full"
      boxShadow="md"
      {...props}
    >
      <chakra.div height="5rem" mx="auto" maxW="container.xl">
        <HeaderContent title={props.title} />
      </chakra.div>
    </chakra.header>
  );
};

function HeaderContent(props: { title: string }) {
  const mobileNav = useDisclosure();
  const [session] = useSession();
  const router = useRouter();
  const color = useColorModeValue('black', 'white');

  return (
    <>
      <Flex w="100%" h="100%" align="center" px="1rem">
        <Flex align="center" w="280px" display={['none', 'none', 'flex']}>
          <NextLink href="/" passHref>
            <chakra.a display="block" aria-label="Chakra UI, Back to homepage">
              <Box minW="8rem">
                <Logo />
              </Box>
            </chakra.a>
          </NextLink>
        </Flex>
        <MobileNavButton
          aria-label="Toggle Menu"
          onClick={mobileNav.onToggle}
          icon={!mobileNav.isOpen ? <AiOutlineMenu /> : <CloseButton />}
        />
        <Stack display={['none', 'none', 'block']}>
          <AnimatePresence>
            {props.title ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
                <Heading fontFamily="Comfortaa">{props.title}</Heading>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </Stack>

        <Stack flex={1} isInline justify="flex-end" w="100%" spacing={4} align="center" color="gray.400">
          <DarkModeSwitch />
          <Menu isLazy placement="bottom-end">
            <MenuButton as={Button} variant="ghost" rightIcon={<ChevronDownIcon />} fontSize="xl">
              <Center>
                <Avatar size="sm" name={session?.user.name || 'User'} src={session?.user.image} />
              </Center>
            </MenuButton>
            <MenuList p={0} minW="10rem" color={color}>
              <MenuItem icon={<CgProfile fontSize="1rem" />} onClick={() => router.push('/profile')}>
                My Profile
              </MenuItem>
              <MenuItem icon={<IoMdLogOut fontSize="1rem" />} onClick={() => void signOut()}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      </Flex>
      <MobileNavContent isOpen={mobileNav.isOpen} onClose={mobileNav.onClose} />
    </>
  );
}

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  return <ThemeSwitcher size={30} checked={isDark} onChange={toggleColorMode} />;
};

export default Header;
