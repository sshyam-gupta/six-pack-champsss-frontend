import { useColorMode } from '@chakra-ui/color-mode';
import { forwardRef } from '@chakra-ui/system';
import Select, { Props } from 'react-select';

const BaseSelect = (props: Props, ref: any) => {
  const { colorMode } = useColorMode();
  const isLightMode = colorMode === 'light';

  return (
    <Select
      ref={ref}
      menuPortalTarget={document.body}
      {...props}
      theme={theme => ({
        ...theme,
        colors: {
          ...theme.colors,
          neutral0: isLightMode ? theme.colors.neutral0 : theme.colors.neutral90,
          neutral5: isLightMode ? theme.colors.neutral5 : theme.colors.neutral80,
          neutral10: isLightMode ? theme.colors.neutral10 : theme.colors.neutral70,
          neutral20: isLightMode ? theme.colors.neutral20 : theme.colors.neutral60,
          neutral30: isLightMode ? theme.colors.neutral30 : theme.colors.neutral50,
          neutral40: theme.colors.neutral40,
          neutral50: isLightMode ? theme.colors.neutral50 : theme.colors.neutral30,
          neutral60: isLightMode ? theme.colors.neutral60 : theme.colors.neutral20,
          neutral70: isLightMode ? theme.colors.neutral70 : theme.colors.neutral10,
          neutral80: isLightMode ? theme.colors.neutral80 : theme.colors.neutral5,
          neutral90: isLightMode ? theme.colors.neutral90 : theme.colors.neutral0,
          primary25: isLightMode ? theme.colors.primary25 : theme.colors.primary75,
          primary75: isLightMode ? theme.colors.primary75 : theme.colors.primary25,
        },
      })}
    />
  );
};

export default forwardRef(BaseSelect);
