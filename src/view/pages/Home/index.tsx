import { Box, Spinner, Stack, Text } from '@chakra-ui/react';
import { SingleValue } from 'chakra-react-select';
import { useCallback, useEffect, useState } from 'react';
import { Equipment } from '../../../app/entities/Equipment';
import { useEquipments } from '../../../app/hooks/useEquipments';
import { EquipmentsChart } from './components/EquipmentsChart';
import { SelectComponent } from './components/Select';

export const Home = () => {
  const {
    isLoadingEquipmentList,
    equipmentList,
    hasEquipmentListError,
    fetchEquipmentList,
  } = useEquipments();

  useEffect(() => {
    fetchEquipmentList();
  }, [fetchEquipmentList]);

  const [equipment, setEquipment] = useState<Equipment | null>(null);

  const handleEquipmentChange = useCallback(
    (option: SingleValue<Equipment>) => {
      setEquipment(option);
    },
    []
  );

  return (
    <Stack
      width="100%"
      justifyContent="flex-start"
      alignContent="center"
      alignItems={['stretch', 'flex-start']}
      display="flex"
      mt="10px"
      gap={1}
      direction={['column', 'row']}>
      <Text
        border="none"
        padding="0px"
        lineHeight="1.50"
        fontSize="35px"
        color="#1E1E1E"
        background="#fff"
        fontWeight="bold">
        Dashboard
      </Text>

      <Stack
        flex="2"
        justifyContent="flex-start"
        alignContent="center"
        alignItems="center"
        mt="14px"
        gap={12}>
        <SelectComponent
          value={equipment}
          options={equipmentList}
          onChange={handleEquipmentChange}
          isDisabled={isLoadingEquipmentList || hasEquipmentListError}
        />
        {!isLoadingEquipmentList && !hasEquipmentListError && equipment && (
          <Box backgroundColor="#F1F1F1" padding="20px" borderRadius={32}>
            <Text
              borderRadius="0px"
              border="none"
              padding="0px"
              paddingLeft="15px"
              lineHeight="1.50"
              fontSize="20px"
              color="#1E1E1E"
              background="#F1F1F1"
              fontWeight="bold">
              Equipment's Value Average
            </Text>
            <EquipmentsChart
              value={equipment.value}
              last_24={equipment.last_24}
              last_48={equipment.last_48}
              last_week={equipment.last_week}
              last_month={equipment.last_month}
            />
          </Box>
        )}
        {isLoadingEquipmentList && (
          <Stack
            justifyContent="center"
            alignContent="center"
            alignItems="center"
            marginTop={['90px', '120px']}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="gray.500"
              boxSize={['90px', '130px']}
            />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
