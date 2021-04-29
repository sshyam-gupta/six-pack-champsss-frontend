import { Stack } from '@chakra-ui/layout';
import StaggeredStack from '../motion/StaggeredStack';
import RedemptionItem from './RedemptionItem';
import EmptyPlaceholder from '../EmptyPlaceholder';
import useSWR from 'swr';

import { Spinner } from '@chakra-ui/spinner';
import { ADMIN_ACTIVITIES } from '../../services/api/endpoints';

function useApprovedRedemptions() {
  const { data, error } = useSWR(`${ADMIN_ACTIVITIES}?status=approved`);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

function ApprovedRedemption() {
  const { data, isError, isLoading } = useApprovedRedemptions();

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
            <RedemptionItem key={activity.id} {...activity} />
          ))}
        </Stack>
      ) : (
        <EmptyPlaceholder description="No Request available" />
      )}
    </StaggeredStack>
  );
}

export default ApprovedRedemption;
