import { IconButton } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { HStack, Spacer, Text, Flex } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/tooltip';
import Linkify from 'react-linkify';
import { BsCheckCircle } from 'react-icons/bs';
import { IoCloseCircleOutline } from 'react-icons/io5';
import dayjs from 'dayjs';

import * as AppData from '../../constants/app.json';
import { Activity, ActivityStatus, getStatusColor } from '../../util/activity-util';
import { useDisclosure } from '@chakra-ui/hooks';
import { useCallback } from 'react';
import sleep from '../../util/sleep';
import { useToast } from '@chakra-ui/toast';
import { StaggeredStackItem } from '../motion/StaggeredStack';
import { minutesToHours } from '../../util/time-util';

interface RequestItemProps extends Activity {
  disableCrud?: boolean;
  onUpdate?: (status: ActivityStatus) => void;
}

function RequestItem(props: RequestItemProps) {
  const bg = useColorModeValue('gray.50', 'gray.700');
  const isLoadingDisclosure = useDisclosure();
  const toast = useToast();

  const updateStatus = useCallback(
    async (status: ActivityStatus) => {
      isLoadingDisclosure.onOpen();
      await sleep();
      isLoadingDisclosure.onClose();
      props.onUpdate?.(status);
      toast({
        description: `Activity ${status} successfully`,
        variant: 'top-accent',
        status: 'success',
        isClosable: true,
        position: 'top',
      });
    },
    [isLoadingDisclosure, toast, props.onUpdate],
  );

  return (
    <StaggeredStackItem boxShadow="md" borderRadius="md" background={bg} p="1rem" position="relative">
      <HStack
        fontSize="md"
        flexDirection={['column', 'column', 'row']}
        alignItems={['flex-start', 'flex-start', 'center']}
      >
        <HStack>
          <Tooltip placement="top" label={props.status}>
            <Flex height="10px" width="10px" borderRadius="50%" bg={getStatusColor(props.status)} />
          </Tooltip>
          <Text>
            <Linkify>{props.description}</Linkify>
          </Text>
        </HStack>
        <Spacer />
        <HStack>
          <Text>{`${props.points_requested} ${AppData.points}`}</Text>
          {!props.disableCrud ? (
            <Tooltip placement="top" label="Approve">
              <IconButton
                isLoading={isLoadingDisclosure.isOpen}
                fontSize="1.2rem"
                variant="outline"
                aria-label="Approve"
                onClick={() => {
                  updateStatus('APPROVED' as ActivityStatus);
                }}
                icon={<BsCheckCircle />}
              />
            </Tooltip>
          ) : null}
          {!props.disableCrud ? (
            <Tooltip placement="top" label="Reject">
              <IconButton
                isLoading={isLoadingDisclosure.isOpen}
                fontSize="1.2rem"
                variant="outline"
                aria-label="Approve"
                onClick={() => {
                  updateStatus('REJECTED' as ActivityStatus);
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
            {props.projectName}
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
    </StaggeredStackItem>
  );
}

export default RequestItem;
