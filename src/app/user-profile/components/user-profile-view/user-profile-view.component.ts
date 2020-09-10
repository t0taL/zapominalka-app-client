import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UserProfileFacade } from '../../+state/user-profile.facade';

import { IUserProfile } from '@api/models/user-profile.model';

import { ColorTypes } from '@shared/enums/color-types';


@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileViewComponent implements OnInit {
  isLoading$: Observable<boolean>;
  userProfile$: Observable<IUserProfile>;

  readonly colorTypes = ColorTypes;

  constructor(private userProfileFacade: UserProfileFacade) {
  }

  ngOnInit(): void {
    this.isLoading$ = this.userProfileFacade.isLoading$;
    this.userProfile$ = this.userProfileFacade.userProfile$;

    this.userProfileFacade.getUserProfile();
  }
}
