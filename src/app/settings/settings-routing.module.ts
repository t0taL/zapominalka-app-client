import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsViewComponent } from './components/settings-view/settings-view.component';
import { SettingsEditComponent } from './components/settings-edit/settings-edit.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: SettingsViewComponent },
      { path: 'edit', component: SettingsEditComponent, data: { state: 'edit' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {
}
