import { Stack, Text, VStack } from '@chakra-ui/layout';
import { useCallback, useState } from 'react';
import { ActivityStatus } from '../../util/activity-util';
import { NoActivities } from '../lottie/PlaceholderIcons';
import RequestItem from './RequestItem';

const REQUESTS = [
  {
    description: 'Meeting about Hackathon',
    id: 1,
    projectName: 'CoE',
    duration: '30 mins',
    timestamp: '23rd April, 2021',
    status: 'PENDING' as ActivityStatus,
    points: 5,
    userName: 'Shyam Gupta',
  },
  {
    description: 'KFC meeting',
    id: 2,
    projectName: 'KFC',
    duration: '1 hour',
    timestamp: '23rd April, 2021',
    status: 'PENDING' as ActivityStatus,
    points: 10,
    userName: 'Mayank Shukla',
  },
  {
    description: 'Interview candidate https://google.com',
    id: 3,
    projectName: 'Hiring',
    duration: '2 hours',
    timestamp: '23rd April, 2021',
    status: 'PENDING' as ActivityStatus,
    points: 20,
    userName: 'Athira',
  },
  {
    description: 'Hackathon Meeting',
    id: 4,
    projectName: 'CoE',
    duration: '1 hours',
    timestamp: '24th April, 2021',
    status: 'PENDING' as ActivityStatus,
    points: 5,
    userName: 'Rohan',
  },
  {
    description: 'KFC Meeting',
    id: 5,
    projectName: 'KFC',
    duration: '30 mins',
    timestamp: '24rd April, 2021',
    status: 'PENDING' as ActivityStatus,
    points: 5,
    userName: 'LargeNameOf anyUserForTEesting',
  },
];

function PendingRequest() {
  const [requests, setRequests] = useState(REQUESTS);
  const updateActivity = useCallback(
    activity => {
      setRequests(requests.filter(req => req.id !== activity.id));
    },
    [requests],
  );
  return (
    <Stack maxHeight="30rem" overflow="scroll">
      {requests.length ? (
        <Stack spacing={4} maxHeight="30rem" overflow="auto">
          {requests.map(activity => (
            <RequestItem
              onUpdate={() => {
                updateActivity(activity);
              }}
              disableCrud
              key={activity.id}
              {...activity}
            />
          ))}
        </Stack>
      ) : (
        <VStack spacing={4} py="2rem">
          <NoActivities width="20rem" />
          <Text fontSize="lg">No Request available</Text>
        </VStack>
      )}
    </Stack>
  );
}

export default PendingRequest;
