import { Box, Text } from '@chakra-ui/layout';

type DashboardChartProps = {
  bg: string;
  title: string;
};

function DashboardChart(props: DashboardChartProps) {
  return (
    <Box bg={props.bg} borderRadius="md" boxShadow="md" p="1rem" h="full">
      <Text fontWeight="500">{props.title}</Text>
    </Box>
  );
}

export default DashboardChart;
