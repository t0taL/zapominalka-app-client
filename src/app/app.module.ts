import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from 'environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from '@core/core.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from '@auth/auth.module';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [ AppComponent ],
  imports: [
    AppRoutingModule,
    CoreModule,
    SharedModule,
    AuthModule,

    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
