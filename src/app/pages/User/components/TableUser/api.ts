import { request } from 'utils/axios';

import { ENDPOINTS } from '@shared/api/endpoints';
import { useMutation, useQuery } from '@tanstack/react-query';

import { IEditUserPayload, IGetUsersPayload, IUserList } from './types';

const getUser = async (payload: IGetUsersPayload): Promise<IUserList> => {
  try {
    const { data } = await request.post(ENDPOINTS.GET_USERS, payload);
    return data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response.data.meta.message);
  }
};

const updateUser = async (payload: IEditUserPayload) => {
  try {
    const { data } = await request.post(ENDPOINTS.UPDATE_USER, payload);
    return data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response.data.meta.message);
  }
};

export const useUpdateUserQuery = () =>
  useMutation({
    mutationFn: (data: IEditUserPayload) => updateUser(data),
  });

export const useGetUsersQuery = (payload: IGetUsersPayload) =>
  useQuery({
    queryKey: ['getUsers', payload],
    queryFn: () => getUser(payload),
    retry: false,
  });
