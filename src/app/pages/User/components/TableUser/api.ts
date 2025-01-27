import { request } from 'utils/axios';

import { ENDPOINTS } from '@shared/api/endpoints';
import { useQuery } from '@tanstack/react-query';

import { IGetUsersPayload, IUserList } from './types';

const getUser = async (payload: IGetUsersPayload): Promise<IUserList> => {
  try {
    const { data } = await request.post(ENDPOINTS.GET_USERS, payload);
    return data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response.data.meta.message);
  }
};

export const useGetUsersQuery = (payload: IGetUsersPayload) =>
  useQuery({
    queryKey: ['getAllCompany', payload],
    queryFn: () => getUser(payload),
  });
