import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

// Sweet Alert
import Swal from 'sweetalert2';

import { ProductsModel } from './listStock.model';
import { ListStocksService } from './listStock.service';
import { NgbdLeadsSortableHeader } from 'src/app/core/base/base.directive';

@Component({
    selector: 'app-listStock',
    templateUrl: './listStock.component.html',
    styleUrls: ['./listStock.component.scss'],
    providers: [ListStocksService, DecimalPipe]
})

/**
 * Leads Component
 */
export class listStockComponent implements OnInit {

    // bread crumb items
    breadCrumbItems!: Array<{}>;
    ordersForm!: FormGroup;
    submitted = false;
    public Editor = ClassicEditor;
    productsForm!: FormGroup;
    ProductData!: ProductsModel[];
    masterSelected!: boolean;
    checkedList: any;
    startIndex = 0;
    endIndex = 5;
    pageIndex = 0;
    totalRecord!: number;
    pages = 1
    pageSize = 3
    private _total$ = new BehaviorSubject<number>(0);



    // Table data
    invoiceList$!: Observable<ProductsModel[]>;
    total$: Observable<number>;
    @ViewChildren(NgbdLeadsSortableHeader) headers!: QueryList<NgbdLeadsSortableHeader>;

    get totals$() { return this._total$.asObservable(); }

    constructor(private modalService: NgbModal,
        public service: ListStocksService,
        private formBuilder: FormBuilder) {
        this.invoiceList$ = service.data$;
        this.total$ = this.totals$
    }

    ngOnInit(): void {
        /**
        * BreadCrumb
        */
        this.breadCrumbItems = [
            { label: 'Stocks' },
            { label: 'List Products', active: true }
        ];

        /**
         * Form Validation
         */
        this.productsForm = this.formBuilder.group({
            productName: [null],
            category: [null],
            brand: [null],
            description: [null],
            productCost: [null],
            productPrice: [null]
        });
        this.getPro();

        /**
         * fetches data
         */
        this._fetchData();

    }

    done() {
        return this.getPro();
    }

    getPro() {
        this.service.getObj().subscribe(res => {
            this.ProductData = res.results

            this._total$.next(this.ProductData.length)
            this.totalRecord = this.ProductData.length
            this.startIndex = (this.pages - 1) * this.pageSize + 1;
            this.endIndex = (this.pages - 1) * this.pageSize + this.pageSize;
            if (this.endIndex > this.totalRecord) {
                this.endIndex = this.totalRecord;
            }
            this.ProductData = this.ProductData.slice(this.startIndex - 1, this.endIndex);
            return of(this.ProductData)

        })
    }

    onEdit(object: any) {
        // console.log(object.employeeEmail);
        this.service.updateObj(object).subscribe(
            (res: any) => {
                console.log(res);
                this.ngOnInit();
            }
        );

        this.modalService.dismissAll();

    }

    //   setPaginator(event: any) {
    //     this.pageIndex = event.pages;
    //     this.numRecord = event.rows;
    //     this.activeCurrentPage();
    //   }
    //   activeCurrentPage() {
    //     this.pFirst = this.pageIndex * this.numRecord;
    // }




    editModal(edit: any, pro: any) {

        console.log(pro);

        this.productsForm.patchValue(pro)
        // this.submitted = false;
        this.modalService.open(edit, { size: 'md', centered: true });
    }

    /**
    * User grid data fetches
    */
    private _fetchData() {
        this.service.getObj().subscribe(res => {
            this.ProductData = res.results
        })
    }

    /**
     * Open modal
     * @param content modal content
     */
    openModal(content: any) {
        this.submitted = false;
        this.modalService.open(content, { size: 'md', centered: true });
    }

    /**
     * Form data get
     */
    get form() {
        return this.productsForm.controls;
    }

    /**
    * Save product
    */
    saveProduct() {
        if (this.productsForm.valid) {
            const id = this.productsForm.get('id')?.value;
            const productName = this.productsForm.get('productName')?.value;
            const productPrice = this.productsForm.get('productPrice')?.value;
            const productCost = this.productsForm.get('productCost')?.value;
            const description = this.productsForm.get('description')?.value;
            const stockAlert = this.productsForm.get('stockAlert')?.value;
            const stockAvailability = this.productsForm.get('stockAvailability')?.value;
            const photo = this.productsForm.get('photo')?.value;
            const category = this.ordersForm.get('category')?.value;
            const brand = this.ordersForm.get('brand')?.value;
            const status = this.productsForm.get('status')?.value;
            //   this.ProductData.push({
            //     id,
            //     productName,
            //     productPrice,
            //     productCost,
            //     description,
            //     stockAlert,
            //     stockAvailability,
            //     photo,
            //     category,
            //     brand
            //   });
            this.modalService.dismissAll()
        }
        this.submitted = true
    }


    /**
     * Confirmation mail model
     */
    confirm() {
        Swal.fire({
            reason: 'You are about to delete a lead ?',
            text: 'Deleting your lead will remove all of your information from our database.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f46a6a',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Close'
        }).then(result => {
            if (result.value) {
                Swal.fire('Deleted!', 'Leads has been deleted.', 'success');
            }
        });
    }

    // The master checkbox will check/ uncheck all items
    //   checkUncheckAll() {
    //     for (var i = 0; i < this.ProductData.length; i++) {
    //       this.ProductData[i].isSelected = this.masterSelected;
    //     }
    //     this.getCheckedItemList();
    //   }

    // Get List of Checked Items
    //   getCheckedItemList(){
    //     this.checkedList = [];
    //     for (var i = 0; i < this.ProductData.length; i++) {
    //       if(this.ProductData[i].isSelected)
    //       this.checkedList.push(this.ProductData[i]);
    //     }
    //     this.checkedList = JSON.stringify(this.checkedList);
    //   }

    /**
    * Multiple Default Select2
    */
    selectValue = ['Lead', 'Partner', 'Exiting', 'Long-term'];


    /**
  * Show Code Toggle
  */
    ShowCode(event: any) {
        let card = event.target.closest('.card');
        const preview = card.children[1].children[1];
        const codeView = card.children[1].children[2];
        if (codeView != null) {
            codeView.classList.toggle('d-none');
        }
        if (preview != null) {
            preview.classList.toggle('d-none');

        }
    }

}
