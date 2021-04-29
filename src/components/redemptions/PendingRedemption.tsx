import { Stack } from '@chakra-ui/layout';
import { useCallback, useEffect, useState } from 'react';
import { Spinner } from '@chakra-ui/spinner';

import StaggeredStack from '../motion/StaggeredStack';
import RedemptionItem from './RedemptionItem';
import EmptyPlaceholder from '../EmptyPlaceholder';
import useSWR, { mutate } from 'swr';

import { Activity } from '../../util/activity-util';
import { ADMIN_ACTIVITIES } from '../../services/api/endpoints';

function usePendingRedemptions() {
  const { data, error } = useSWR(`${ADMIN_ACTIVITIES}?status=pending`);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

function PendingRedemption() {
  const { data, isError, isLoading } = usePendingRedemptions();
  const [requests, setRequests] = useState(data ?? []);

  useEffect(() => {
    setRequests(data);
  }, [data]);

  const updateActivity = useCallback(() => {
    mutate(`${ADMIN_ACTIVITIES}?status=pending`);
  }, []);

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
            <RedemptionItem onUpdate={updateActivity} key={activity.id} {...activity} />
          ))}
        </StaggeredStack>
      ) : (
        <EmptyPlaceholder description="No Request available" />
      )}
    </Stack>
  );
}

export default PendingRedemption;
