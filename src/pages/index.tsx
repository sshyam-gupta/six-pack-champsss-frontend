import { Box, Flex } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';


const Index = () => {
  const [session, loading] = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !session) {
      router.push('/signin');
      return;
    }
  }, [loading, session, router]);

  if (loading) {
    /* TODO: Add Chakra Skeleton */
    return (
      <Flex justify="center" alignItems="center" h="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }
  return <Box></Box>;
};

export default Index;
