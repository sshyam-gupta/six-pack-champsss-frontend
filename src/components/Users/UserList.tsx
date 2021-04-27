import { Spinner } from '@chakra-ui/spinner';
import EmptyPlaceholder from '../EmptyPlaceholder';
import useSWR from 'swr';

import StaggeredStack from '../motion/StaggeredStack';
import UserItem, { User } from './UserItem';
import { USERS } from '../../services/api/endpoints';

function UserList() {
  const { data, error } = useSWR(USERS);

  if (error) {
    return <EmptyPlaceholder description="Something went wrong!" />;
  }

  if (!data) {
    return <Spinner size="lg" />;
  }

  return data && data.length ? (
    <StaggeredStack mt="1rem">
      {data.map((user: User) => (
        <UserItem key={user.id} {...user} />
      ))}
    </StaggeredStack>
  ) : (
    <EmptyPlaceholder description="No users available" />
  );
}

export default UserList;
