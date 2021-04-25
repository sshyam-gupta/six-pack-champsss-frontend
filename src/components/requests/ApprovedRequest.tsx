import { Stack } from '@chakra-ui/layout';
import { ActivityStatus } from '../../util/activity-util';
import StaggeredStack from '../motion/StaggeredStack';
import RequestItem from './RequestItem';
import EmptyPlaceholder from '../EmptyPlaceholder';

const REQUESTS = [
  {
    description: 'Meeting about Hackathon',
    id: 1,
    projectName: 'CoE',
    duration: '30 mins',
    timestamp: '23rd April, 2021',
    status: 'APPROVED' as ActivityStatus,
    points: 5,
    userName: 'Shyam Gupta',
  },
  {
    description: 'KFC meeting',
    id: 2,
    projectName: 'KFC',
    duration: '1 hour',
    timestamp: '23rd April, 2021',
    status: 'APPROVED' as ActivityStatus,
    points: 10,
    userName: 'Mayank Shukla',
  },
  {
    description: 'Interview candidate https://google.com',
    id: 3,
    projectName: 'Hiring',
    duration: '2 hours',
    timestamp: '23rd April, 2021',
    status: 'APPROVED' as ActivityStatus,
    points: 20,
    userName: 'Athira',
  },
  {
    description: 'Hackathon Meeting',
    id: 4,
    projectName: 'CoE',
    duration: '1 hours',
    timestamp: '24th April, 2021',
    status: 'APPROVED' as ActivityStatus,
    points: 5,
    userName: 'Rohan',
  },
  {
    description: 'KFC Meeting',
    id: 5,
    projectName: 'KFC',
    duration: '30 mins',
    timestamp: '24rd April, 2021',
    status: 'APPROVED' as ActivityStatus,
    points: 5,
    userName: 'LargeNameOf anyUserForTEesting',
  },
];

function ApprovedRequest() {
  return (
    <StaggeredStack>
      {REQUESTS.length ? (
        <Stack spacing={4}>
          {REQUESTS.map(activity => (
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
