import { IUserData } from '../../models/user-data.model';
import { ITokenData } from '../../models/token-data.model';


interface IAuthResponse {
  userData: IUserData;
  tokenData: ITokenData;
  message: string;
}

export interface IGetUserResponse extends Pick<IAuthResponse, 'userData'> {
}

export interface ISignInResponse extends Pick<IAuthResponse, 'userData' | 'tokenData'> {
}

export interface ISignUpResponse extends Pick<IAuthResponse, 'userData' | 'tokenData'> {
}

export interface IPasswordResetResponse extends Pick<IAuthResponse, 'message'> {
}

export interface IPasswordChangeResponse extends Pick<IAuthResponse, 'message'> {
}
