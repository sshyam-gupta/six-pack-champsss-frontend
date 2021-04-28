import { Button } from '@chakra-ui/button';
import { Heading, HStack, Spacer, Stack } from '@chakra-ui/layout';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import SearchInput from '../SearchInput';
import ActivityItem from './ActivityItem';

import StaggeredStack from '../motion/StaggeredStack';
import EmptyPlaceholder from '../EmptyPlaceholder';
import useSWR, { mutate } from 'swr';
import { ACTIVITIES } from '../../services/api/endpoints';
import { Spinner } from '@chakra-ui/spinner';
import AddActivity from './AddActivity';
import { useDisclosure } from '@chakra-ui/hooks';

function useActivities() {
  const { data, error } = useSWR(ACTIVITIES);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

function Activities() {
  const { data, isError, isLoading } = useActivities();
  const [activities, setActivities] = useState(data ?? []);
  const [searchText, setSearchText] = useState('');
  const addActivityDisclosure = useDisclosure();

  useEffect(() => {
    setActivities(data);
  }, [data]);

  const activityData = useMemo(() => {
    if (searchText) {
      return (
        activities?.filter(
          activity =>
            activity.description?.toLowerCase().includes(searchText.toLowerCase()) ||
            activity.projectName?.toLowerCase().includes(searchText.toLowerCase()) ||
            activity.status?.toLowerCase().includes(searchText.toLowerCase()),
        ) ?? []
      );
    }

    return activities ?? [];
  }, [searchText, activities]);

  const initiateClose = useCallback(
    data => {
      if (data) {
        setActivities([...activities, data]);
      }
      addActivityDisclosure.onClose();
    },
    [activities],
  );

  const updateActivity = useCallback(() => {
    mutate(ACTIVITIES);
  }, []);

  if (isError) {
    return <EmptyPlaceholder description="Something went wrong!" />;
  }

  if (isLoading) {
    return <Spinner size="lg" />;
  }

  return (
    <Stack spacing={4}>
      <Heading size="lg" as="h6" fontFamily="Comfortaa">
        Activities
      </Heading>
      <AddActivity isOpen={addActivityDisclosure.isOpen} onClose={initiateClose} />
      <HStack>
        <SearchInput placeholder="Search for activity, project or status" onSearch={setSearchText} />
        <Spacer />
        <Button onClick={addActivityDisclosure.onOpen} leftIcon={<AiOutlinePlus />}>
          Add
        </Button>
      </HStack>
      <StaggeredStack>
        {activityData.length ? (
          <Stack spacing={4} maxHeight="30rem" overflow="auto">
            {activityData.map(activity => (
              <ActivityItem key={activity.id} {...activity} onUpdate={updateActivity} />
            ))}
          </Stack>
        ) : (
          <EmptyPlaceholder description="No Activity found" />
        )}
      </StaggeredStack>
    </Stack>
  );
}
export default Activities;
