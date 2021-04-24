import { Button } from '@chakra-ui/button';
import { VStack, Heading, HStack, Spacer, Stack, Text } from '@chakra-ui/layout';
import { useMemo, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { NoActivities } from '../lottie/PlaceholderIcons';
import SearchInput from '../SearchInput';
import ActivityItem from './ActivityItem';
import { ActivityStatus } from '../../util/activity-util';

const ACTIVITIES = [
  {
    description: 'Meeting about Hackathon',
    id: 1,
    projectName: 'CoE',
    duration: '30 mins',
    timestamp: '23rd April, 2021',
    status: 'PENDING' as ActivityStatus,
    points: 5,
  },
  {
    description: 'KFC meeting',
    id: 2,
    projectName: 'KFC',
    duration: '1 hour',
    timestamp: '23rd April, 2021',
    status: 'PENDING' as ActivityStatus,
    points: 10,
  },
  {
    description: 'Interview candidate https://google.com',
    id: 3,
    projectName: 'Hiring',
    duration: '2 hours',
    timestamp: '23rd April, 2021',
    status: 'APPROVED' as ActivityStatus,
    points: 20,
  },
  {
    description: 'Hackathon Meeting',
    id: 4,
    projectName: 'CoE',
    duration: '1 hours',
    timestamp: '24th April, 2021',
    status: 'APPROVED' as ActivityStatus,
    points: 5,
  },
  {
    description: 'KFC Meeting',
    id: 5,
    projectName: 'KFC',
    duration: '30 mins',
    timestamp: '24rd April, 2021',
    status: 'REJECTED' as ActivityStatus,
    points: 5,
  },
];

function Activities() {
  const [searchText, setSearchText] = useState('');

  const activityData = useMemo(() => {
    if (searchText) {
      return ACTIVITIES?.filter(
        activity =>
          activity.description?.toLowerCase().includes(searchText.toLowerCase()) ||
          activity.projectName?.toLowerCase().includes(searchText.toLowerCase()) ||
          activity.status?.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    return ACTIVITIES;
  }, [searchText]);
  return (
    <Stack spacing={4}>
      <Heading size="lg" as="h6" fontFamily="Comfortaa">
        Activities
      </Heading>
      <HStack>
        <SearchInput placeholder="Search for activity, project or status" onSearch={setSearchText} />
        <Spacer />
        <Button leftIcon={<AiOutlinePlus />}>Add</Button>
      </HStack>
      <Stack>
        {activityData.length ? (
          <Stack spacing={4} maxHeight="30rem" overflow="auto">
            {activityData.map(activity => (
              <ActivityItem key={activity.id} {...activity} />
            ))}
          </Stack>
        ) : (
          <VStack spacing={4} py="2rem">
            <NoActivities width="20rem" />
            <Text fontSize="lg">No Activity found</Text>
          </VStack>
        )}
      </Stack>
    </Stack>
  );
}
export default Activities;
