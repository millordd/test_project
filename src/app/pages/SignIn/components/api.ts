import { request } from 'utils/axios';

import { ENDPOINTS } from '@shared/api/endpoints';
import { useMutation } from '@tanstack/react-query';

import { IAuthResponse, IRefresTokenPayload, ISignInPayload } from './types';

const signIn = async (payload: ISignInPayload): Promise<IAuthResponse> => {
  try {
    const { data } = await request.post(ENDPOINTS.SIGN_IN, payload);
    return data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response.data.meta.message);
  }
};

export const getRefreshToken = async (payload: IRefresTokenPayload): Promise<IAuthResponse> => {
  try {
    const { data } = await request.post(ENDPOINTS.REFRESH_TOKEN, payload);
    return data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response.data.meta.message);
  }
};

export const useSignInQuery = () =>
  useMutation({
    mutationFn: (data: ISignInPayload) => signIn(data),
  });
