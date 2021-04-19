import SidebarLink from './SidebarLink';
import React from 'react';
import { Box } from '@chakra-ui/layout';

export function SidebarContent() {
  return (
    <>
      <SidebarLink ml="-3" mt="2" href="/">
        Dashboard
      </SidebarLink>
      <SidebarLink ml="-3" mt="2" href="/profile">
        Profile
      </SidebarLink>
      <SidebarLink ml="-3" mt="2" href="/projects">
        Projects
      </SidebarLink>
      <SidebarLink ml="-3" mt="2" href="/settings">
        Settings
      </SidebarLink>
    </>
  );
}

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
      top="6.5rem"
      w="280px"
      h="calc(((100vh - 1.5rem) - 64px) - 42px);"
      pr="8"
      pb="6"
      pl="3"
      pt="4"
      overflowY="auto"
      className="sidebar-content"
      flexShrink={0}
      display={['none', 'none', 'block']}
    >
      <SidebarContent />
    </Box>
  );
};

export default Sidebar;
