import { request } from 'utils/axios';

import { ENDPOINTS } from '@shared/api/endpoints';
import { useMutation } from '@tanstack/react-query';

import { IMessagePayload } from './types';

const createMessage = async (payload: IMessagePayload) => {
  try {
    const { data } = await request.post(ENDPOINTS.CREATE_MESSAGE, payload);
    return data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response.data.meta.message);
  }
};

export const useCreateMessageQuery = () =>
  useMutation({
    mutationFn: (data: IMessagePayload) => createMessage(data),
  });
