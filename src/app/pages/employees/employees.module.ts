import { DialogService } from 'primeng/dynamicdialog';
import { SharedService } from 'src/app/shared/shared.service';
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
import { EmployeeRoutingModule } from "./employees-routing.module";
import { SharedModule } from '../../shared/shared.module';
import { EmployeesComponent } from './employee/employees.component';

// Flat Picker
import { FlatpickrModule } from 'angularx-flatpickr';



const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};

@NgModule({
  declarations: [
    EmployeesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeeRoutingModule,
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
  ],
  providers:[
    SharedService,
    DialogService
  ]
})
export class EmployeeModule { }
