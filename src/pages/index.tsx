import { Box, Flex, HStack, Text } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';

const Index = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.push('/auth/signin');
      return;
    }
  }, [loading, session, router]);

  if (loading) {
    /* TODO: Add Chakra Skeleton */
    return (
      <Flex justify="center" alignItems="center" h="100vh">
        <Spinner size="xl" />;
      </Flex>
    );
  }
  return (
    <Box>
      {session && (
        <>
          {session.user.image && <span style={{ backgroundImage: `url(${session.user.image})` }} />}
          <HStack spacing={4} justify="flex-end" p="1rem" bg="gray.100">
            <Text fontSize="lg" fontWeight={500}>
              {session.user.email || session.user.name}
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
        </>
      )}
    </Box>
  );
};

export default Index;
/* 

 
*/
