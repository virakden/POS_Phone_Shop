import { ImageProcessingService } from './../image-processing.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, QueryList, ViewChildren, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Range Slider
import { Options } from '@angular-slider/ngx-slider';

// Sweet Alert
import Swal from 'sweetalert2';

import { ProductModel } from './products.model';
import { ProductsService } from './products.service';
import { NgbdProductsSortableHeader, SortEvent } from './products-sortable.directive';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
    providers: [ProductsService, DecimalPipe]
})

/**
 * Products Components
 */
export class ProductsComponent implements OnInit {

    // @Output() event = new EventEmitter<any>()
    public items: Array<any>=[];
    dt: any = "tested"
    // bread crumb items
    breadCrumbItems!: Array<{}>;
    productsForm!: FormGroup;
    ProductData: ProductModel[] = [];
    public Storage = "http://localhost:8080/v1/image";
    parentSelector: boolean = false;
    productDetails: any;
    parentData: any;
    startIndex = 0;
    endIndex = 5;
    pageIndex = 0;
    totalRecord!: number;
    pages = 1
    pageSize = 4
    private _total$ = new BehaviorSubject<number>(0);

    // Table data
    invoiceList$!: Observable<ProductModel[]>;
    total$: Observable<number>;
    @ViewChildren(NgbdProductsSortableHeader) headers!: QueryList<NgbdProductsSortableHeader>;

    get totals$() { return this._total$.asObservable(); }

    constructor(private modalService: NgbModal,
        public service: ProductsService,
        private formBuilder: FormBuilder,
        private ImageProcessingService: ImageProcessingService) {
        // this.invoiceList$ = service.countries$;
        this.total$ = this.totals$;
    }

    ngOnInit(): void {
        /**
        * BreadCrumb
        */
        this.breadCrumbItems = [
            { label: 'home' },
            { label: 'Products', active: true }
        ];

        this.productsForm = this.formBuilder.group({
            productName: [null],
            category: [null],
            brand: [null],
            description: [null],
            productCost: [null],
            productPrice: [null]
        });

        // this.getPegination();

        /**
         * fetches data
         */
        this._getAllData();
    }

    done(){
        return this._getAllData();
    }

    /**
    * User grid data fetches
    */
    private _getAllData() {
        this.service.getObj()
            .subscribe(res => {
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

    /**
    * Sort table data
    * @param param0 sort the column
    *
    */
    onSort({ column, direction }: SortEvent) {
        // resetting other headers
        this.headers.forEach(header => {
            if (header.sortable !== column) {
                header.direction = '';
            }
        });

        this.service.sortColumn = column;
        this.service.sortDirection = direction;
    }

    /**
     * Confirmation mail model
     */
    confirm() {
        Swal.fire({
            reason: 'Are you sure?',
            text: 'Are you Sure You want to Remove this Product ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#cc563d',
            confirmButtonText: 'Yes, delete it!'
        }).then(result => {
            if (result.value) {
                Swal.fire('Deleted!', 'Mail has been deleted.', 'success');
            }
        });
    }



    onChangeFood($event: any) {
        const id = $event.target.value;
        const isChecked = $event.target.checked;

        this.ProductData = this.ProductData.map((d) => {
            if (d.id == id) {
                d.select = isChecked;
                this.parentSelector = false;
                // alert(d)
                return d;
            }
            if (id == -1) {
                d.select = this.parentSelector;
                return d;
            }
            return d;
        });
        // console.log(this.ProductData);
    }


    confirmOrder() {
        this.items = [];
        this.ProductData.map((d) => {
            if (d.select == true) {
                this.items.push(d);
            }
            });
            const items = JSON.stringify(this.items);
            localStorage.setItem('Items',items); 
        }



    // Price Slider
    value = 400;
    highValue = 1000;
    options: Options = {
        floor: 0,
        ceil: 2000
    };

    /**
     * Default Select2
     */
    multiDefaultOption = 'Watches';
    selectedAccount = 'This is a placeholder';
    Default = [
        { name: 'Smart Phones' },
        { name: 'Smart Watches' },
        { name: 'Tablets' },
        { name: 'Accessories' },
    ];

}
