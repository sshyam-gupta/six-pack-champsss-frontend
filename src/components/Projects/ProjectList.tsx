import { Spinner } from '@chakra-ui/spinner';
import { useToast } from '@chakra-ui/toast';
import { Flex } from '@chakra-ui/layout';
import { useState } from 'react';
import useSWR from 'swr';
import { Button } from '@chakra-ui/button';
import { AiOutlinePlus } from 'react-icons/ai';
import { useDisclosure } from '@chakra-ui/hooks';

import EmptyPlaceholder from '../EmptyPlaceholder';
import ProjectItem, { Project } from './ProjectItem';
import SearchInput from '../SearchInput';
import { PROJECTS } from '../../services/api/endpoints';
import StaggeredGrid from '../motion/StaggeredGrid';
import AddProject from './AddProject';

function ProjectList() {
  const { isOpen, onOpen: openAddProjectModal, onClose: closeAddProjectModal } = useDisclosure();
  const [searchText, setSearchText] = useState('');
  const toast = useToast();

  const { data, error } = useSWR(PROJECTS);

  let records = data?.projects;

  if (error) {
    return <EmptyPlaceholder description="Something went wrong!" />;
  }

  if (!records) {
    return <Spinner size="lg" />;
  }

  const initiateClose = (name?: string) => {
    if (name) {
      records = records.concat({ name });
    }
    closeAddProjectModal();
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
        <Button leftIcon={<AiOutlinePlus />} onClick={openAddProjectModal}>
          Add Project
        </Button>
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