import { Box } from '@chakra-ui/layout';
import DonutChart from '../chart/PieChart';

type DashboardChartProps = {
  bg: string;
  data: {
    id: string;
    label: string;
    value: number;
  }[];
};

function DashboardChart(props: DashboardChartProps) {
  return (
    <Box bg={props.bg} borderRadius="md" boxShadow="md" p="1rem" h="full" minH="15rem">
      <DonutChart data={props.data} />
    </Box>
  );
}

export default DashboardChart;
