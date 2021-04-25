import { Text, VStack } from '@chakra-ui/layout';
import { NoActivities } from './lottie/PlaceholderIcons';

function EmptyPlaceholder(props: { description: string }) {
  return (
    <VStack spacing={4} py="2rem">
      <NoActivities width="20rem" />
      <Text fontSize="lg">{props.description}</Text>
    </VStack>
  );
}

export default EmptyPlaceholder;
