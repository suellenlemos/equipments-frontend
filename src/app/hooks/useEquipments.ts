import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import { Equipment } from '../entities/Equipment';
import { equipmentsService } from '../services/equipmentsService';

export const useEquipments = () => {
  const [isLoadingEquipmentList, setIsLoadingEquipmentList] =
    useState<boolean>(true);

  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);

  const [hasEquipmentListError, setHasEquipmentListError] =
    useState<boolean>(false);

  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchEquipmentList = useCallback(async (): Promise<void> => {
    try {
      setIsLoadingEquipmentList(true);
      const result = await equipmentsService.getAll();
      setEquipmentList(result.dropdown_options);
      setTotalCount(result.total);
      setHasEquipmentListError(false);
    } catch (error) {
      setHasEquipmentListError(true);
      toast.error(
        'An unknown error occurred trying to load equipments data. Reload your page or try again later.'
      );
    } finally {
      setIsLoadingEquipmentList(false);
    }
  }, []);

  return {
    isLoadingEquipmentList,
    setIsLoadingEquipmentList,
    equipmentList,
    setEquipmentList,
    hasEquipmentListError,
    setHasEquipmentListError,
    totalCount,
    setTotalCount,
    fetchEquipmentList,
  };
};