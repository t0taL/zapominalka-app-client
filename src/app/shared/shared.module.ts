import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ImageCropperModule } from 'ngx-image-cropper';

import { sharedFeatureKey, sharedReducer, sharedInitialState } from './+state/shared.reducer';
import { SharedEffects } from './+state/shared.effects';
import { SharedFacade } from './+state/shared.facade';

import { FormDirective } from './components/form/form.directive';

import { SearcherPipe } from './pipes/searcher.pipe';

import { InputComponent } from './components/form/input/input.component';
import { FormComponent } from './components/form/form.component';
import { ImageUploadComponent } from './components/form/image-upload/image-upload.component';
import { ButtonComponent } from './components/button/button.component';
import { LinkComponent } from './components/link/link.component';
import { RadioComponent } from './components/form/radio/radio.component';
import { PageLayoutComponent } from './components/page-layout/page-layout.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { SearcherComponent } from './components/searcher/searcher.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { InfoItemComponent } from './components/info-item/info-item.component';
import { ItemsGroupComponent } from './components/items-group/items-group.component';
import { WordItemComponent } from './components/word-item/word-item.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelSpeed: 0.25,
  suppressScrollX: true
};

@NgModule({
  declarations: [
    FormDirective,

    SearcherPipe,

    InputComponent,
    FormComponent,
    ImageUploadComponent,
    ButtonComponent,
    LinkComponent,
    RadioComponent,
    PageLayoutComponent,
    ConfirmDialogComponent,
    SearcherComponent,
    AvatarComponent,
    InfoItemComponent,
    ItemsGroupComponent,
    WordItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatMenuModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressSpinnerModule,

    PerfectScrollbarModule,
    ImageCropperModule,

    StoreModule.forFeature(sharedFeatureKey, sharedReducer, { initialState: sharedInitialState }),
    EffectsModule.forFeature([ SharedEffects ])
  ],
  exports: [
    FormComponent,
    ButtonComponent,
    LinkComponent,
    PageLayoutComponent,
    ConfirmDialogComponent,
    SearcherComponent,
    AvatarComponent,
    InfoItemComponent,
    ItemsGroupComponent,
    WordItemComponent,

    SearcherPipe,

    PerfectScrollbarModule,

    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatProgressBarModule,
    MatTooltipModule
  ],
  providers: [
    SharedEffects,
    SharedFacade,

    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class SharedModule {
}
