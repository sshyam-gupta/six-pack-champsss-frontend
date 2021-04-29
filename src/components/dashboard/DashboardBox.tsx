import { Button } from '@chakra-ui/button';
import { Box, Text } from '@chakra-ui/layout';
import { Stat, StatLabel, StatNumber } from '@chakra-ui/stat';
import NumberFormatter from '../NumberFormatter';

type DashboardBoxProps = {
  bg: string;
  color: string;
  title: string;
  value: number;
  icon: React.ReactNode;
  onRedeem?: () => void;
};

function DashboardBox(props: DashboardBoxProps) {
  return (
    <Box p="1rem" borderRadius="md" boxShadow="md" bg={props.bg} position="relative" minH={['auto', 'auto', '220px']}>
      <Stat zIndex={2}>
        <StatLabel
          display="flex"
          justifyContent="space-between"
          fontSize="md"
          alignItems="flex-start"
          flexDirection={['column', 'column', 'row']}
        >
          <Text>{props.title}</Text>
          {props.onRedeem ? (
            <Button colorScheme="primary" textDecoration="underline" variant="link" onClick={props.onRedeem}>
              Redeem
            </Button>
          ) : null}
        </StatLabel>
        <StatNumber fontSize="4xl" color={props.color}>
          <NumberFormatter value={props.value} />
        </StatNumber>
      </Stat>
      <Box position="absolute" display={['none', 'none', 'block']} inset="0" top="auto">
        {props.icon}
      </Box>
    </Box>
  );
}

export default DashboardBox;
