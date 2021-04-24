import { Input, InputGroup, InputGroupProps, InputLeftElement, InputProps, InputRightElement } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import { CloseIcon } from '@chakra-ui/icons';
import { FiSearch } from 'react-icons/fi';

type SearchInputProps = Omit<InputGroupProps, 'children'> & {
  onSearch: (value: string) => void;
  inputProps?: InputProps;
  defaultValue?: string;
};

const SearchInput = ({ onSearch, inputProps, defaultValue, ...props }: SearchInputProps) => {
  const [searchValue, setSearchValue] = useState(defaultValue || '');
  const delayedSearch = useRef(debounce(onSearch, 300)).current;

  useEffect(() => {
    delayedSearch(searchValue ?? '');
  }, [searchValue, delayedSearch]);

  return (
    <InputGroup w={['100%', '100%', '100%', '20.5rem', '24.5rem']} {...props}>
      <InputLeftElement children={<FiSearch />} />
      <Input
        type="text"
        placeholder={props.placeholder ?? 'Search'}
        onChange={({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
          setSearchValue(value);
        }}
        value={searchValue || ''}
        rounded={10}
        h="2.5rem"
        {...inputProps}
      />
      {!!searchValue && <InputRightElement as="button" onClick={() => setSearchValue('')} children={<CloseIcon />} />}
    </InputGroup>
  );
};

export default SearchInput;
