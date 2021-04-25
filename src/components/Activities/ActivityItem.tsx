import { IconButton } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Stack, HStack, Spacer, Text, Flex } from '@chakra-ui/layout';
import { MenuButton, MenuItem, Menu, MenuList } from '@chakra-ui/menu';
import { Tooltip } from '@chakra-ui/tooltip';
import Linkify from 'react-linkify';

import * as AppData from '../../constants/app.json';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { Activity, getStatusColor } from '../../util/activity-util';
import { StaggeredStackItem } from '../motion/StaggeredStack';

interface ActivityItemProps extends Activity {
  disableCrud?: boolean;
}

function ActivityItem(props: ActivityItemProps) {
  const bg = useColorModeValue('gray.50', 'gray.700');

  return (
    <StaggeredStackItem boxShadow="md" borderRadius="md" background={bg} p="1rem" position="relative">
      <HStack fontSize="md">
        <Tooltip placement="top" label={props.status}>
          <Flex mr="0.5rem" height="10px" width="10px" borderRadius="50%" bg={getStatusColor(props.status)} />
        </Tooltip>
        <Text>
          <Linkify>{props.description}</Linkify>
        </Text>
        <Spacer />
      </HStack>
      <Flex fontSize="xs" justifyContent="space-between" flexWrap="wrap">
        <HStack spacing={4}>
          <Flex alignItems="center" minW="80px">
            <Text>{`${props.points} ${AppData.points}`}</Text>
          </Flex>
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
            {props.duration}
          </Text>
        </HStack>
        <Text textAlign="right">{props.timestamp}</Text>
      </Flex>
      {!props.disableCrud ? (
        <Menu>
          <MenuButton
            position="absolute"
            top="0"
            right="1rem"
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
    </StaggeredStackItem>
  );
}

export default ActivityItem;
