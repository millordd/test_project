import { request } from 'utils/axios';

import { ENDPOINTS } from '@shared/api/endpoints';
import { useMutation, useQuery } from '@tanstack/react-query';

import { INotification } from './types';

const getNotifications = async (): Promise<INotification[]> => {
  try {
    const { data } = await request.get(ENDPOINTS.GET_NOTIFICATIONS);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response.data.meta.message);
  }
};

const seenNotifications = async (params: number[]) => {
  try {
    const { data } = await request.put(ENDPOINTS.EDIT_NOTIFICATIONS_STATUS, params);
    return data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response.data.meta.message);
  }
};

export const useGetNotificationQuery = () => {
  return useQuery({
    queryKey: ['getNotifications'],
    queryFn: getNotifications,
  });
};

export const useSeenNotifications = () => {
  return useMutation({
    mutationFn: seenNotifications,
  });
};
