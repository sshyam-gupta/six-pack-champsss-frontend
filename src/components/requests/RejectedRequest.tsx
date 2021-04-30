import { Stack } from '@chakra-ui/layout';
import StaggeredStack from '../motion/StaggeredStack';
import RequestItem from './RequestItem';
import EmptyPlaceholder from '../EmptyPlaceholder';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/spinner';
import { ADMIN_ACTIVITIES } from '../../services/api/endpoints';

function useRejectedRequest() {
  const { data, error } = useSWR(`${ADMIN_ACTIVITIES}?status=rejected`);

  return {
    data,
    isLoading: !error && !data,
    hasError: error,
  };
}

function RejectedRequest() {
  const { data, hasError, isLoading } = useRejectedRequest();

  if (hasError) {
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
            <RequestItem disableCrud key={activity.id} {...activity} />
          ))}
        </Stack>
      ) : (
        <EmptyPlaceholder description="No request available" />
      )}
    </StaggeredStack>
  );
}

export default RejectedRequest;
