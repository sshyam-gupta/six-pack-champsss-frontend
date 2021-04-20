import React from 'react';
import { Stack, useTheme, useColorMode, Icon } from '@chakra-ui/react';
import { components, PlaceholderProps, IndicatorProps } from 'react-select';
import BaseSelect from './BaseSelect';
import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from '@chakra-ui/icons';

const PlaceholderWithSearch = (props: PlaceholderProps<any>) => {
  return (
    <Stack isInline>
      <Icon as={SearchIcon} />
      <components.Placeholder {...props} />
    </Stack>
  );
};

const DropdownIndicator = (props: IndicatorProps<any>) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        {props.selectProps.menuIsOpen ? <ChevronUpIcon boxSize="1.2rem" /> : <ChevronDownIcon boxSize="1.2rem" />}
      </components.DropdownIndicator>
    )
  );
};

function SelectComponent(restProps: any) {
  const {
    //@ts-ignore
    colors: { mode, gray },
  } = useTheme();
  const { colorMode } = useColorMode();
  return (
    <BaseSelect
      {...restProps}
      components={{
        Placeholder: restProps.isSearchable ? PlaceholderWithSearch : components.Placeholder,
        DropdownIndicator,
        IndicatorSeparator: null,
        ...restProps.components,
      }}
      styles={{
        placeholder: (base, state) => ({
          ...base,
          marginLeft: restProps.isSearchable ? '26px !important' : '5px',
          color: gray[400],
          ...(restProps.styles?.placeholder?.(base, state) ?? {}),
        }),
        menu: (base, state) => ({
          ...base,
          zIndex: 10,
          ...(restProps.styles?.menu?.(base, state) ?? {}),
        }),
        menuPortal: (base: any) => ({
          ...base,
          top: base.top,
          zIndex: 9999,
        }),
        menuList: (base, state) => ({
          ...base,
          backgroundColor: mode[colorMode].cardBg,
          ...(restProps.styles?.menuList?.(base, state) ?? {}),
        }),
        control: (base, state) => ({
          ...base,
          cursor: 'pointer',
          backgroundColor: mode[colorMode].cardBg,
          minHeight: 40,
          borderColor: mode[colorMode].borderColor,
          ...(restProps.styles?.control?.(base, state) ?? {}),
        }),
        container: (base, state) => ({
          ...base,
          fontSize: '0.9rem',
          width: '100%',
          ...(restProps.styles?.container?.(base, state) ?? {}),
        }),
        option: (base, state) => ({
          ...base,
          cursor: 'pointer',
          fontSize: '0.9rem',
          ...(restProps.styles?.option?.(base, state) ?? {}),
        }),
        multiValue: (base, state) => ({
          ...base,
          backgroundColor: mode[colorMode].dimBrand,
          border: `2px solid ${mode[colorMode].dimBrand}`,
          ...(restProps.styles?.multiValue?.(base, state) ?? {}),
        }),
        indicatorSeparator: (base, state) => ({
          ...base,
          ...(restProps.styles?.indicatorSeparator?.(base, state) ?? {}),
        }),
        valueContainer: (base, state) => ({
          ...base,
          ...(restProps.styles?.valueContainer?.(base, state) ?? {}),
        }),
        indicatorsContainer: (base, state) => ({
          ...base,
          ...(restProps.styles?.indicatorsContainer?.(base, state) ?? {}),
        }),
        singleValue: (base, state) => ({
          ...base,
          ...(restProps.styles?.singleValue?.(base, state) ?? {}),
        }),
      }}
    />
  );
}

SelectComponent.defaultProps = {
  maxMenuHeight: 200,
  isSearchable: true,
};

export default SelectComponent;
