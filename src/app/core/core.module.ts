import { APP_INITIALIZER, NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ApiModule } from '@api/api.module';
import { SharedModule } from '@shared/shared.module';

import { LocalStorageService } from './services/local-storage.service';
import { NotificationService } from './services/notification.service';
import { ThemesService } from './services/themes.service';

import { AuthGuard } from './guards/auth.guard';

import { BackgroundAnimationComponent } from './components/background-animation/background-animation.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { InfoPageComponent } from './components/info-page/info-page.component';


@NgModule({
  declarations: [
    BackgroundAnimationComponent,
    HeaderComponent,
    NavigationComponent,
    InfoPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    ApiModule,
    SharedModule
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BackgroundAnimationComponent,
    HeaderComponent,
    NavigationComponent
  ],
  providers: [
    LocalStorageService,
    NotificationService,
    ThemesService,
    {
      provide: APP_INITIALIZER,
      useFactory: (themesService: ThemesService) => () => themesService.initService(),
      deps: [ThemesService],
      multi: true
    },
    AuthGuard
  ]
})
export class CoreModule {
  constructor(@Optional()@SkipSelf()parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
