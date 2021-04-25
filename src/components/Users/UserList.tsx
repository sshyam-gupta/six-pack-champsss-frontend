import { Spinner } from '@chakra-ui/spinner';
import EmptyPlaceholder from '../EmptyPlaceholder';
import useSWR from 'swr';
import fetcher from '../../util/swr-util';
import StaggeredStack from '../motion/StaggeredStack';
import UserItem, { User } from './UserItem';

function UserList() {
  const { data, error } = useSWR('https://60850d5f9b2bed00170417e4.mockapi.io/api/v1/users', fetcher);

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
