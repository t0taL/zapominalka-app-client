import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@shared/shared.module';
import { UserProfileRoutingModule } from './user-profile-routing.module';

import { UserProfileService } from './services/user-profile.service';

import { userProfileFeatureKey, userProfileReducer, userProfileInitialState } from './+state/user-profile.reducer';
import { UserProfileEffects } from './+state/user-profile.effects';
import { UserProfileFacade } from './+state/user-profile.facade';

import { UserProfileViewComponent } from './components/user-profile-view/user-profile-view.component';
import { UserProfileEditComponent } from './components/user-profile-edit/user-profile-edit.component';
import { UserProfileChangePasswordComponent } from './components/user-profile-change-password/user-profile-change-password.component';


@NgModule({
  declarations: [ UserProfileViewComponent, UserProfileEditComponent, UserProfileChangePasswordComponent ],
  imports: [
    CommonModule,
    SharedModule,
    UserProfileRoutingModule,

    StoreModule.forFeature(userProfileFeatureKey, userProfileReducer, { initialState: userProfileInitialState }),
    EffectsModule.forFeature([ UserProfileEffects ])
  ],
  providers: [ UserProfileService, UserProfileEffects, UserProfileFacade ]
})
export class UserProfileModule {
}
