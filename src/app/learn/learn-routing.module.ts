import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LearnGuard } from './guards/learn.guard';

import { LearnComponent } from './components/learn/learn.component';
import { StartMenuComponent } from './components/start-menu/start-menu.component';
import { ResultComponent } from './components/result/result.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: LearnComponent, canActivate: [ LearnGuard ] },
      { path: 'start-menu', component: StartMenuComponent, data: { state: 'start-menu' } },
      { path: 'result', component: ResultComponent, data: { state: 'result' }, canActivate: [ LearnGuard ] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearnRoutingModule {
}
