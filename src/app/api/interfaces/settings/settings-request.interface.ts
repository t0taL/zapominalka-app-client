import { ISettings } from '../../models/settings.model';


interface ISettingsRequest {
  settings: ISettings;
}

export interface IEditSettingsRequest extends Pick<ISettingsRequest, 'settings'> {
}
