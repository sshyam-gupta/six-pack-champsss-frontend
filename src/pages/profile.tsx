import { Avatar } from '@chakra-ui/avatar';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Stack } from '@chakra-ui/layout';

import PageContainer from '../components/layout/PageContainer';
import LoginRequired from '../components/layout/LoginRequired';
import { useCallback, useEffect, useState } from 'react';
import { Button, ButtonGroup } from '@chakra-ui/button';
import ApiService from '../services/api';
import { GET_USER, USERS } from '../services/api/endpoints';
import { useToast } from '@chakra-ui/toast';
import { useDisclosure } from '@chakra-ui/hooks';
import { useUser } from '../hooks/use-user';
import { mutate } from 'swr';

function MyProfile() {
  const { isLoading, user = {} } = useUser();

  const [name, setName] = useState(user?.name ?? '');
  const toast = useToast();
  const isLoadingDisclosure = useDisclosure();

  useEffect(() => {
    if (!isLoading) {
      setName(user.name);
    }
  }, [isLoading, user.name]);

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
    const { error } = await ApiService.put(`${USERS}/${user.id}`, {
      id: user.id,
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

    toast({
      description: 'Profile updated successfully',
      status: 'success',
      position: 'top',
      isClosable: true,
    });
    mutate(`${GET_USER}/${user.id}`);

    isLoadingDisclosure.onClose();
  }, [name, isLoadingDisclosure, user.id, toast]);

  return (
    <LoginRequired>
      <PageContainer maxW="48rem" pageTitle="Profile">
        <Stack spacing={6} alignItems="center" mt="1rem">
          <Avatar size="2xl" name={user.name} src={user.image} />
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <InputGroup>
              <Input
                type="email"
                defaultValue={user.name}
                value={name}
                onChange={e => {
                  setName(e.target.value);
                }}
              />
              {name !== user.name ? (
                <InputRightElement width="10rem">
                  <ButtonGroup>
                    <Button
                      variant="outline"
                      h="1.75rem"
                      size="sm"
                      onClick={() => setName(user.name)}
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
            <Input isReadOnly type="email" value={user.email} />
          </FormControl>
        </Stack>
      </PageContainer>
    </LoginRequired>
  );
}

export default MyProfile;
