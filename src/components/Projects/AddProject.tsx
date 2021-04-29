import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { Input } from '@chakra-ui/input';
import { Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { useState } from 'react';
import { useToast } from '@chakra-ui/toast';

import * as AppData from '../../constants/app.json';
import ProjectService from '../../services/project/project';
import { Project } from './ProjectItem';

const AddProject = ({
  isOpen,
  onClose,
  type = 'Add',
  project,
}: {
  isOpen: boolean;
  onClose: (name?: string) => void;
  type?: 'Add' | 'Edit';
  project?: Project;
}) => {
  const [projectName, setProjectName] = useState(project?.name ?? '');
  const [isAddingProject, setIsAddingProject] = useState(false);
  const toast = useToast();

  const addProject = async () => {
    setIsAddingProject(true);
    const { error } =
      type === 'Add'
        ? await ProjectService.addProject(projectName)
        : await ProjectService.editProject({
            id: project.id,
            name: projectName,
          });
    setIsAddingProject(false);
    if (error) {
      toast({
        description: 'Something went wrong!',
        status: 'error',
        isClosable: true,
        position: 'top',
      });
      return;
    }
    onClose(projectName);
  };
  return (
    <Modal closeOnOverlayClick={false} isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{type === 'Add' ? 'Add Project' : 'Edit Project'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            value={projectName}
            placeholder="Enter project name"
            onChange={({ target: { value } }: any) => setProjectName(value)}
          />
          <Text fontWeight="500" color="red.500" fontSize="sm" mt="1rem">
            Points calculation: {AppData['hours-to-clap-mapping']}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button disabled={!projectName.trim().length} onClick={addProject} isLoading={isAddingProject}>
            {type}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default AddProject;
