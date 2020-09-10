interface IUserProfileRequest {
  name: string;
  email: string;
  imageFile: string;
  imageDeleted: boolean;
  previousPassword: string;
  password: string;
}

export interface IEditUserProfileRequest extends Pick<IUserProfileRequest, 'name' | 'email' | 'imageFile' | 'imageDeleted'> {
}

export interface IChangeUserProfilePasswordRequest extends Pick<IUserProfileRequest, 'previousPassword' | 'password'> {
}
