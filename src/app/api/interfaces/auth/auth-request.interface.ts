interface IAuthRequest {
  name: string;
  email: string;
  password: string;
  token: string;
}

export interface ISignInRequest extends Pick<IAuthRequest, 'email' | 'password'> {
}

export interface ISignUpRequest extends Pick<IAuthRequest, 'name' | 'email' | 'password'> {
}

export interface IPasswordResetRequest extends Pick<IAuthRequest, 'email'> {
}

export interface IPasswordChangeRequest extends Pick<IAuthRequest, 'password' | 'token'> {
}
