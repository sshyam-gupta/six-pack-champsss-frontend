import { Spinner } from '@chakra-ui/spinner';
import { useToast } from '@chakra-ui/toast';
import { Flex } from '@chakra-ui/layout';
import { useState } from 'react';
import { Button } from '@chakra-ui/button';
import { AiOutlinePlus } from 'react-icons/ai';
import { useDisclosure } from '@chakra-ui/hooks';

import EmptyPlaceholder from '../EmptyPlaceholder';
import ProjectItem, { Project } from './ProjectItem';
import SearchInput from '../SearchInput';
import StaggeredGrid from '../motion/StaggeredGrid';
import AddProject from './AddProject';

import { useUser } from '../../hooks/use-user';
import { useProject } from '../../hooks/use-project';

import { mutate } from 'swr';
import { PROJECTS } from '../../services/api/endpoints';

function ProjectList() {
  const { isOpen, onOpen: openAddProjectModal, onClose: closeAddProjectModal } = useDisclosure();
  const { isAdmin } = useUser();
  const [searchText, setSearchText] = useState('');
  const toast = useToast();

  const { projects: records, error } = useProject();

  if (error) {
    return <EmptyPlaceholder description="Something went wrong!" />;
  }

  if (!records?.length) {
    return <Spinner size="lg" />;
  }

  const initiateClose = async (name?: string) => {
    closeAddProjectModal();
    if (name) {
      mutate(PROJECTS);
    }
  };

  const projects = records?.filter((rec: Project) => {
    const text = searchText.trim().toLowerCase();
    return rec.name.toLowerCase().includes(text);
  });

  const deleteProject = (_id: number) => {
    toast({
      description: `Project deleted successfully`,
      variant: 'top-accent',
      status: 'success',
      isClosable: true,
      position: 'top',
    });
  };

  return (
    <>
      <Flex justify="space-between" mt="1rem">
        <SearchInput onSearch={setSearchText} />
        {isAdmin ? (
          <Button leftIcon={<AiOutlinePlus />} onClick={openAddProjectModal}>
            Add Project
          </Button>
        ) : null}
      </Flex>
      {projects && projects.length ? (
        <StaggeredGrid mt="1rem" columns={[1, 2, 3, 3]} gridGap="1rem">
          {projects.map((project: Project) => (
            <ProjectItem key={project.id} {...project} deleteProject={() => deleteProject(project.id)} />
          ))}
        </StaggeredGrid>
      ) : (
        <EmptyPlaceholder description="No projects available" />
      )}
      <AddProject isOpen={isOpen} onClose={initiateClose} />
    </>
  );
}

export default ProjectList;
