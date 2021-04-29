import { Avatar } from '@chakra-ui/avatar';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Stack } from '@chakra-ui/layout';
import { getSession, useSession } from 'next-auth/client';
import PageContainer from '../components/layout/PageContainer';
import LoginRequired from '../components/layout/LoginRequired';
import { useCallback, useEffect, useState } from 'react';
import { Button, ButtonGroup } from '@chakra-ui/button';
import ApiService from '../services/api';
import { USERS } from '../services/api/endpoints';
import { useToast } from '@chakra-ui/toast';
import { useDisclosure } from '@chakra-ui/hooks';
import { Session } from 'next-auth';

function MyProfile(props) {
  const [data, loading] = useSession();
  const [name, setName] = useState(data?.user.name ?? '');
  const toast = useToast();
  const isLoadingDisclosure = useDisclosure();

  const [session, setSession] = useState<Session | null>(data);

  useEffect(() => {
    async function getUser() {
      const response = await getSession();
      setSession(response);
    }
    getUser();
  }, []);

  useEffect(() => {
    if (session) {
      setName(session?.user.name);
      return;
    }
  }, [loading, session]);

  const saveUserName = useCallback(async () => {
    if (!name) {
      toast({
        description: 'Name is required',
        status: 'error',
        position: 'top',
        isClosable: true,
      });
      return;
    }
    isLoadingDisclosure.onOpen();
    const { error } = await ApiService.put(`${USERS}/${session?.user.id}`, {
      id: session?.user.id,
      name,
    });

    if (error) {
      toast({
        description: 'Something went wrong',
        status: 'error',
        position: 'top',
        isClosable: true,
      });
      return;
    }

    props.updateSession({
      ...session,
      user: {
        ...session.user,
        name,
      },
    });

    setSession({
      ...session,
      user: {
        ...session.user,
        name,
      },
    });

    toast({
      description: 'Profile updated successfully',
      status: 'success',
      position: 'top',
      isClosable: true,
    });

    isLoadingDisclosure.onClose();
  }, [name, isLoadingDisclosure, session, props, toast]);

  return (
    <LoginRequired>
      <PageContainer maxW="48rem" pageTitle="Profile">
        <Stack spacing={6} alignItems="center" mt="1rem">
          <Avatar size="2xl" name={data?.user.name} src={data?.user.image} />
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <InputGroup>
              <Input
                type="email"
                defaultValue={session?.user.name}
                value={name ?? session?.user.name}
                onChange={e => {
                  setName(e.target.value);
                }}
              />
              {name !== session?.user.name ? (
                <InputRightElement width="10rem">
                  <ButtonGroup>
                    <Button
                      variant="outline"
                      h="1.75rem"
                      size="sm"
                      onClick={() => setName(session?.user.name)}
                      isDisabled={isLoadingDisclosure.isOpen}
                    >
                      Cancel
                    </Button>
                    <Button h="1.75rem" size="sm" onClick={saveUserName} isLoading={isLoadingDisclosure.isOpen}>
                      Save
                    </Button>
                  </ButtonGroup>
                </InputRightElement>
              ) : null}
            </InputGroup>
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input isReadOnly type="email" value={data?.user.email} />
          </FormControl>
        </Stack>
      </PageContainer>
    </LoginRequired>
  );
}

export default MyProfile;
