import { Box } from '@chakra-ui/layout';
import { Stat, StatLabel, StatNumber } from '@chakra-ui/stat';
import NumberFormatter from '../NumberFormatter';

type DashboardBoxProps = {
  bg: string;
  color: string;
  title: string;
  value: number;
  icon: React.ReactNode;
};

function DashboardBox(props: DashboardBoxProps) {
  return (
    <Box p="1rem" borderRadius="md" boxShadow="md" bg={props.bg} position="relative">
      <Stat zIndex={2}>
        <StatLabel fontSize="md">{props.title}</StatLabel>
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
