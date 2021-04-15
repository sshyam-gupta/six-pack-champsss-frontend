import { Flex, useColorMode, FlexProps } from '@chakra-ui/react';

export const Container = (props: FlexProps) => {
  const { colorMode } = useColorMode();

  const color = { light: 'black', dark: 'white' };
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      bg={`mode.${colorMode}.primaryBg`}
      color={color[colorMode]}
      {...props}
    />
  );
};
