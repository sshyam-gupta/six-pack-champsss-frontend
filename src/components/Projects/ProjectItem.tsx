import { Avatar, AvatarGroup } from '@chakra-ui/avatar';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Flex, Text } from '@chakra-ui/layout';
import Link from 'next/link';
import { User } from '../Users/UserItem';
import * as AppData from '../../constants/app.json';
import { StaggeredGridItem } from '../motion/StaggeredGrid';

export type Project = {
  id: number;
  name: string;
  users: Array<User>;
  total_points: number;
};
function ProjectItem({ ...props }: Project & { deleteProject: () => void }) {
  const bg = useColorModeValue('gray.50', 'gray.700');
  return (
    <Link href={`/projects/${props.id}`}>
      <StaggeredGridItem
        cursor="pointer"
        boxShadow="md"
        borderRadius="md"
        background={bg}
        p="1rem"
        position="relative"
        spacing={3}
      >
        <Flex justify="space-between" alignItems="center">
          <Text fontWeight={500} fontSize="lg">
            {props.name}
          </Text>
          {/* TODO: Add this when api gets ready */}
          {/*  <Menu>
            <MenuButton
              h="24px"
              as={IconButton}
              aria-label="Options"
              icon={<BiDotsVerticalRounded />}
              variant="ghost"
              onClick={e => e.stopPropagation()}
            />
            <MenuList p={0} minWidth="4rem">
              <MenuItem icon={<AiOutlineEdit />}>Edit</MenuItem>
              <MenuItem icon={<AiOutlineDelete />} onClick={deleteProject}>
                Delete
              </MenuItem>
              <MenuItem icon={<AiOutlineDelete />}>Manage</MenuItem>
            </MenuList>
          </Menu> */}
        </Flex>
        <AvatarGroup size="sm" max={2}>
          {props.users.map((user: User, index: number) => {
            return <Avatar borderWidth="0" key={index} name={user.name} src={user.image} />;
          })}
        </AvatarGroup>
        <Text>Points: {`${props.total_points} ${AppData.points} `}</Text>
      </StaggeredGridItem>
    </Link>
  );
}
export default ProjectItem;
