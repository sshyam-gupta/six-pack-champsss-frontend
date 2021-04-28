import { Text } from '@chakra-ui/layout';
import { useMediaQuery } from '@chakra-ui/media-query';
import { useColorModeValue } from '@chakra-ui/system';
import { ResponsivePie, PieSvgProps } from '@nivo/pie';
import React from 'react';

function PieChart<RawData>(props: Partial<PieSvgProps<RawData>>) {
  const [isLargerThan786] = useMediaQuery('(min-width: 786px)');
  const fontColor = useColorModeValue('black', 'white');

  return (
    <ResponsivePie
      margin={{ bottom: 30, top: isLargerThan786 ? 30 : -10 }}
      innerRadius={0.6}
      colors={{ scheme: 'set1' }}
      padAngle={0.7}
      cornerRadius={0}
      activeOuterRadiusOffset={4}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
      enableArcLabels={false}
      enableArcLinkLabels={isLargerThan786}
      arcLinkLabelsTextColor={fontColor}
      tooltip={({ datum: { id, value } }: any) => (
        <Text px="12px" py="6px" borderRadius="md" as="strong" color="black" bg="white">
          {id}: {value}
        </Text>
      )}
      legends={
        !isLargerThan786
          ? [
              {
                anchor: 'bottom',
                direction: 'column',
                translateX: 0,
                translateY: 20,
                itemsSpacing: 0,
                itemWidth: 60,
                itemHeight: 15,
                itemOpacity: 1,
                symbolSize: 10,
                symbolShape: 'circle',
                itemTextColor: fontColor,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: fontColor,
                    },
                  },
                ],
              },
            ]
          : []
      }
      data={props.data}
    />
  );
}

export default PieChart;
