import { IUserProfile } from '../../models/user-profile.model';
import { ITokenData } from '../../models/token-data.model';


interface IUserProfileResponse {
  userProfile: IUserProfile;
  tokenData: ITokenData;
  message: string;
}

export interface IGetUserProfileResponse extends Pick<IUserProfileResponse, 'userProfile'> {
}

export interface IEditUserProfileResponse extends Pick<IUserProfileResponse, 'userProfile' | 'tokenData'> {
}

export interface IChangeUserProfilePasswordResponse extends Pick<IUserProfileResponse, 'message'> {
}
