import { AxiosResponse } from 'axios';
import { Equipment } from '../../entities/Equipment';
import { httpClient } from '../httpClient';

export interface EquipmentsResponse {
  dropdown_options: Equipment[];
  total: number;
}

export interface EquipmentsProps {
  pageIndex: number;
  pageSize: number;
}

export const getAll = async () => {
  let result: AxiosResponse<EquipmentsResponse>;

  try {
    result = await httpClient.get(`/equipment?column_name=equipmentId`);
  } catch (err: any) {
    const { message } = err.response.data;
    throw Error(message);
  }

  const { data } = result;

  return data;
};
