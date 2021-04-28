import { IconButton } from '@chakra-ui/button';
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

interface ActivityItemProps extends Activity {
  disableCrud?: boolean;
}

function ActivityItem(activity: ActivityItemProps) {
  const bg = useColorModeValue('gray.50', 'gray.700');
  const { getProjectNameById } = useProject();

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
              <MenuItem icon={<AiOutlineEdit />}>Edit</MenuItem>
              <MenuItem icon={<AiOutlineDelete />}>Delete</MenuItem>
            </MenuList>
          </Menu>
        ) : null}
      </HStack>
      <Flex fontSize="xs" justifyContent="space-between" flexWrap="wrap">
        <HStack spacing={4}>
          <Flex alignItems="center" minW="80px">
            <Text>{`${activity.status === 'approved' ? activity.points_granted : activity.points_requested} ${
              AppData.points
            }`}</Text>
          </Flex>
          &nbsp;&nbsp;
          <Text color="gray.500">|</Text>
          &nbsp;&nbsp;
          <Text minW="50px" textAlign="center">
            {getProjectNameById(activity.project_id)}
          </Text>
          &nbsp;&nbsp;
          <Text color="gray.500">|</Text>
          &nbsp;&nbsp;
          <Text minW="50px" textAlign="center">
            {minutesToHours(activity.duration)}
          </Text>
        </HStack>
        <Text textAlign="right">{dayjs(activity.performed_on).format('ll LT')}</Text>
      </Flex>
    </StaggeredStackItem>
  );
}

export default ActivityItem;
