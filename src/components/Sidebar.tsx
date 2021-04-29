import SidebarLink from './SidebarLink';
import React from 'react';
import { Box } from '@chakra-ui/layout';
import { useUser } from '../hooks/use-user';

const Sidebar = () => {
  const ref = React.useRef<HTMLDivElement>(null);

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
      h="calc(100vh - 5rem)"
      overflow="auto"
      display={['none', 'none', 'block']}
    >
      <SidebarContent />
    </Box>
  );
};

export function SidebarContent() {
  const { isAdmin } = useUser();

  return (
    <>
      <SidebarLink ml="-3" mt="2" href="/">
        Dashboard
      </SidebarLink>
      <SidebarLink ml="-3" mt="2" href="/projects">
        Projects
      </SidebarLink>
      {isAdmin ? (
        <SidebarLink ml="-3" mt="2" href="/requests">
          Requests
        </SidebarLink>
      ) : null}
      {isAdmin ? (
        <SidebarLink ml="-3" mt="2" href="/redemptions">
          Redemptions
        </SidebarLink>
      ) : null}
      {isAdmin ? (
        <SidebarLink ml="-3" mt="2" href="/users">
          Users
        </SidebarLink>
      ) : null}
    </>
  );
}

export default Sidebar;
