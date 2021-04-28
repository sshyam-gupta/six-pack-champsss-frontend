import { useSession } from 'next-auth/client';
import { UserRole } from '../components/Users/UserItem';

export function useUser() {
  const [session] = useSession();

  return {
    user: session?.user,
    isAdmin: session?.user.role !== UserRole.Associate,
  };
}
