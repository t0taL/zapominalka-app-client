import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '@api/services/api.service';

import {
  ISignInRequest,
  ISignUpRequest,
  IPasswordResetRequest,
  IPasswordChangeRequest
} from '@api/interfaces/auth/auth-request.interface';
import {
  IGetUserResponse,
  ISignInResponse,
  ISignUpResponse,
  IPasswordResetResponse,
  IPasswordChangeResponse
} from '@api/interfaces/auth/auth-response.interface';


@Injectable()
export class AuthService {
  constructor(private apiService: ApiService) {
  }

  getUser(): Observable<IGetUserResponse> {
    return this.apiService.get<IGetUserResponse>('auth/user');
  }

  signIn(data: ISignInRequest): Observable<ISignInResponse> {
    return this.apiService.post<ISignInResponse>('auth/sign-in', data);
  }

  signUp(data: ISignUpRequest): Observable<ISignUpResponse> {
    return this.apiService.post<ISignUpResponse>('auth/sign-up', data);
  }

  resetPassword(data: IPasswordResetRequest): Observable<IPasswordResetResponse> {
    return this.apiService.post<IPasswordResetResponse>('auth/reset-password', data);
  }

  changePassword(data: IPasswordChangeRequest): Observable<IPasswordChangeResponse> {
    return this.apiService.post<IPasswordChangeResponse>('auth/change-password', data);
  }
}
