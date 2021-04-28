import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box, Flex, Stack, Text } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { useToast } from '@chakra-ui/toast';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';
import * as AppData from '../../constants/app.json';
import { useUser } from '../../hooks/use-user';

import { PROJECT_BY_ID, USERS } from '../../services/api/endpoints';
import ProjectService from '../../services/project/project';
import EmptyPlaceholder from '../EmptyPlaceholder';
import PageContainer from '../layout/PageContainer';
import StaggeredGrid, { StaggeredGridItem } from '../motion/StaggeredGrid';
import SearchInput from '../SearchInput';
import SelectComponent, { FormatOptionLabel, MultiValueLabel } from '../Select';
import { User } from '../Users/UserItem';

const ProjectDetailedView = () => {
  const bg = useColorModeValue('gray.50', 'gray.700');
  const { isAdmin } = useUser();

  const router = useRouter();
  const {
    query: { id },
  } = router;

  const toast = useToast();

  const [isAddingMembers, setIsAddingMembers] = useState(false);
  const [addedMembers, setAddedMembers] = useState([]);
  const [searchText, setSearchText] = useState('');

  const { data: project, error } = useSWR(PROJECT_BY_ID.replace('{{id}}', id as string));
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
        variant: 'top-accent',
        status: 'error',
        isClosable: true,
        position: 'top',
      });
      return;
    }
    toast({
      description: 'Member added successfully',
      variant: 'top-accent',
      status: 'success',
      isClosable: true,
      position: 'top',
    });
    project.users = project.users.concat(addedMembers.map(member => ({ name: member.name, email: member.email })));
    setAddedMembers([]);
    setIsAddingMembers(false);
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
              placeholder={`Invite members to ${project.name}`}
              value={addedMembers}
              onChange={setAddedMembers}
              components={{ MultiValueLabel: MultiValueLabel }}
              formatOptionLabel={FormatOptionLabel}
              options={users?.map((u: User) => ({ ...u, label: u.name, value: u.id }))}
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
              Invite Members
            </Button>
          </Flex>
        ) : null}
        <Stack spacing={2} position="relative" mt="1rem">
          <Stack spacing={4}>
            <Stack spacing={2}>
              <Text fontWeight={500}>Project Members ({project.users?.length})</Text>
              <SearchInput onSearch={setSearchText} placeholder="Search member" />
            </Stack>
            {filteredUsers?.length ? (
              <StaggeredGrid columns={[1, 2, 3, 3]} gridGap="1rem">
                {filteredUsers.map((u: User) => (
                  <StaggeredGridItem p="1rem" key={u.id} bg={bg} boxShadow="md" borderRadius="md">
                    <Flex flexDirection="column" alignItems="center" spacing={2}>
                      <Avatar name={u.name} />
                      <Text mt="0.5rem">{u.name}</Text>
                      <Text fontSize="xs" isTruncated>
                        {u.email}
                      </Text>
                    </Flex>
                  </StaggeredGridItem>
                ))}
              </StaggeredGrid>
            ) : (
              <EmptyPlaceholder description="Please add team addedMembers" />
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

export default ProjectDetailedView;
