import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WordsViewComponent } from './components/words-view/words-view.component';
import { WordsAddComponent } from './components/words-add/words-add.component';
import { WordsEditComponent } from './components/words-edit/words-edit.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: WordsViewComponent },
      { path: 'add', component: WordsAddComponent, data: { state: 'add' } },
      { path: 'edit', component: WordsEditComponent, data: { state: 'edit' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WordsRoutingModule {
}
