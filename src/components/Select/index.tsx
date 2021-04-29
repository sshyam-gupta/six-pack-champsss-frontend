import React from 'react';
import { Stack, Icon, Avatar, Text, forwardRef } from '@chakra-ui/react';
import { components } from 'react-select';
import BaseSelect from './BaseSelect';
import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from '@chakra-ui/icons';

const PlaceholderWithSearch = props => {
  return (
    <Stack isInline>
      <Icon as={SearchIcon} />
      <components.Placeholder {...props} />
    </Stack>
  );
};

const DropdownIndicator = props => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        {props.selectProps.menuIsOpen ? <ChevronUpIcon boxSize="1.2rem" /> : <ChevronDownIcon boxSize="1.2rem" />}
      </components.DropdownIndicator>
    )
  );
};
export function SingleValueLabel(props: any) {
  return <components.SingleValue {...props}>{props.data.label}</components.SingleValue>;
}
export function MultiValueLabel(props: any) {
  return <components.MultiValueLabel {...props}>{props.data.label}</components.MultiValueLabel>;
}
export function FormatOptionLabel(props: any) {
  return (
    <Stack
      isInline
      spacing={4}
      key={props.id}
      alignItems="center"
      mx={1}
      justifyContent="space-between"
      cursor="pointer"
    >
      <Stack isInline spacing={4} alignItems="center">
        <Avatar name={props.name} size="sm" src={props.image} />
        <Stack spacing={0}>
          <Text fontSize="md">{props.name}</Text>
          <Text fontSize="sm">{props.email}</Text>
        </Stack>
      </Stack>
    </Stack>
  );
}

const SelectComponent = forwardRef((restProps: any, ref: any) => {
  return (
    <BaseSelect
      isClearable
      ref={ref}
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
          ...(restProps.styles?.placeholder?.(base, state) ?? {}),
        }),
        menu: (base, state) => ({
          ...base,
          zIndex: 10,
          ...(restProps.styles?.menu?.(base, state) ?? {}),
        }),
        menuPortal: (base: any) => ({
          ...base,
          zIndex: 9999,
        }),
        control: (base, state) => ({
          ...base,
          minHeight: 40,
          ...(restProps.styles?.control?.(base, state) ?? {}),
        }),
        container: (base, state) => ({
          ...base,
          fontSize: '0.875rem',
          width: '100%',
          ...(restProps.styles?.container?.(base, state) ?? {}),
        }),
        option: (base, state) => ({
          ...base,
          fontSize: '0.875rem',
          ...(restProps.styles?.option?.(base, state) ?? {}),
        }),
      }}
    />
  );
});

SelectComponent.defaultProps = {
  maxMenuHeight: 200,
};

export default SelectComponent;
