import { request } from 'utils/axios';

import { ENDPOINTS } from '@shared/api/endpoints';
import { useMutation, useQuery } from '@tanstack/react-query';

import { IEditMessagePayload, IGetMessageResponse, IMessagePayload } from './types';

const getMessages = async (payload: IMessagePayload): Promise<IGetMessageResponse> => {
  try {
    const { data } = await request.post(ENDPOINTS.GET_MESSAGES, payload);
    return data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response.data.meta.message);
  }
};

const updateMessage = async (payload: IEditMessagePayload) => {
  try {
    const { data } = await request.post(ENDPOINTS.UPDATE_MESSAGE, payload);
    return data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response.data.meta.message);
  }
};

const removeMessage = async (payload: { id: number }) => {
  try {
    const { data } = await request.post(ENDPOINTS.REMOVE_MESSAGE, payload);
    return data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response.data.meta.message);
  }
};

export const useUpdateMessageQuery = () =>
  useMutation({
    mutationFn: (data: IEditMessagePayload) => updateMessage(data),
  });

export const useRemoveMessageQuery = () =>
  useMutation({
    mutationFn: (data: { id: number }) => removeMessage(data),
  });

export const useGetMessagesQuery = (payload: IMessagePayload) =>
  useQuery({
    queryKey: ['getMessages', payload],
    queryFn: () => getMessages(payload),
    retry: false,
  });
