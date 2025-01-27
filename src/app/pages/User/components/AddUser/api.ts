import { request } from 'utils/axios';

import { ENDPOINTS } from '@shared/api/endpoints';
import { useMutation } from '@tanstack/react-query';

import { IAddUserPayload } from './types';

const createUser = async (payload: IAddUserPayload) => {
  try {
    const { data } = await request.post(ENDPOINTS.CREATE_USER, payload);
    return data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response.data.meta.message);
  }
};

export const useCreateUserQuery = () =>
  useMutation({
    mutationFn: (data: IAddUserPayload) => createUser(data),
  });
