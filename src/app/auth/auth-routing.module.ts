import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';


const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: 'sign-in', component: SignInComponent, data: { state: 'sign-in' } },
      { path: 'sign-up', component: SignUpComponent, data: { state: 'sign-up' } },
      { path: 'reset-password', component: ResetPasswordComponent, data: { state: 'reset-password' } },
      { path: 'change-password/:token', component: ChangePasswordComponent, data: { state: 'change-password' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
