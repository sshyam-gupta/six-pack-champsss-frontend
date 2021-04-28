import { Avatar } from '@chakra-ui/avatar';
import { IconButton } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Text, HStack, Spacer, Flex, Stack } from '@chakra-ui/layout';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { StaggeredStackItem } from '../motion/StaggeredStack';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import SelectComponent from '../Select';
import { useToast } from '@chakra-ui/toast';
import sleep from '../../util/sleep';
import { useDisclosure } from '@chakra-ui/hooks';
import UserService from '../../services/user/user';

export enum UserRole {
  Owner = 'owner',
  Admin = 'admin',
  Associate = 'associate',
}

export type User = {
  id: string;
  createdAt: string;
  name: string;
  image: string;
  role: UserRole;
  email?: string;
};

function UserItem(props: User) {
  const bg = useColorModeValue('gray.50', 'gray.700');
  const toast = useToast();
  const isLoaderDisclaimer = useDisclosure();

  const onChange = async val => {
    console.log(props);
    const reqData = {
      user_id: props.id,
      user: {
        role: val.value,
      },
    };
    isLoaderDisclaimer.onOpen();
    const { status } = await UserService.assignRole(reqData);
    isLoaderDisclaimer.onClose();
    if (status !== 200) {
      toast({
        description: 'Something went wrong',
        variant: 'top-accent',
        status: 'error',
        isClosable: true,
        position: 'top',
      });
      return;
    }
    toast({
      description: `User ${props.name} is now an ${val.value}`,
      variant: 'top-accent',
      status: 'success',
      isClosable: true,
      position: 'top',
    });
  };

  return (
    <StaggeredStackItem boxShadow="md" borderRadius="md" background={bg} p="1rem" position="relative">
      <Flex flexDirection={['column', 'column', 'row']} alignItems={['flex-start', 'flex-start', 'center']}>
        <HStack spacing={4}>
          <Avatar size="sm" src={props.image} alt={props.name} />
          <Stack spacing={0}>
            <Text>{props.name}</Text>
            <Text fontSize="sm">{props.email}</Text>
          </Stack>
        </HStack>
        <Spacer />
        <HStack mt={['1rem', '1rem', 0]}>
          <Flex width="10rem">
            <SelectComponent
              isLoading={isLoaderDisclaimer.isOpen}
              onChange={onChange}
              isClearable={false}
              defaultValue={
                props.role === UserRole.Associate
                  ? { label: 'Associate', value: UserRole.Associate }
                  : { label: 'Admin', value: UserRole.Admin }
              }
              options={[
                { label: 'Admin', value: UserRole.Admin },
                { label: 'Associate', value: UserRole.Associate },
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
