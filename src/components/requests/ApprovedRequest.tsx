import { Stack } from '@chakra-ui/layout';
import StaggeredStack from '../motion/StaggeredStack';
import RequestItem from './RequestItem';
import EmptyPlaceholder from '../EmptyPlaceholder';
import useSWR from 'swr';
import fetcher from '../../util/swr-util';
import { Spinner } from '@chakra-ui/spinner';

function useApprovedRequests() {
  const { data, error } = useSWR(`https://60850d5f9b2bed00170417e4.mockapi.io/api/v1/approvedRequests`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

function ApprovedRequest() {
  const { data, isError, isLoading } = useApprovedRequests();

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
            <RequestItem disableCrud key={activity.id} {...activity} />
          ))}
        </Stack>
      ) : (
        <EmptyPlaceholder description="No Request available" />
      )}
    </StaggeredStack>
  );
}

export default ApprovedRequest;
