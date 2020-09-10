import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProfileViewComponent } from './components/user-profile-view/user-profile-view.component';
import { UserProfileEditComponent } from './components/user-profile-edit/user-profile-edit.component';
import { UserProfileChangePasswordComponent } from './components/user-profile-change-password/user-profile-change-password.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: UserProfileViewComponent },
      { path: 'edit', component: UserProfileEditComponent, data: { state: 'edit' } },
      { path: 'change-password', component: UserProfileChangePasswordComponent, data: { state: 'change-password' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule {
}
