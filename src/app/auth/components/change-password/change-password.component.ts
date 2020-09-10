import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { SharedFacade } from '@shared/+state/shared.facade';
import { AuthFacade } from '@auth/+state/auth.facade';

import { IField } from '@shared/models/field.model';

import { ColorTypes } from '@shared/enums/color-types';

import { changePasswordFields } from './change-password.form-fields';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;

  readonly fields: IField[] = changePasswordFields;
  readonly colorTypes = ColorTypes;

  private token: string;

  constructor(
    private route: ActivatedRoute,
    private sharedFacade: SharedFacade,
    private authFacade: AuthFacade
  ) {
  }

  ngOnInit(): void {
    this.isLoading$ = this.authFacade.isLoading$;
    this.token = this.route.snapshot.params.token;
  }

  ngOnDestroy(): void {
    this.sharedFacade.resetFormData();
  }

  changePassword(): void {
    this.authFacade.changePassword(this.token);
  }
}
