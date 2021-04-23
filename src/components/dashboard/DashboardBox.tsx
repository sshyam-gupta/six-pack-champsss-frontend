import { Box } from '@chakra-ui/layout';
import { Stat, StatLabel, StatNumber } from '@chakra-ui/stat';
import NumberFormatter from '../NumberFormatter';

type DashboardBoxProps = {
  bg: string;
  color: string;
  title: string;
  value: number;
};

function DashboardBox(props: DashboardBoxProps) {
  return (
    <Box p="1rem" borderRadius="md" boxShadow="md" bg={props.bg}>
      <Stat>
        <StatLabel fontSize="md">{props.title}</StatLabel>
        <StatNumber fontSize="4xl" color={props.color}>
          <NumberFormatter value={props.value} />
        </StatNumber>
      </Stat>
    </Box>
  );
}

export default DashboardBox;
