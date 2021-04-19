import { Avatar } from '@chakra-ui/avatar';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Stack } from '@chakra-ui/layout';
import { useSession } from 'next-auth/client';
import PageContainer from '../components/layout/PageContainer';

function MyProfile() {
  const [session] = useSession();
  if (!session) {
    return null;
  }

  return (
    <PageContainer>
      <Stack spacing={6} alignItems="center">
        <Avatar size="2xl" name={session?.user.name} src={session?.user.image} />
        <FormControl id="name">
          <FormLabel>Name</FormLabel>
          <Input isReadOnly type="email" value={session?.user.name} />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input isReadOnly type="email" value={session?.user.email} />
        </FormControl>
      </Stack>
    </PageContainer>
  );
}

export default MyProfile;