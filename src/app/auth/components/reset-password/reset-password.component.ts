import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { SharedFacade } from '@shared/+state/shared.facade';
import { AuthFacade } from '@auth/+state/auth.facade';

import { IField } from '@shared/models/field.model';

import { ColorTypes } from '@shared/enums/color-types';

import { resetPasswordFields } from './reset-password.form-fields';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;

  readonly fields: IField[] = resetPasswordFields;
  readonly colorTypes = ColorTypes;

  constructor(private sharedFacade: SharedFacade, private authFacade: AuthFacade) {
  }

  ngOnInit(): void {
    this.isLoading$ = this.authFacade.isLoading$;
  }

  ngOnDestroy(): void {
    this.sharedFacade.resetFormData();
  }

  resetPassword(): void {
    this.authFacade.resetPassword();
  }
}
