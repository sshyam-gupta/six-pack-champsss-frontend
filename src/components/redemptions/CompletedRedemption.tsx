import { Stack } from '@chakra-ui/layout';
import StaggeredStack from '../motion/StaggeredStack';
import RedemptionItem from './RedemptionItem';
import EmptyPlaceholder from '../EmptyPlaceholder';
import useSWR from 'swr';

import { Spinner } from '@chakra-ui/spinner';
import { REDEEM_REQUESTS } from '../../services/api/endpoints';

function useCompletedRedemptions() {
  const { data, error } = useSWR(`${REDEEM_REQUESTS}?status=completed`);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

function CompletedRedemption() {
  const { data, isError, isLoading } = useCompletedRedemptions();

  if (isError) {
    return <EmptyPlaceholder description="Something went wrong!" />;
  }

  if (isLoading) {
    return <Spinner size="lg" />;
  }

  return (
    <StaggeredStack>
      {data.length ? (
        <Stack spacing={4}>
          {data.map(activity => (
            <RedemptionItem key={activity.id} {...activity} disableCrud />
          ))}
        </Stack>
      ) : (
        <EmptyPlaceholder description="No Request available" />
      )}
    </StaggeredStack>
  );
}

export default CompletedRedemption;
