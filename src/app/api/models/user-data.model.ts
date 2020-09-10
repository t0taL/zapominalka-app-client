import { IUserProfile } from './user-profile.model';
import { ISettings } from './settings.model';


export interface IUserData {
  user: IAuthUser;
  settings: IAuthSettings;
}

export interface IAuthUser extends Pick<IUserProfile, 'name' | 'avatar'> {
}

export interface IAuthSettings extends Pick<ISettings, 'timerCount' | 'theme'> {
}
