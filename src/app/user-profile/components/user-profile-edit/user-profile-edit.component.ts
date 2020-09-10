import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { SharedFacade } from '@shared/+state/shared.facade';
import { UserProfileFacade } from '../../+state/user-profile.facade';

import { IUserProfile } from '@api/models/user-profile.model';
import { IField } from '@shared/models/field.model';

import { ColorTypes } from '@shared/enums/color-types';

import { userProfileEditFields } from './user-profile-edit.from-fields';


@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileEditComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  data$: Observable<IUserProfile>;

  readonly fields: IField[] = userProfileEditFields;
  readonly colorTypes = ColorTypes;

  constructor(private sharedFacade: SharedFacade, private userProfileFacade: UserProfileFacade) {
  }

  ngOnInit(): void {
    this.isLoading$ = this.userProfileFacade.isLoading$;
    this.data$ = this.userProfileFacade.userProfile$
      .pipe(
        tap((data: IUserProfile) => {
          if (data === null) {
            this.userProfileFacade.getUserProfile();
          }
        })
      );
  }

  ngOnDestroy(): void {
    this.sharedFacade.resetFormData();
  }

  saveChanges(): void {
    this.userProfileFacade.editUserProfile();
  }
}
