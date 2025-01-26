export interface ISignInPayload {
  userLogin: string;
  password: string;
}
export interface IAuthResponse {
  accessToken: string;
  tokenType: 'BEARER';
  expireTime: number;
  refreshToken: string;
}
export interface IRefresTokenPayload {
  refreshToken: string;
}
