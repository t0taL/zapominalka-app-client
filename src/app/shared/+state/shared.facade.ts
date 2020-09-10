import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { ISharedState } from './shared.reducer';
import * as SharedSelectors from './shared.selectors';
import * as SharedActions from './shared.actions';


@Injectable()
export class SharedFacade {
  formData$ = this.store.select(SharedSelectors.getFormData);

  constructor(private store: Store<{ state: ISharedState }>) {
  }

  // form actions
  updateFormData(data: any): void {
    this.store.dispatch(SharedActions.updateFormData({ payload: data }));
  }

  resetFormData(): void {
    this.store.dispatch(SharedActions.resetFormData());
  }
}
