import SidebarLink from './SidebarLink';
import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/avatar';
import { useSession } from 'next-auth/client';

const Sidebar = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [session] = useSession();

  return (
    <Box
      ref={ref}
      as="nav"
      aria-label="Main Navigation"
      pos="sticky"
      sx={{
        overscrollBehavior: 'contain',
      }}
      top="4rem"
      w="280px"
      alignSelf="self-start"
      pr="8"
      pb="6"
      pl="3"
      pt="4"
      overflowY="auto"
      flexShrink={0}
      display={['none', 'none', 'block']}
    >
      <VStack py="1rem">
        <Avatar size="xl" name={session?.user.name} src={session?.user.image} />
        <Text size="xl">{session?.user.name ?? 'User'}</Text>
      </VStack>
      <SidebarContent />
    </Box>
  );
};

export function SidebarContent() {
  return (
    <>
      <SidebarLink ml="-3" mt="2" href="/">
        Dashboard
      </SidebarLink>
      <SidebarLink ml="-3" mt="2" href="/projects">
        Projects
      </SidebarLink>
      <SidebarLink ml="-3" mt="2" href="/requests">
        Requests
      </SidebarLink>
      <SidebarLink ml="-3" mt="2" href="/users">
        Users
      </SidebarLink>
      <SidebarLink ml="-3" mt="2" href="/profile">
        Profile
      </SidebarLink>
    </>
  );
}

export default Sidebar;
