import { AxiosResponse } from 'axios';
import { Equipment } from '../../entities/Equipment';
import { httpClient } from '../httpClient';

export interface EquipmentsResponse {
  equipments: Equipment[];
  total: number;
}

export const getAll = async (): Promise<EquipmentsResponse> => {
  let result: AxiosResponse;
  try {
    result = await httpClient.get(`/equipment?column_name=equipmentId`);
  } catch (err: any) {
    const { message } = err.response.data;
    throw Error(message);
  }

  const { data } = result;

  return data;
};
