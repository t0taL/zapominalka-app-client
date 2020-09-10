import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from 'app/api/services/api.service';

import {
  IEditUserProfileRequest,
  IChangeUserProfilePasswordRequest
} from '@api/interfaces/user-profile/user-profile-request.interface';
import {
  IGetUserProfileResponse,
  IEditUserProfileResponse,
  IChangeUserProfilePasswordResponse
} from '@api/interfaces/user-profile/user-profile-response.interface';


@Injectable()
export class UserProfileService {
  constructor(private apiService: ApiService) {
  }

  getUserProfile(): Observable<IGetUserProfileResponse> {
    return this.apiService.get<IGetUserProfileResponse>('user-profile');
  }

  editUserProfile(data: IEditUserProfileRequest): Observable<IEditUserProfileResponse> {
    return this.apiService.putFormData<IEditUserProfileResponse>('user-profile', data);
  }

  changeUserProfilePassword(data: IChangeUserProfilePasswordRequest): Observable<IChangeUserProfilePasswordResponse> {
    return this.apiService.put<IChangeUserProfilePasswordResponse>('user-profile/password', data);
  }
}
