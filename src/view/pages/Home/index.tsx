import {
  Box,
  IconButton,
  Spinner,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { SingleValue } from 'chakra-react-select';
import { useCallback, useEffect, useState } from 'react';
import { MdRefresh } from 'react-icons/md';
import { Equipment } from '../../../app/entities/Equipment';
import { useEquipments } from '../../../app/hooks/useEquipments';
import { EquipmentsChart } from './components/EquipmentsChart';
import { FileUploadModal } from './components/FileUploadModal';
import { Toolbar } from './components/Toolbar';

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

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleEquipmentChange = useCallback(
    (option: SingleValue<Equipment>) => {
      setEquipment(option);
    },
    []
  );

  const refreshEquipmentList = useCallback(async () => {
    await fetchEquipmentList();
  }, [fetchEquipmentList]);

  const openUploadModal = useCallback(() => {
    setIsUploadModalOpen(true);
  }, []);

  const closeUploadModal = useCallback(async () => {
    setIsUploadModalOpen(false);
    await fetchEquipmentList();
  }, [fetchEquipmentList]);

  useEffect(() => {
    if (equipment) {
      const updatedEquipment = equipmentList.find(
        (e) => e.value === equipment.value
      );
      if (updatedEquipment) {
        setEquipment(updatedEquipment);
      }
    }
  }, [equipmentList, equipment]);

  return (
    <Stack
      display="flex"
      mt={['15px', '20px']}
      spacing={[10, 16]}
      direction="column"
      width="100%"
      justifyContent="flex-start"
      alignContent="center"
      alignItems="center">
      <FileUploadModal
        isUploadModalOpen={isUploadModalOpen}
        closeUploadModal={closeUploadModal}
      />
      <Toolbar
        value={equipment}
        options={equipmentList}
        onChange={handleEquipmentChange}
        isDisabled={isLoadingEquipmentList || hasEquipmentListError}
        onClick={openUploadModal}
      />

      {equipment && (
        <Box
          height={{
            'base': '360px',
            'sm': '360px',
            'md': '400px',
            'lg': '400px',
            'xl': '400px',
            '2xl': '400px',
          }}
          width={{
            'base': '340px',
            'sm': '340px',
            'md': '550px',
            'lg': '550px',
            'xl': '550px',
            '2xl': '550px',
          }}
          paddingBottom={{
            'base': '84px',
            'sm': '84px',
            'md': '64px',
            'lg': '64px',
            'xl': '64px',
            '2xl': '64px',
          }}
          backgroundColor="#F1F1F1"
          borderRadius={32}>
          <Stack
            display="flex"
            direction="row"
            padding={3}
            justifyContent="space-between"
            alignContent="center"
            alignItems="center">
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
            <Tooltip
              label="Refresh Data"
              offset={[0, 2]}
              hasArrow
              placement="top">
              <IconButton
                _hover={{
                  backgroundColor: '#F1F1F1',
                  fontSize: '28px',
                  color: '#1E1E1E',
                }}
                color="#1E1E1E"
                bg="#F1F1F1"
                fontSize="24px"
                icon={<MdRefresh />}
                onClick={refreshEquipmentList}
                aria-label="Refresh Data Button"
              />
            </Tooltip>
          </Stack>
          {isLoadingEquipmentList && !hasEquipmentListError ? (
            <Stack
              justifyContent="center"
              alignContent="center"
              alignItems="center"
              marginTop="120px">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="gray.500"
                boxSize={['20px', '40px']}
              />
            </Stack>
          ) : (
            <EquipmentsChart equipment={equipment} />
          )}
        </Box>
      )}
    </Stack>
  );
};
