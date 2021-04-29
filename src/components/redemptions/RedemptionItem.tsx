import { IconButton } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { HStack, Spacer, Text, Flex } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/tooltip';
import { BsCheckCircle } from 'react-icons/bs';

import dayjs from 'dayjs';

import * as AppData from '../../constants/app.json';
import { RedemptionStatus, getStatusColor, Redemption } from '../../util/activity-util';
import { useDisclosure } from '@chakra-ui/hooks';
import { useCallback } from 'react';

import { useToast } from '@chakra-ui/toast';
import { StaggeredStackItem } from '../motion/StaggeredStack';
import ProjectService from '../../services/project/project';

interface RedemptionItemProps extends Redemption {
  disableCrud?: boolean;
  onUpdate?: (status: RedemptionStatus) => void;
}

function RedemptionItem(props: RedemptionItemProps) {
  const bg = useColorModeValue('gray.50', 'gray.700');
  const isLoadingDisclosure = useDisclosure();
  const toast = useToast();

  const updateStatus = useCallback(
    async (status: RedemptionStatus) => {
      isLoadingDisclosure.onOpen();
      const { error } = await ProjectService.updateRedemptionStatus(
        `/admin/admin/redeem_requests/${props.id}/mark_complete`,
        {
          id: props.id,
        },
      );
      isLoadingDisclosure.onClose();
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
        description: `Redemption completed successfully`,
        variant: 'top-accent',
        status: 'success',
        isClosable: true,
        position: 'top',
      });
    },
    [isLoadingDisclosure, props, toast],
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
          <Text>{`${props.points} ${AppData.points}`}</Text>
        </HStack>
        <Spacer />
        <HStack>
          <Tooltip placement="top" label="Mark as complete">
            <IconButton
              isLoading={isLoadingDisclosure.isOpen}
              size="sm"
              variant="outline"
              aria-label="Approve"
              onClick={() => {
                updateStatus('complete' as RedemptionStatus);
              }}
              icon={<BsCheckCircle />}
            />
          </Tooltip>
        </HStack>
      </HStack>
      <Flex fontSize="xs" justifyContent="space-between" flexWrap="wrap">
        <HStack spacing={4}>
          <Text minW="50px" textAlign="center">
            {props.user_name}
          </Text>
        </HStack>
        <Text textAlign="right">{dayjs(props.created_at).format('ll LT')}</Text>
      </Flex>
    </StaggeredStackItem>
  );
}

export default RedemptionItem;
