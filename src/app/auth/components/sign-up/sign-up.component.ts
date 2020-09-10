import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { SharedFacade } from '@shared/+state/shared.facade';
import { AuthFacade } from '../../+state/auth.facade';

import { IField } from '@shared/models/field.model';

import { ColorTypes } from '@shared/enums/color-types';

import { signUpFields } from './sign-up.form-fields';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;

  readonly fields: IField[] = signUpFields;
  readonly colorTypes = ColorTypes;

  constructor(private sharedFacade: SharedFacade, private authFacade: AuthFacade) {
  }

  ngOnInit(): void {
    this.isLoading$ = this.authFacade.isLoading$;
  }

  ngOnDestroy(): void {
    this.sharedFacade.resetFormData();
  }

  signUp(): void {
    this.authFacade.signUp();
  }
}
