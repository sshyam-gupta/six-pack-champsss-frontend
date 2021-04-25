import { Stack } from '@chakra-ui/layout';
import { useCallback, useEffect, useState } from 'react';
import StaggeredStack from '../motion/StaggeredStack';
import RequestItem from './RequestItem';
import EmptyPlaceholder from '../EmptyPlaceholder';
import useSWR from 'swr';
import fetcher from '../../util/swr-util';
import { Spinner } from '@chakra-ui/spinner';
import { Activity } from '../../util/activity-util';

function usePendingRequests() {
  const { data, error } = useSWR(`https://60850d5f9b2bed00170417e4.mockapi.io/api/v1/pendingRequests`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

function PendingRequest() {
  const { data, isError, isLoading } = usePendingRequests();
  const [requests, setRequests] = useState(data ?? []);

  useEffect(() => {
    setRequests(data);
  }, [data]);

  const updateActivity = useCallback(
    activity => {
      setRequests(requests.filter(req => req.id !== activity.id));
    },
    [requests],
  );

  if (isError) {
    return <EmptyPlaceholder description="Something went wrong!" />;
  }

  if (isLoading) {
    return <Spinner size="lg" />;
  }

  return (
    <Stack>
      {requests?.length ? (
        <StaggeredStack spacing={4}>
          {requests.map((activity: Activity) => (
            <RequestItem
              onUpdate={() => {
                updateActivity(activity);
              }}
              key={activity.id}
              {...activity}
            />
          ))}
        </StaggeredStack>
      ) : (
        <EmptyPlaceholder description="No Request available" />
      )}
    </Stack>
  );
}

export default PendingRequest;
