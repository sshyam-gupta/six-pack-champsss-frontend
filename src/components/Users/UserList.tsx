import { Spinner } from '@chakra-ui/spinner';
import EmptyPlaceholder from '../EmptyPlaceholder';
import useSWR from 'swr';

import StaggeredStack from '../motion/StaggeredStack';
import UserItem, { User } from './UserItem';
import { USERS } from '../../services/api/endpoints';
import { useMemo, useState } from 'react';
import { Stack } from '@chakra-ui/layout';
import SearchInput from '../SearchInput';

function UserList() {
  const { data, error } = useSWR(USERS);
  const [searchText, setSearchText] = useState('');

  const filteredUsers = useMemo(() => {
    const text = searchText.trim().toLowerCase();
    return data?.filter((user: User) => user.name.toLowerCase().includes(text));
  }, [searchText, data]);

  if (error) {
    return <EmptyPlaceholder description="Something went wrong!" />;
  }

  if (!data) {
    return <Spinner size="lg" />;
  }

  return (
    <Stack spacing={4} mt="1rem">
      <SearchInput onSearch={setSearchText} />
      {filteredUsers && filteredUsers.length ? (
        <StaggeredStack mt="1rem">
          {filteredUsers.map((user: User) => (
            <UserItem key={user.id} {...user} />
          ))}
        </StaggeredStack>
      ) : (
        <EmptyPlaceholder description="No users available" />
      )}
    </Stack>
  );
}

export default UserList;
