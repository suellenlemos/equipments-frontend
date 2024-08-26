import { Select, SingleValue, useChakraSelectProps } from 'chakra-react-select';

import { Equipment } from '../../../../app/entities/Equipment';

export type SelectProps = {
  value: Equipment | null;
  options: Equipment[];
  onChange: (option: SingleValue<Equipment>) => void;
  isDisabled: boolean;
};

export const SelectComponent = ({
  value,
  options,
  onChange,
  isDisabled,
}: SelectProps) => {
  const selectProps = useChakraSelectProps({
    value: value,
    options: options,
    onChange: onChange,
    placeholder: 'Select an equipment',
    isMulti: false,
    isDisabled: isDisabled,
    focusBorderColor: '#1E1E1E',
    menuShouldScrollIntoView: false,
    isClearable: true,
    isSearchable: true,
    backspaceRemovesValue: true,
    closeMenuOnSelect: true,
    chakraStyles: {
      container: (styles) => {
        return {
          ...styles,
          borderRadius: 20,
          backgroundColor: '#fff',
          minHeight: 10,
          maxHeight: 'auto',
          maxWidth: '100%',
          minWidth: '300px',
          position: 'relative',
        };
      },
      dropdownIndicator: (styles) => {
        return {
          ...styles,
          backgroundColor: '#1E1E1E',
          color: 'black',
          padding: '5px',
          fontSize: '17px',
        };
      },
      option: (styles, { isFocused }) => {
        return {
          ...styles,
          backgroundColor: isFocused ? '#1E1E1E' : 'white',
          color: isFocused ? '#fff' : '#1E1E1E',
          justifyContent: 'left',
          fontWeight: 'normal',
          fontSize: '14px',
          display: 'flex',
        };
      },
      singleValue: (styles) => {
        return {
          ...styles,
          backgroundColor: '#fff',
          color: 'black',
          justifyContent: 'left',
          fontSize: '14px',
          whiteSpace: 'normal',
        };
      },
      indicatorsContainer: (styles) => {
        return {
          ...styles,
          borderRight: '1px solid #1E1E1E',
          borderTop: '1px solid #1E1E1E',
          borderBottom: '1px solid #1E1E1E',
        };
      },
      clearIndicator: (styles) => {
        return {
          ...styles,
          'backgroundColor': 'white',
          'color': 'black',
          'fontSize': '9px',
          ':hover': {
            backgroundColor: 'white',
            color: '#1E1E1E',
            fontWeight: 'bold',
          },
        };
      },
      control: (styles) => {
        return {
          ...styles,
          borderRadius: 20,
          backgroundColor: '#fff',
          border: '0px white solid',
          maxWidth: '100%',
          minWidth: '300px',
          position: 'relative',
        };
      },
      menuList: (styles) => {
        return {
          ...styles,
          height: 'auto',
          justifyContent: 'left',
          display: 'flex',
          flexDirection: 'column',
          pt: 1,
          pb: 1,
        };
      },
      menu: (styles) => {
        return {
          ...styles,
          mt: '4px',
          height: 'auto',
        };
      },
      valueContainer: (styles) => {
        return {
          ...styles,
          fontSize: '14px',
          borderLeftRadius: 20,
          align: 'left',
          minHeight: 10,
          maxHeight: '90px',
          width: '230px',
          backgroundColor: '#fff',
          overflowY: 'auto',
          borderLeft: '1px solid #1E1E1E',
          borderTop: '1px solid #1E1E1E',
          borderBottom: '1px solid #1E1E1E',
        };
      },
      downChevron: (styles) => {
        return {
          ...styles,
          color: 'white',
        };
      },
      input: (styles) => {
        return {
          ...styles,
          color: '#1E1E1E',
          fontSize: '14px',
          fontWeight: 'normal',
        };
      },
      noOptionsMessage: (styles) => {
        return {
          ...styles,
          fontSize: '14px',
        };
      },
    },
  });
  return <Select {...selectProps} />;
};
