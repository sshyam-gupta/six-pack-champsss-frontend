import { Box, HStack, Text } from "@chakra-ui/layout";
import { signIn, signOut, useSession } from "next-auth/client";

const Index = () => {
  const [session, loading] = useSession();
  return (
    <Box>
      {!session && (
        <>
          <span>You are not signed in</span>
          <a
            href={`/api/auth/signin`}
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            Sign in
          </a>
        </>
      )}
      {session && (
        <>
          {session.user.image && (
            <span style={{ backgroundImage: `url(${session.user.image})` }} />
          )}
          <HStack spacing={4}>
            <Text fontSize="md">Signed in as</Text>
            <Text fontSize="lg" fontWeight={500}>
              {session.user.email || session.user.name}
            </Text>
          </HStack>
          <a
            href={`/api/auth/signout`}
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            Sign out
          </a>
        </>
      )}
    </Box>
  );
};

export default Index;
