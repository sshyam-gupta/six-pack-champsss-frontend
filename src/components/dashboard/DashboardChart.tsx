import { Box } from '@chakra-ui/layout';
import DonutChart from '../chart/PieChart';

type DashboardChartProps = {
  bg: string;
  title: string;
};

function DashboardChart(props: DashboardChartProps) {
  return (
    <Box bg={props.bg} borderRadius="md" boxShadow="md" p="1rem" h="full" minH="15rem">
      <DonutChart
        data={[
          {
            id: 'Hiring',
            label: 'Hiring',
            value: 50,
          },
          {
            id: 'CoE',
            label: 'CoE',
            value: 100,
          },
          {
            id: 'KFC',
            label: 'KFC',
            value: 75,
          },
        ]}
      />
    </Box>
  );
}

export default DashboardChart;
