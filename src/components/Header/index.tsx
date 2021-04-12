import { Flex, HStack, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/avatar';
import { signOut, useSession } from 'next-auth/client';

const Header = () => {
  const [session] = useSession();
  return (
    <Flex justify="space-between" p="0.5rem 1rem" bg="gray.100">
      {session?.user.image && <Avatar src={session.user.image} />}
      <HStack spacing={4} justify="flex-end">
        <Text fontSize="lg" fontWeight={500}>
          {session?.user.email || session?.user.name}
        </Text>
        <a
          href={`/api/auth/signout`}
          onClick={e => {
            e.preventDefault();
            signOut();
          }}
        >
          Sign out
        </a>
      </HStack>
    </Flex>
  );
};

export default Header;
