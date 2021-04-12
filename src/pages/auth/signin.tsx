import React from 'react';
import { providers, signIn } from 'next-auth/client';
import { Box, Flex } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
import { Button } from '@chakra-ui/button';

export default function SignIn({ providers }: any) {
  return (
    <Flex justify="space-between" h="100vh">
      <Flex
        flex="0 1 75%"
        borderRight="1px solid"
        borderColor="gray"
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Image src="/images/login.svg" maxH="24rem" />
      </Flex>
      <Flex direction="column" p="1rem" alignItems="center" justify="center" flex={1}>
        <Box w="50%" mb="2rem">
          <Image src="/images/logo.png" borderRadius="100%" />
        </Box>
        {Object.values(providers).map((provider: any) => (
          <Button key={provider.name} onClick={() => signIn(provider.id)}>
            Sign In Using Google
          </Button>
        ))}
      </Flex>
    </Flex>
  );
}

SignIn.getInitialProps = async context => {
  return {
    providers: await providers(context),
  };
};
