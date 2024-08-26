import { AxiosResponse } from 'axios';
import { httpClient } from '../httpClient';

export interface IUploadFile {
  message: string;
}

export const uploadFile = async ({
  file,
}: {
  file: File;
}): Promise<IUploadFile> => {
  let result: AxiosResponse;

  const formData = new FormData();

  formData.append('file', file);

  try {
    result = await httpClient.post(`/equipment/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (err: any) {
    const { message } = err.response.data;
    throw Error(message);
  }

  const { data } = result;

  return data;
};
