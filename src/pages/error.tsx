import Link from 'next/link';
import { Stack, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
const Error = () => {
  return (
    <Stack justify="space-between" alignItems="center">
      <Text>User must be from Kiprosh error</Text>
      <Link href="/signin">
        <Button variant="link">Go to SignIn</Button>
      </Link>
    </Stack>
  );
};
export default Error;
