import { useSession } from 'next-auth/client';

import useSWR from 'swr';
import { UserRole } from '../components/Users/UserItem';
import { GET_USER } from '../services/api/endpoints';

function useCurrentUser() {
  const [session] = useSession();

  const { data = {}, error } = useSWR(
    typeof window !== 'undefined' && window.sessionStorage.getItem('token') ? `${GET_USER}/${session?.user.id}` : null,
  );

  return {
    data: {
      ...data,
      user: {
        ...session?.user,
        ...data?.user,
      },
    },
    isLoading: !error && !data,
    isError: error,
  };
}

export function useUser() {
  const { data, isLoading } = useCurrentUser();

  return {
    isLoading,
    ...data,
    isAdmin: data?.user.role !== UserRole.Associate,
  };
}
