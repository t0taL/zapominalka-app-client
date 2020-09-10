import { ISettings } from '../../models/settings.model';


interface ISettingsResponse {
  settings: ISettings;
}

export interface IGetSettingsResponse extends Pick<ISettingsResponse, 'settings'> {
}

export interface IEditSettingsResponse extends Pick<ISettingsResponse, 'settings'> {
}
