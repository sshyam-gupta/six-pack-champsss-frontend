import { Stack } from '@chakra-ui/layout';
import { useCallback, useEffect, useState } from 'react';
import { Spinner } from '@chakra-ui/spinner';

import StaggeredStack from '../motion/StaggeredStack';
import RedemptionItem from './RedemptionItem';
import EmptyPlaceholder from '../EmptyPlaceholder';
import useSWR, { mutate } from 'swr';

import { Redemption } from '../../util/activity-util';
import { REDEEM_REQUESTS } from '../../services/api/endpoints';

function usePendingRedemptions() {
  const { data, error } = useSWR(`${REDEEM_REQUESTS}?status=pending`);

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
    mutate(`${REDEEM_REQUESTS}?status=pending`);
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
          {requests.map((activity: Redemption) => (
            <RedemptionItem onUpdate={updateActivity} key={activity.id} {...activity} />
          ))}
        </StaggeredStack>
      ) : (
        <EmptyPlaceholder description="No request available" />
      )}
    </Stack>
  );
}

export default PendingRedemption;
