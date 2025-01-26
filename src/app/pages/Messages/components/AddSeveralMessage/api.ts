import { request } from 'utils/axios';

import { ENDPOINTS } from '@shared/api/endpoints';
import { useMutation } from '@tanstack/react-query';

import { ISeveralMessagePayload } from './types';

const createSeveralMessage = async (payload: ISeveralMessagePayload) => {
  try {
    const { data } = await request.post(ENDPOINTS.CREATE_SEVERAL_MESSAGES, payload);
    return data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response.data.meta.message);
  }
};

export const useCreateSeveralMessageQuery = () =>
  useMutation({
    mutationFn: (data: ISeveralMessagePayload) => createSeveralMessage(data),
  });
