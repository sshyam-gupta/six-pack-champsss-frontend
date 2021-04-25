import { Button } from '@chakra-ui/button';
import { Heading, HStack, Spacer, Stack } from '@chakra-ui/layout';
import { useMemo, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import SearchInput from '../SearchInput';
import ActivityItem from './ActivityItem';
import { ActivityStatus } from '../../util/activity-util';
import StaggeredStack from '../motion/StaggeredStack';
import EmptyPlaceholder from '../EmptyPlaceholder';

const ACTIVITIES = [
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
    status: 'REJECTED' as ActivityStatus,
    points: 5,
    userName: 'LargeNameOf anyUserForTEesting',
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
      <StaggeredStack>
        {activityData.length ? (
          <Stack spacing={4} maxHeight="30rem" overflow="auto">
            {activityData.map(activity => (
              <ActivityItem key={activity.id} {...activity} />
            ))}
          </Stack>
        ) : (
          <EmptyPlaceholder description="No Activity found" />
        )}
      </StaggeredStack>
    </Stack>
  );
}
export default Activities;
