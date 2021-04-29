import { Avatar } from '@chakra-ui/avatar';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Text, HStack, Spacer, Flex, Stack } from '@chakra-ui/layout';
import { StaggeredStackItem } from '../motion/StaggeredStack';
import SelectComponent from '../Select';
import { useToast } from '@chakra-ui/toast';
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
    if (val.value === props.role) return;
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
        status: 'error',
        isClosable: true,
        position: 'top',
      });
      return;
    }
    toast({
      description: `User ${props.name} is now an ${val.value}`,
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
            {props.role !== UserRole.Owner ? (
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
            ) : (
              <Text fontSize="sm" px="0.15rem">
                Owner
              </Text>
            )}
          </Flex>
        </HStack>
      </Flex>
    </StaggeredStackItem>
  );
}

export default UserItem;
