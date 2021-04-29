import { Avatar } from '@chakra-ui/avatar';
import { Button, IconButton } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Flex, HStack, Spacer, Stack, Text } from '@chakra-ui/layout';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from '@chakra-ui/modal';
import { Spinner } from '@chakra-ui/spinner';
import { useToast } from '@chakra-ui/toast';
import { Tooltip } from '@chakra-ui/tooltip';
import { useRouter } from 'next/router';
import { useCallback, useRef, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

import useSWR from 'swr';

import * as AppData from '../../constants/app.json';
import { useProject } from '../../hooks/use-project';
import { useUser } from '../../hooks/use-user';
import ApiService from '../../services/api';
import { REMOVE_USERS_FROM_PROJECT, USERS } from '../../services/api/endpoints';
import ProjectService from '../../services/project/project';
import sleep from '../../util/sleep';
import EmptyPlaceholder from '../EmptyPlaceholder';
import PageContainer from '../layout/PageContainer';

import StaggeredStack, { StaggeredStackItem } from '../motion/StaggeredStack';
import SearchInput from '../SearchInput';
import SelectComponent, { FormatOptionLabel, MultiValueLabel } from '../Select';
import { User } from '../Users/UserItem';

const ProjectDetailedView = () => {
  const toast = useToast();

  const router = useRouter();
  const {
    query: { id },
  } = router;

  const { isAdmin } = useUser();
  const { getProjectNameById, getProjectById, updateProject, error } = useProject();

  const [isAddingMembers, setIsAddingMembers] = useState(false);
  const [addedMembers, setAddedMembers] = useState([]);
  const [searchText, setSearchText] = useState('');

  const project = getProjectById(parseInt(id as string));
  const projectMembersIdMap = project?.users?.reduce((acc: any, user: User) => {
    acc[user.id] = user;
    return acc;
  }, {});
  const { data: users } = useSWR(USERS);

  const addMembers = async () => {
    setIsAddingMembers(true);
    const payload = {
      project_id: parseInt(id as string),
      user_ids: addedMembers.map(m => m.value),
    };
    const { error } = await ProjectService.addMembers(payload);
    if (error) {
      toast({
        description: error,
        status: 'error',
        isClosable: true,
        position: 'top',
      });
      return;
    }
    toast({
      description: 'Member added successfully',
      status: 'success',
      isClosable: true,
      position: 'top',
    });
    const users = project.users.concat(
      addedMembers.map((member: User) => ({ ...member, name: member.name, email: member.email })),
    );
    setAddedMembers([]);
    updateProject({
      ...project,
      users: users,
    });
    setIsAddingMembers(false);
  };

  const removeUser = async (member: User) => {
    const users = project.users.filter(user => user.id !== member.id);

    updateProject({
      ...project,
      users: users,
    });
  };

  const filteredUsers = project?.users?.filter((user: User) => {
    const text = searchText.trim().toLowerCase();
    return user.name.toLowerCase().includes(text);
  });

  const getView = () => {
    if (error) {
      return <EmptyPlaceholder description="Something went wrong!" />;
    }
    if (!project) {
      return <Spinner mt="1rem" size="lg" />;
    }
    return (
      <Stack spacing={4}>
        {isAdmin ? (
          <Flex justify="space-between" flexWrap={['wrap', 'nowrap']}>
            <SelectComponent
              placeholder={`Add members to ${getProjectNameById(parseInt(id as string))}`}
              value={addedMembers}
              onChange={setAddedMembers}
              components={{ MultiValueLabel: MultiValueLabel }}
              formatOptionLabel={FormatOptionLabel}
              options={users
                ?.filter((u: User) => !projectMembersIdMap[u.id])
                ?.map((user: User) => ({ ...user, label: user.name, value: user.id }))}
              allowClear
              isMulti
            />
            <Button
              px="2rem"
              ml={[null, '1rem']}
              mt={['1rem', 0]}
              isLoading={isAddingMembers}
              disabled={!addedMembers.length}
              onClick={addMembers}
            >
              Add Members
            </Button>
          </Flex>
        ) : null}
        <Stack spacing={4} position="relative" mt="1rem">
          <Stack spacing={2}>
            <Text fontWeight={500}>Project Members ({project.users?.length})</Text>
            <SearchInput onSearch={setSearchText} placeholder="Search member" />
          </Stack>
          <Stack spacing={4}>
            {filteredUsers?.length ? (
              <StaggeredStack>
                {filteredUsers.map((user: User) => (
                  <ProjectMember {...user} key={user.id} onRemove={removeUser} projectId={id as string} />
                ))}
              </StaggeredStack>
            ) : (
              <EmptyPlaceholder description="Please add team members" />
            )}
          </Stack>
        </Stack>
      </Stack>
    );
  };
  return (
    <PageContainer pageTitle={project?.name || 'Project Details'}>
      <Flex justify="flex-end" pos="absolute" right="20px" top="12px">
        <Text fontSize="md">Total: {`${project?.total_points ?? 0} ${AppData.points}`}</Text>
      </Flex>
      <Box mt="1rem">{getView()}</Box>
    </PageContainer>
  );
};

function ProjectMember(user: User & { projectId: string; onRemove: (user: User) => void }) {
  const bg = useColorModeValue('gray.50', 'gray.700');
  const deleteDisclosure = useDisclosure();
  const isDeletingDisclosure = useDisclosure();
  const cancelRef = useRef();
  const { isAdmin } = useUser();

  const onDelete = useCallback(async () => {
    isDeletingDisclosure.onOpen();
    const payload = {
      project_id: user.projectId,
      user_ids: [user.id],
    };
    await ApiService.put(REMOVE_USERS_FROM_PROJECT.replace('{{id}}', user.projectId), payload);
    user.onRemove?.(user);
    isDeletingDisclosure.onClose();
    deleteDisclosure.onClose();
  }, [deleteDisclosure, isDeletingDisclosure, user]);

  return (
    <StaggeredStackItem key={user.id} boxShadow="md" borderRadius="md" background={bg} p="1rem" position="relative">
      <Flex flexDirection={['column', 'column', 'row']} alignItems={['flex-start', 'flex-start', 'center']}>
        <HStack spacing={4}>
          <Avatar size="sm" src={user.image} alt={user.name} />
          <Stack spacing={0}>
            <Text>{user.name}</Text>
            <Text fontSize="sm">{user.email}</Text>
          </Stack>
        </HStack>
        <Spacer />
        {isAdmin ? (
          <HStack mt={['1rem', '1rem', 0]}>
            <Tooltip label="Remove" placement="top">
              <IconButton
                onClick={deleteDisclosure.onOpen}
                aria-label="Remove"
                variant="ghost"
                icon={<AiOutlineDelete />}
              />
            </Tooltip>
          </HStack>
        ) : null}
      </Flex>
      <AlertDialog isOpen={deleteDisclosure.isOpen} leastDestructiveRef={cancelRef} onClose={deleteDisclosure.onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Remove User
            </AlertDialogHeader>

            <AlertDialogBody>{`Are you sure? You can't undo this action afterwards.`}</AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={deleteDisclosure.onClose}
                variant="ghost"
                isDisabled={isDeletingDisclosure.isOpen}
              >
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDelete} ml={3} isLoading={isDeletingDisclosure.isOpen}>
                Remove
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </StaggeredStackItem>
  );
}

export default ProjectDetailedView;
