import { Avatar } from '@chakra-ui/avatar';
import { IconButton } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Text, HStack, Spacer } from '@chakra-ui/layout';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { StaggeredStackItem } from '../motion/StaggeredStack';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';

export type User = {
  id: string;
  createdAt: string;
  name: string;
  image: string;
  role: 5;
};

function UserItem(props: User) {
  const bg = useColorModeValue('gray.50', 'gray.700');

  return (
    <StaggeredStackItem boxShadow="md" borderRadius="md" background={bg} p="1rem" position="relative">
      <HStack spacing={4}>
        <Avatar size="sm" src={props.image} alt={props.name} />
        <Text>{props.name}</Text>
        <Spacer />
        <Menu>
          <MenuButton as={IconButton} aria-label="Options" icon={<BiDotsVerticalRounded />} variant="ghost" />
          <MenuList p={0} minWidth="4rem">
            <MenuItem icon={<AiOutlineDelete />}>Delete</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </StaggeredStackItem>
  );
}

export default UserItem;
