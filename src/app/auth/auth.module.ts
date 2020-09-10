import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

import { AuthService } from './services/auth.service';
import { LocalStorageJwtService } from './services/local-storage-jwt.service';
import { TokenInterceptorService } from './services/token-interceptor.service';

import { authFeatureKey, authReducer, authInitialState } from './+state/auth.reducer';
import { AuthEffects } from './+state/auth.effects';
import { AuthFacade } from './+state/auth.facade';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';


@NgModule({
  declarations: [ SignInComponent, SignUpComponent, ResetPasswordComponent, ChangePasswordComponent ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,

    StoreModule.forFeature(authFeatureKey, authReducer, { initialState: authInitialState }),
    EffectsModule.forFeature([ AuthEffects ])
  ],
  providers: [
    AuthService,
    LocalStorageJwtService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    AuthEffects,
    AuthFacade
  ]
})
export class AuthModule {
}
