import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';

import { InfoPageComponent } from '@core/components/info-page/info-page.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'info', component: InfoPageComponent, data: { state: 'info' } },
  {
    path: 'auth',
    redirectTo: 'auth'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule), data: { state: 'home' }, canActivate: [ AuthGuard ]
  },
  {
    path: 'words',
    loadChildren: () => import('./words/words.module').then(m => m.WordsModule), data: { state: 'words' }, canActivate: [ AuthGuard ]
  },
  {
    path: 'learn',
    loadChildren: () => import('./learn/learn.module').then(m => m.LearnModule), data: { state: 'learn' }, canActivate: [ AuthGuard ]
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./user-profile/user-profile.module')
      .then(m => m.UserProfileModule), data: { state: 'profile' }, canActivate: [ AuthGuard ]
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module')
      .then(m => m.SettingsModule), data: { state: 'settings' }, canActivate: [ AuthGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
