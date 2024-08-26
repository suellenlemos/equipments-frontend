import { Stack, Text } from '@chakra-ui/react';
import { SingleValue } from 'chakra-react-select';
import { Equipment } from '../../../../app/entities/Equipment';
import { FileUploadBtn } from './FileUploadBtn';
import { SelectComponent } from './Select';

export interface ToolbarProps {
  value: Equipment | null;
  options: Equipment[];
  onChange: (option: SingleValue<Equipment>) => void;
  isDisabled: boolean;
  onClick: () => void;
}

export const Toolbar = ({
  value,
  options,
  onChange,
  isDisabled,
  onClick,
}: ToolbarProps) => {
  return (
    <Stack
      justifyContent={['center', 'space-between']}
      alignItems={['center', 'center']}
      alignContent="center"
      width="100%"
      paddingBottom="10px"
      display="flex"
      direction={{
        'base': 'column',
        'sm': 'column',
        'md': 'column',
        'lg': 'row',
        'xl': 'row',
        '2xl': 'row',
      }}
      spacing={{
        'base': 4,
        'sm': 4,
        'md': 4,
        'lg': 0,
        'xl': 0,
        '2xl': 0,
      }}>
      <Text
        border="none"
        padding="0px"
        lineHeight="1.50"
        fontSize={['25px', '35px']}
        color="#1E1E1E"
        background="#fff"
        fontWeight="bold">
        Dashboard
      </Text>
      <SelectComponent
        value={value}
        options={options}
        onChange={onChange}
        isDisabled={isDisabled}
      />
      <FileUploadBtn onClick={onClick} />
    </Stack>
  );
};
