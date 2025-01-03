import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbDropdownModule, NgbNavModule, NgbTooltipModule, NgbProgressbarModule, NgbTypeaheadModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

// Simple bar
import { SimplebarAngularModule } from 'simplebar-angular';
//  Drag and drop
import { DndModule } from 'ngx-drag-drop';
// Flat Picker
import { FlatpickrModule } from 'angularx-flatpickr';
// Counter
import { CountToModule } from 'angular-count-to';

// Sorting page
import { NgbdListViewSortableHeader } from './../tasks/list-view/list-view-sortable.directive';

// Load Icons
import { defineLordIconElement } from 'lord-icon-element';
import lottie from 'lottie-web';

// Component Pages
import { TasksRoutingModule } from './tasks-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ListViewComponent } from './list-view/list-view.component';

@NgModule({
  declarations: [
    ListViewComponent,
    NgbdListViewSortableHeader,
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbTooltipModule,
    NgbProgressbarModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    SimplebarAngularModule,
    DndModule,
    FlatpickrModule,
    CountToModule,
    TasksRoutingModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TasksModule { 
  constructor() {
    defineLordIconElement(lottie.loadAnimation);
  }
}
