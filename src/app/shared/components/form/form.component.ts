import { ChangeDetectionStrategy, Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Observable, Subject, of, combineLatest } from 'rxjs';
import { takeUntil, debounceTime, tap } from 'rxjs/operators';

import { SharedFacade } from '../../+state/shared.facade';

import { IField } from '../../models/field.model';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit, OnDestroy {
  @Input() fields: IField[];
  @Input() data$: Observable<any> = of(null);

  form: FormGroup;

  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private fb: FormBuilder, private sharedFacade: SharedFacade) {
  }

  ngOnInit(): void {
    this.formBuilder()
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(this.listenFormChanges),
        f$ => combineLatest([f$, this.data$])
      )
      .subscribe(this.patchValue);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private formBuilder = (): Observable<FormGroup> => {
    this.form = this.fb.group({});
    this.fields.forEach(field => this.form.addControl(field.name, this.control(field)));
    return of(this.form);
  }

  private control = (field: IField): FormControl => this.fb.control('', field.validators);

  private listenFormChanges = () => {
    this.form.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(100)
      )
      .subscribe((changes: any) => {
        this.sharedFacade.updateFormData(changes);
      });
  }

  private patchValue = ([formGroup, formData]: [FormGroup, any]) => {
    if (formData !== null) {
      formGroup.patchValue(formData);
    } else {
      formGroup.patchValue({}, { emitEvent: false });
    }
  }
}
