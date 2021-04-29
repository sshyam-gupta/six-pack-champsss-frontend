import { Button, IconButton } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { HStack, Spacer, Text, Flex, Stack } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/tooltip';
import Linkify from 'react-linkify';
import { BsCheckCircle } from 'react-icons/bs';
import { IoCloseCircleOutline } from 'react-icons/io5';
import dayjs from 'dayjs';

import * as AppData from '../../constants/app.json';
import { Activity, ActivityStatus, getStatusColor } from '../../util/activity-util';
import { useDisclosure } from '@chakra-ui/hooks';
import { useCallback, useRef, useState } from 'react';

import { useToast } from '@chakra-ui/toast';
import { StaggeredStackItem } from '../motion/StaggeredStack';
import { minutesToHours } from '../../util/time-util';
import { useProject } from '../../hooks/use-project';
import ProjectService from '../../services/project/project';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogFooter,
} from '@chakra-ui/modal';
import { Input } from '@chakra-ui/input';

interface RequestItemProps extends Activity {
  disableCrud?: boolean;
  onUpdate?: (status: 'approve' | ActivityStatus) => void;
}

function RequestItem(props: RequestItemProps) {
  const bg = useColorModeValue('gray.50', 'gray.700');
  const isLoadingDisclosure = useDisclosure();
  const toast = useToast();
  const { getProjectNameById } = useProject();
  const pointsGrantDisclosure = useDisclosure();
  const cancelRef = useRef();
  const [pointsToGrant, setPointsToGrant] = useState<number>(props.points_requested);

  const updateStatus = useCallback(
    async (status: 'approve' | ActivityStatus) => {
      isLoadingDisclosure.onOpen();
      const { error } = await ProjectService.updateActivityStatus(`/admin/activities/${props.id}/${status}`, {
        id: props.id,
        activity: {
          points_granted: status === 'approved' ? pointsToGrant : props.points_requested,
        },
      });
      isLoadingDisclosure.onClose();
      pointsGrantDisclosure.onClose();
      if (error) {
        toast({
          description: `Something went wrong!`,
          variant: 'top-accent',
          status: 'error',
          isClosable: true,
          position: 'top',
        });
        return;
      }
      props.onUpdate?.(status);
      toast({
        description: `Activity ${status} successfully`,
        variant: 'top-accent',
        status: 'success',
        isClosable: true,
        position: 'top',
      });
    },
    [isLoadingDisclosure, pointsGrantDisclosure, pointsToGrant, props, toast],
  );

  return (
    <StaggeredStackItem boxShadow="md" borderRadius="md" background={bg} p="1rem" position="relative">
      <HStack
        fontSize="md"
        flexDirection={['column', 'column', 'row']}
        alignItems={['flex-start', 'flex-start', 'center']}
      >
        <HStack>
          <Tooltip placement="top" label={props.status.toUpperCase()}>
            <Flex height="10px" width="10px" borderRadius="50%" bg={getStatusColor(props.status)} />
          </Tooltip>
          <Text>
            <Linkify>{props.description}</Linkify>
          </Text>
        </HStack>
        <Spacer />
        <HStack>
          <Text>{`${props.status === 'approved' ? props.points_granted : props.points_requested} ${
            AppData.points
          }`}</Text>
          {!props.disableCrud ? (
            <Tooltip placement="top" label="Approve">
              <IconButton
                isLoading={isLoadingDisclosure.isOpen}
                size="sm"
                variant="outline"
                aria-label="Approve"
                onClick={pointsGrantDisclosure.onOpen}
                icon={<BsCheckCircle />}
              />
            </Tooltip>
          ) : null}
          {!props.disableCrud ? (
            <Tooltip placement="top" label="Reject">
              <IconButton
                isLoading={isLoadingDisclosure.isOpen}
                fontSize="1.1rem"
                variant="outline"
                size="sm"
                aria-label="Approve"
                onClick={() => {
                  updateStatus('reject' as ActivityStatus);
                }}
                icon={<IoCloseCircleOutline />}
              />
            </Tooltip>
          ) : null}
        </HStack>
      </HStack>
      <Flex fontSize="xs" justifyContent="space-between" flexWrap="wrap">
        <HStack spacing={4}>
          <Text minW="80px">{props.user_id}</Text>
          &nbsp;&nbsp;
          <Text color="gray.500">|</Text>
          &nbsp;&nbsp;
          <Text minW="50px" textAlign="center">
            {getProjectNameById(props.project_id)}
          </Text>
          &nbsp;&nbsp;
          <Text color="gray.500">|</Text>
          &nbsp;&nbsp;
          <Text minW="50px" textAlign="center">
            {minutesToHours(props.duration)}
          </Text>
        </HStack>
        <Text textAlign="right">{dayjs(props.performed_on).format('ll LT')}</Text>
      </Flex>
      <AlertDialog
        isCentered
        isOpen={pointsGrantDisclosure.isOpen}
        leastDestructiveRef={cancelRef}
        onClose={pointsGrantDisclosure.onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Approve {AppData.points}
              <AlertDialogCloseButton />
            </AlertDialogHeader>

            <AlertDialogBody>
              <Stack spacing={2}>
                <HStack spacing={4}>
                  <Text fontSize="md">{AppData.points} Requested:</Text>
                  <Text fontWeight={500}>{props.points_requested}</Text>
                </HStack>
                <Input
                  defaultValue={props.points_requested}
                  placeholder={`Enter ${AppData.points} to approve`}
                  type="number"
                  value={pointsToGrant}
                  onChange={({ target: { value } }: any) => setPointsToGrant(parseInt(value))}
                />
              </Stack>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                disabled={isLoadingDisclosure.isOpen}
                ref={cancelRef}
                onClick={pointsGrantDisclosure.onClose}
                variant="ghost"
              >
                Cancel
              </Button>
              <Button
                isLoading={isLoadingDisclosure.isOpen}
                disabled={!pointsToGrant}
                colorScheme="red"
                onClick={() => updateStatus('approve')}
                ml={3}
              >
                Approve
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </StaggeredStackItem>
  );
}

export default RequestItem;
