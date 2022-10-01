import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule, NgbTooltipModule, NgbDropdownModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

// Flat Picker
import { FlatpickrModule } from 'angularx-flatpickr';

// Ng Select
import { NgSelectModule } from '@ng-select/ng-select';

// Component pages
import { StockRoutingModule } from './stocks-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { listStockComponent } from './list/listStock.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AdjustmentComponent } from './adjust/adjustment.component';


// Ck Editer
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

// File Uploads
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { NgxDropzoneModule } from 'ngx-dropzone';


@NgModule({
    declarations: [
        listStockComponent,
        AddProductComponent,
        AdjustmentComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbPaginationModule,
        NgbTypeaheadModule,
        NgbTooltipModule,
        NgbDropdownModule,
        NgbAccordionModule,
        FlatpickrModule,
        NgSelectModule,
        StockRoutingModule,
        SharedModule,
        CKEditorModule,
        DropzoneModule,
        NgxDropzoneModule

    ],

    exports: [CommonModule],

    providers: [
        DecimalPipe,
    ]
})
export class StockModule { }
