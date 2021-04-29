import { Button, IconButton } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { HStack, Spacer, Text, Flex } from '@chakra-ui/layout';
import { MenuButton, MenuItem, Menu, MenuList } from '@chakra-ui/menu';
import { Tooltip } from '@chakra-ui/tooltip';
import Linkify from 'react-linkify';

import * as AppData from '../../constants/app.json';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { Activity, getStatusColor } from '../../util/activity-util';
import { StaggeredStackItem } from '../motion/StaggeredStack';
import { minutesToHours } from '../../util/time-util';
import dayjs from 'dayjs';
import { useProject } from '../../hooks/use-project';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from '@chakra-ui/modal';
import { useCallback, useRef } from 'react';
import { useDisclosure } from '@chakra-ui/hooks';

import ProjectService from '../../services/project/project';
import { useToast } from '@chakra-ui/toast';
import EditActivity from './EditActivity';

interface ActivityItemProps extends Activity {
  disableCrud?: boolean;
  onUpdate?: () => void;
}

function ActivityItem(activity: ActivityItemProps) {
  const bg = useColorModeValue('gray.50', 'gray.700');
  const { getProjectNameById } = useProject();
  const toast = useToast();
  const deleteDisclosure = useDisclosure();
  const editDisclosure = useDisclosure();
  const isDeletingDisclosure = useDisclosure();
  const cancelRef = useRef();

  const onDelete = useCallback(async () => {
    isDeletingDisclosure.onOpen();
    const { error } = await ProjectService.deleteActivity(activity.id);
    isDeletingDisclosure.onClose();
    if (error) {
      toast({
        description: 'Something went wrong!',
        status: 'error',
        isClosable: true,
        position: 'top',
      });
      return;
    }
    activity.onUpdate?.();
    deleteDisclosure.onClose();
  }, [activity, deleteDisclosure, isDeletingDisclosure, toast]);

  const onEdit = useCallback(
    async name => {
      if (name) {
        activity.onUpdate?.();
      }
      editDisclosure.onClose();
    },
    [activity, editDisclosure],
  );

  return (
    <StaggeredStackItem boxShadow="md" borderRadius="md" background={bg} p="1rem">
      <HStack fontSize="md">
        <Tooltip placement="top" label={activity.status.toUpperCase()}>
          <Flex mr="0.5rem" height="10px" width="10px" borderRadius="50%" bg={getStatusColor(activity.status)} />
        </Tooltip>
        <Text>
          <Linkify>{activity.description}</Linkify>
        </Text>
        <Spacer />
        {!activity.disableCrud && activity.status === 'pending' ? (
          <Menu>
            <MenuButton
              size="sm"
              h="24px"
              as={IconButton}
              aria-label="Options"
              icon={<BiDotsVerticalRounded />}
              variant="ghost"
            />
            <MenuList p={0} minWidth="4rem">
              <MenuItem onClick={editDisclosure.onOpen} icon={<AiOutlineEdit />}>
                Edit
              </MenuItem>
              <MenuItem onClick={deleteDisclosure.onOpen} icon={<AiOutlineDelete />}>
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        ) : null}
      </HStack>
      <Flex fontSize="xs" justifyContent="space-between" flexWrap="wrap">
        <HStack spacing={4}>
          <Flex alignItems="center" minW="60px">
            <Text>{`${activity.status === 'approved' ? activity.points_granted : activity.points_requested} ${
              AppData.points
            }`}</Text>
          </Flex>
          &nbsp;&nbsp;
          <Text color="gray.500">|</Text>
          &nbsp;&nbsp;
          <Text minW="50px" textAlign="center">
            {getProjectNameById(activity.project_id) ?? '---'}
          </Text>
          &nbsp;&nbsp;
          <Text color="gray.500">|</Text>
          &nbsp;&nbsp;
          <Text minW="50px" textAlign="center">
            {minutesToHours(activity.duration) ?? '---'}
          </Text>
        </HStack>
        <Text textAlign="right">{dayjs(activity.performed_on).format('ll LT')}</Text>
      </Flex>

      {editDisclosure.isOpen ? <EditActivity {...activity} isOpen={editDisclosure.isOpen} onClose={onEdit} /> : null}

      <AlertDialog isOpen={deleteDisclosure.isOpen} leastDestructiveRef={cancelRef} onClose={deleteDisclosure.onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Activity
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
    </StaggeredStackItem>
  );
}

export default ActivityItem;
