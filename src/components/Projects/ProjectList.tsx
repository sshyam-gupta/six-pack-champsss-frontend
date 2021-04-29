import { Flex } from '@chakra-ui/layout';
import { useMemo, useState } from 'react';
import { Button } from '@chakra-ui/button';
import { AiOutlinePlus } from 'react-icons/ai';
import { useDisclosure } from '@chakra-ui/hooks';

import EmptyPlaceholder from '../EmptyPlaceholder';
import ProjectItem, { Project } from './ProjectItem';
import SearchInput from '../SearchInput';
import StaggeredGrid from '../motion/StaggeredGrid';
import AddProject from './AddProject';

import { useUser } from '../../hooks/use-user';

import { useAllProjects } from '../../hooks/use-all-projects';

function ProjectList() {
  const { isOpen, onOpen: openAddProjectModal, onClose: closeAddProjectModal } = useDisclosure();
  const { isAdmin } = useUser();
  const [searchText, setSearchText] = useState('');

  const allProjects = useAllProjects();

  const { projects: records, hasError, updateProject } = allProjects;

  const projects = useMemo(() => {
    return records?.filter((rec: Project) => {
      const text = searchText.trim().toLowerCase();
      return rec.name.toLowerCase().includes(text);
    });
  }, [records, searchText]);

  if (hasError) {
    return <EmptyPlaceholder description="Something went wrong!" />;
  }

  const initiateClose = async (name?: string) => {
    closeAddProjectModal();
    if (name) {
      updateProject();
    }
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
          {projects.map((project: Project, index) => (
            <ProjectItem key={project.id + index} {...project} updateProject={initiateClose} />
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
