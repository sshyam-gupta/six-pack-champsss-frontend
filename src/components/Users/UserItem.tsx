import { Avatar } from '@chakra-ui/avatar';
import { IconButton } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Text, HStack, Spacer, Flex } from '@chakra-ui/layout';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { StaggeredStackItem } from '../motion/StaggeredStack';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import SelectComponent from '../Select';
import { useToast } from '@chakra-ui/toast';
import sleep from '../../util/sleep';
import { useDisclosure } from '@chakra-ui/hooks';

export type User = {
  id: string;
  createdAt: string;
  name: string;
  image: string;
  role: number;
  email?: string;
};

function UserItem(props: User) {
  const bg = useColorModeValue('gray.50', 'gray.700');
  const toast = useToast();
  const isLoaderDisclaimer = useDisclosure();

  return (
    <StaggeredStackItem boxShadow="md" borderRadius="md" background={bg} p="1rem" position="relative">
      <Flex flexDirection={['column', 'column', 'row']} alignItems={['flex-start', 'flex-start', 'center']}>
        <HStack spacing={4}>
          <Avatar size="sm" src={props.image} alt={props.name} />
          <Text>{props.name}</Text>
        </HStack>
        <Spacer />
        <HStack mt={['1rem', '1rem', 0]}>
          <Flex width="10rem">
            <SelectComponent
              isLoading={isLoaderDisclaimer.isOpen}
              onChange={async val => {
                if (val.value === props.role) return;
                isLoaderDisclaimer.onOpen();
                await sleep();
                isLoaderDisclaimer.onClose();
                toast({
                  description: `Updated ${props.name}'s role to ${val.label}`,
                  variant: 'top-accent',
                  status: 'success',
                  isClosable: true,
                  position: 'top',
                });
              }}
              isClearable={false}
              defaultValue={props.role === 1 ? { label: 'Admin', value: 1 } : { label: 'Member', value: 2 }}
              options={[
                { label: 'Admin', value: 1 },
                { label: 'Member', value: 2 },
              ]}
            />
          </Flex>
          <Menu>
            <MenuButton as={IconButton} aria-label="Options" icon={<BiDotsVerticalRounded />} variant="ghost" />
            <MenuList p={0} minWidth="4rem">
              <MenuItem icon={<AiOutlineDelete />}>Delete</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </StaggeredStackItem>
  );
}

export default UserItem;
