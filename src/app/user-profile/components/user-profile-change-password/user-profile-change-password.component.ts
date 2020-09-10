import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { SharedFacade } from '@shared/+state/shared.facade';
import { UserProfileFacade } from '../../+state/user-profile.facade';

import { IField } from '@shared/models/field.model';

import { ColorTypes } from '@shared/enums/color-types';

import { changeUserProfilePasswordFields } from './user-profile-change-password.form-fields';


@Component({
  selector: 'app-user-profile-change-password',
  templateUrl: './user-profile-change-password.component.html',
  styleUrls: ['./user-profile-change-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileChangePasswordComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;

  readonly fields: IField[] = changeUserProfilePasswordFields;
  readonly colorTypes = ColorTypes;

  constructor(private sharedFacade: SharedFacade, private userProfileFacade: UserProfileFacade) {
  }

  ngOnInit(): void {
    this.isLoading$ = this.userProfileFacade.isLoading$;
  }

  ngOnDestroy(): void {
    this.sharedFacade.resetFormData();
  }

  saveChanges(): void {
    this.userProfileFacade.changeUserProfilePassword();
  }
}
