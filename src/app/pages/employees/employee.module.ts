import { EmployeeComponent } from './employee/employee.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Bootstrap 
import { NgbDropdownModule, NgbPaginationModule, NgbTypeaheadModule, NgbProgressbarModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

// Ngx Sliders
import { NgxSliderModule } from '@angular-slider/ngx-slider';

// Drop Zone
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

// Simplebar
import { SimplebarAngularModule } from 'simplebar-angular';

// Component pages
import { SharedModule } from '../../shared/shared.module';

// Flat Picker
import { FlatpickrModule } from 'angularx-flatpickr';
import { EmployeeRouting } from './employee-routing.module';



const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};

@NgModule({
  declarations: [
    EmployeeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbProgressbarModule,
    NgbNavModule,
    SharedModule,
    NgxSliderModule,
    DropzoneModule,
    SimplebarAngularModule,
    FlatpickrModule.forRoot(),
    EmployeeRouting
  ]
})
export class EmployeeModules { }
