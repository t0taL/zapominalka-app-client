import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { SharedFacade } from '@shared/+state/shared.facade';
import { AuthFacade } from '../../+state/auth.facade';

import { IField } from '@shared/models/field.model';

import { ColorTypes } from '@shared/enums/color-types';

import { signInFields } from './sign-in.form-fields';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;

  readonly fields: IField[] = signInFields;
  readonly colorTypes = ColorTypes;

  constructor(private sharedFacade: SharedFacade, private authFacade: AuthFacade) {
  }

  ngOnInit(): void {
    this.isLoading$ = this.authFacade.isLoading$;
  }

  ngOnDestroy(): void {
    this.sharedFacade.resetFormData();
  }

  signIn(): void {
    this.authFacade.signIn();
  }
}
