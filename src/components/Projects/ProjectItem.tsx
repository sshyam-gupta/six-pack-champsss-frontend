import { Avatar, AvatarGroup } from '@chakra-ui/avatar';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Flex, Text } from '@chakra-ui/layout';
import Link from 'next/link';
import { User } from '../Users/UserItem';
import * as AppData from '../../constants/app.json';
import { StaggeredGridItem } from '../motion/StaggeredGrid';

import { Menu, MenuList, MenuButton, MenuItem } from '@chakra-ui/menu';
import { Button, IconButton } from '@chakra-ui/button';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from '@chakra-ui/modal';
import { useDisclosure } from '@chakra-ui/hooks';
import { useCallback, useRef } from 'react';
import { useToast } from '@chakra-ui/toast';

import ProjectService from '../../services/project/project';
import AddProject from './AddProject';
import { useUser } from '../../hooks/use-user';

export type Project = {
  id: number;
  name: string;
  users: Array<User>;
  points_per_hour: number;
  total_points: number;
};
function ProjectItem({ ...props }: Project & { updateProject: (name?: string) => void }) {
  const bg = useColorModeValue('gray.50', 'gray.700');
  const editDisclosure = useDisclosure();
  const deleteDisclosure = useDisclosure();
  const isDeletingDisclosure = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();
  const { isAdmin } = useUser();

  const onDelete = useCallback(async () => {
    isDeletingDisclosure.onOpen();
    const { status } = await ProjectService.deleteProject(props.id);

    isDeletingDisclosure.onClose();
    if (status !== 200) {
      toast({
        description: 'Something went wrong!',
        status: 'error',
        isClosable: true,
        position: 'top',
      });
      return;
    }
    toast({
      description: 'Project deleted successfully',
      status: 'success',
      isClosable: true,
      position: 'top',
    });
    props.updateProject?.(props.name);
    deleteDisclosure.onClose();
  }, [deleteDisclosure, isDeletingDisclosure, props, toast]);

  const onEdit = useCallback(
    async name => {
      if (name) {
        props.updateProject?.(props.name);
      }
      editDisclosure.onClose();
    },
    [editDisclosure, props],
  );

  return (
    <Link href={`/projects/${props.id}`}>
      <StaggeredGridItem
        cursor="pointer"
        boxShadow="md"
        borderRadius="md"
        background={bg}
        p="1rem"
        position="relative"
        spacing={2}
      >
        <Flex justify="space-between" alignItems="center">
          <Text fontWeight={500} fontSize="lg">
            {props.name}
          </Text>
          {isAdmin ? (
            <Menu>
              <MenuButton
                h="24px"
                as={IconButton}
                aria-label="Options"
                icon={<BiDotsVerticalRounded />}
                variant="ghost"
                onClick={e => {
                  e.stopPropagation();
                }}
              />
              <MenuList p={0} minWidth="4rem">
                <MenuItem
                  onClick={e => {
                    e.stopPropagation();
                    editDisclosure.onOpen();
                  }}
                  icon={<AiOutlineEdit />}
                >
                  Edit
                </MenuItem>
                <MenuItem
                  icon={<AiOutlineDelete />}
                  onClick={e => {
                    e.stopPropagation();
                    deleteDisclosure.onOpen();
                  }}
                >
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          ) : null}
        </Flex>
        <AvatarGroup size="sm" max={2}>
          {props.users.map((user: User, index: number) => {
            return <Avatar borderWidth="0" key={index} name={user.name} src={user.image} />;
          })}
        </AvatarGroup>
        <Text fontSize="sm">Total: {`${props.total_points} ${AppData.points}`}</Text>
        <AlertDialog
          isOpen={deleteDisclosure.isOpen}
          leastDestructiveRef={cancelRef}
          onClose={deleteDisclosure.onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Project
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
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
        {editDisclosure.isOpen ? (
          <AddProject type="Edit" project={props} isOpen={editDisclosure.isOpen} onClose={onEdit} />
        ) : null}
      </StaggeredGridItem>
    </Link>
  );
}
export default ProjectItem;
