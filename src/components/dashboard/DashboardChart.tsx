import { Box, Text } from '@chakra-ui/layout';
import DonutChart from '../chart/PieChart';
import * as AppData from '../../constants/app.json';
import { Stat, StatLabel, StatNumber } from '@chakra-ui/stat';
import NumberFormatter from '../NumberFormatter';

type DashboardChartProps = {
  bg: string;
  data: {
    id: string;
    label: string;
    value: number;
  }[];
};

function DashboardChart(props: DashboardChartProps) {
  const total = props.data?.reduce((acc: number, i: any) => acc + i.value, 0);
  return (
    <Box bg={props.bg} borderRadius="md" boxShadow="md" p="1rem" h="full" minH="15rem">
      <Stat position="absolute">
        <StatLabel
          display="flex"
          justifyContent="space-between"
          fontSize="md"
          alignItems="flex-start"
          flexDirection={['column', 'column', 'row']}
        >
          <Text fontSize="md">Total {AppData.points} </Text>
        </StatLabel>
        <StatNumber fontSize="4xl" color="primary.500">
          <NumberFormatter value={total ?? 0} />
        </StatNumber>
      </Stat>
      <Box h="12rem" mt="1.5rem" p="0.75rem">
        <DonutChart data={props.data} />
      </Box>
    </Box>
  );
}

export default DashboardChart;
