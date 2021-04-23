import Select, { Props } from 'react-select';
// import { useTheme, useColorMode } from '@chakra-ui/react';

const BaseSelect = (props: Props) => {
  /*   const {
    // @ts-ignore
    colors: { mode, primary },
  } = useTheme();
  const { colorMode } = useColorMode(); */

  return (
    <Select
      menuPortalTarget={document.body}
      {...props}
      theme={theme => ({
        ...theme,
        colors: {
          ...theme.colors,
        //   TODO override colors here.
        },
      })}
    />
  );
};
export default BaseSelect;
