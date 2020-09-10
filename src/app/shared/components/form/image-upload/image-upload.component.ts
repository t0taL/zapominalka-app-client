import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { SharedFacade } from '../../../+state/shared.facade';

import { IField } from '../../../models/field.model';


@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageUploadComponent implements OnInit {
  @Input() group: FormGroup;
  @Input() field: IField;

  @ViewChild('fileInput') fileInput: ElementRef;

  imageSrc$: Observable<string>;

  previousImage: string;
  isError: boolean = false;
  errorText: string = '';

  constructor(private sharedFacade: SharedFacade, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.imageSrc$ = this.group.controls[this.field.name].valueChanges;
    this.initImageControls();
    this.updateFormData();

    setTimeout(() => {
      this.previousImage = this.group.controls[this.field.name].value;
    }, 1000);
  }

  private initImageControls(): void {
    this.group.addControl('imageFile', new FormControl(null));
    this.group.addControl('imageDeleted', new FormControl(false));
  }

  private changeImageControlsState(imageFile: File, imageDeleted: boolean): void {
    this.group.controls.imageFile.setValue(imageFile);
    this.group.controls.imageDeleted.setValue(imageDeleted);
  }

  private setImageUrl(url: string | ArrayBuffer): void {
    this.group.controls[this.field.name].setValue(url);
    this.group.controls[this.field.name].markAsDirty();
  }

  private updateFormData(): void {
    this.sharedFacade.updateFormData(this.group.value);
  }

  private setError(text: string): void {
    this.isError = true;
    this.errorText = text;
  }

  private clearError(): void {
    this.isError = false;
    this.errorText = '';
  }

  imageUpload(): void {
    const file: File = this.fileInput.nativeElement.files[0];
    const reader: FileReader = new FileReader();

    reader.onloadend = () => {
      this.setImageUrl(reader.result);
      this.changeImageControlsState(file, false);
      this.fileInput.nativeElement.value = '';
      this.updateFormData();
      this.clearError();
    };

    if (file) {
      if (!['image/png', 'image/jpg', 'image/jpeg'].includes(file.type)) {
        this.setError('File types available for upload are JPG, JPEG, PNG!');
        return;
      }
      if (file.size > 1048576) {
        this.setError(`File size should not exceed 1MB. Current file size is ${(file.size / 1024 / 1024).toFixed(2)}MB!`);
        return;
      }
      reader.readAsDataURL(file);
    } else {
      console.log('error load file');
    }
  }

  returnPreviousImage(): void {
    this.setImageUrl(this.previousImage);
    this.changeImageControlsState(null, false);
    this.updateFormData();
    this.clearError();
  }

  removeImage(): void {
    this.setImageUrl('');
    this.changeImageControlsState(null, true);
    this.updateFormData();
    this.clearError();
  }
}
