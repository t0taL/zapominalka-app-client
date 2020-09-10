import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from 'app/api/services/api.service';

import { IEditSettingsRequest } from '@api/interfaces/settings/settings-request.interface';
import { IGetSettingsResponse, IEditSettingsResponse } from '@api/interfaces/settings/settings-response.interface';


@Injectable()
export class SettingsService {
  constructor(private apiService: ApiService) {
  }

  getSettings(): Observable<IGetSettingsResponse> {
    return this.apiService.get<IGetSettingsResponse>('settings');
  }

  editSettings(data: IEditSettingsRequest): Observable<IEditSettingsResponse> {
    return this.apiService.put<IEditSettingsResponse>('settings', data);
  }
}
