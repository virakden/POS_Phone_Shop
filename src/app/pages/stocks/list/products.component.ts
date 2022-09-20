import {Component, QueryList, ViewChildren} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

// Sweet Alert
import Swal from 'sweetalert2';

import { LeadsModel } from './products.model';
import { Leads } from './data';
import { LeadsService } from './products.service';
import { NgbdLeadsSortableHeader, SortEvent } from './products-sortable.directive';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [LeadsService, DecimalPipe]
})
/**
 * Leads Component
 */
export class ProductsComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  ordersForm!: FormGroup;
  submitted = false;
  leadsForm!: FormGroup;
  CustomersData!: LeadsModel[];
  masterSelected!:boolean;
  checkedList:any;

  // Table data
  invoiceList$!: Observable<LeadsModel[]>;
  total$: Observable<number>;
  @ViewChildren(NgbdLeadsSortableHeader) headers!: QueryList<NgbdLeadsSortableHeader>;

  constructor(private modalService: NgbModal,public service: LeadsService, private formBuilder: FormBuilder) {
    this.invoiceList$ = service.countries$;
    this.total$ = service.total$;
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
     this.leadsForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      item_name: ['', [Validators.required]],
      score: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      priority: ['', [Validators.required]]

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
    this.CustomersData = Leads;
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
    return this.leadsForm.controls;
  }

  /**
  * Save user
  */
   saveUser() {
    if (this.leadsForm.valid) {
      const id = this.leadsForm.get('id')?.value;
      const item_name = this.leadsForm.get('item_name')?.value;
      const brand = this.leadsForm.get('brand')?.value;
      const stock_avai = this.leadsForm.get('stock_avai')?.value;
      const status = this.leadsForm.get('status')?.value;
      const profile = "assets/images/users/avatar-10.jpg";
      const priority = this.ordersForm.get('priority')?.value;
      const priorityClass = "warning";
      this.CustomersData.push({
        id,
        item_name,
        brand,
        stock_avai,
        priority,
        priorityClass
      });
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
  checkUncheckAll() {
    for (var i = 0; i < this.CustomersData.length; i++) {
      this.CustomersData[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }

  // Get List of Checked Items
  getCheckedItemList(){
    this.checkedList = [];
    for (var i = 0; i < this.CustomersData.length; i++) {
      if(this.CustomersData[i].isSelected)
      this.checkedList.push(this.CustomersData[i]);
    }
    this.checkedList = JSON.stringify(this.checkedList);
  }

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
        if(codeView != null){
          codeView.classList.toggle('d-none');
        }
        if(preview != null){
          preview.classList.toggle('d-none');
          
        }
      }

}
