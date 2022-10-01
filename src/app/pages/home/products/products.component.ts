import { FormGroup, FormBuilder } from '@angular/forms';
import {Component, QueryList, ViewChildren} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Range Slider
import { Options } from '@angular-slider/ngx-slider';

// Sweet Alert
import Swal from 'sweetalert2';

import {productModel} from './products.model';
import { AdvancedService } from './products.service';
import { NgbdProductsSortableHeader, SortEvent } from './products-sortable.directive';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [AdvancedService, DecimalPipe]
})

/**
 * Products Components
 */
export class ProductsComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  productsForm!: FormGroup;
  ProductData!: productModel[];
  public Storage= "http://localhost:8080/v1/image/";
  // Table data
  invoiceList$!: Observable<productModel[]>;
  total$: Observable<number>;
  @ViewChildren(NgbdProductsSortableHeader) headers!: QueryList<NgbdProductsSortableHeader>;

  constructor(private modalService: NgbModal,public service: AdvancedService, private formBuilder: FormBuilder) {
    // this.invoiceList$ = service.countries$;
    this.total$ = service.total$;
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

    /**
     * fetches data
     */
     this._fetchData();
  }

  /**
  * User grid data fetches
  */
   private _fetchData() {
    this.service.getObj().subscribe(res => {
    this.ProductData = res.results
    console.log(this.ProductData)
    })
  }

  /**
  * Sort table data
  * @param param0 sort the column
  *
  */
   onSort({column, direction}: SortEvent) {
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
