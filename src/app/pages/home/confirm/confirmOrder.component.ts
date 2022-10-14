import { Data } from './../../../core/models/auth.models';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ProductsComponent } from '../products/products.component';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { Cart } from './confirmOrder.model';
import { cartData } from './data';

// Sweet Alert
import Swal from 'sweetalert2';
import { ProductsService } from '../products/products.service';
import { DatePipe } from '@angular/common';
// import { ProductsModel } from '../products/products.model';

@Component({
  selector: 'app-confirmOrder',
  templateUrl: './confirmOrder.component.html',
  styleUrls: ['./confirmOrder.component.scss']
})

/**
 * Cart Component
 */
export class ConfirmOrderComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  public value: Array<any>=[];
  cartData!: Cart[];
  data: string = '';
  items: Array<any>=[];
  qty!: number;
  itemPrice!: any;
  subTotal!: any;
  confirmForm!: FormGroup;
  detailsForm!:FormGroup
  public Storage = "http://localhost:8080/v1/image";
  currentDataTime: any
  
  @Input() parentData: any;


  @ViewChild(ProductsComponent) card!: ProductsComponent ;
  constructor(private formBuilder: FormBuilder,
    protected productService: ProductsService,public datepipe: DatePipe) {
        this.currentDataTime =this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
        // console.log(this.currentDataTime);
        
     }

   


  ngOnInit(): void {
      // this.calculateSubtotal()
      /**
       * BreadCrumb
       */
      this.breadCrumbItems = [
          { label: 'home' },
          { label: 'confirm', active: true }
        ];
        
        /**
         * fetches the data
         */
         
         
        
        this.confirmForm = this.formBuilder.group({
            
            customerName: ['', Validators.required],
            customerTelephone: ['', Validators.required],
            subTotal: ['', Validators.required],
            discount: ['', Validators.required],
            total: ['', Validators.required],
            saleDetail:[''],
            saleDate: [null]
        })
        
        this._fetchData();
        this.GetData();
        

  }

  /**
   * Cart data fetch
   */
   private _fetchData() {
    this.cartData = cartData;
  }

  get details(){
    return this.confirmForm.controls["saleDetials"] as FormArray;
  }

  addData (){
    const detailsForm = this.formBuilder.group({
        productName: ['', Validators.required],
        productPrice: ['', Validators.required],
        category: ['', Validators.required],
        qty: ['1',Validators.required],
        
    });

    this.details.push(detailsForm)
  }

  loadSub(index: number){
    this.qty = this.details.at(index).value.qty
    this.itemPrice = this.details.at(index).value.price
    // console.log(this.itemPrice);
    
    // this.details.at(index).get('totalItem')?.patchValue(this.qty * this.itemPrice)
    // this.subTotal = 0;
    // this.details.value.forEach((x: any) => {
    //   this.subTotal += +x.totalItem;
    // });
    // this.confirmForm.get('totalPrice')?.patchValue(this.subTotal)
  }



  // Default
  counter : any = 0;
  increment(item:any) {
    item.qty++;
    this.calculateSubtotal();
  }

  calculateSubtotal(){
    let subTotal = 0  ;
    let totalDiscount = 0;
    let total = 0;

    this.items.forEach(item =>{
        subTotal += item.qty * item.product.productPrice
        totalDiscount = (subTotal * this.confirmForm.value.discount)/100
        total = subTotal - totalDiscount;
        
    }) 

    this.confirmForm.patchValue({subTotal : subTotal, total : total})
  }
  
  decrement(item:any) {
    item.qty--;
    this.calculateSubtotal();
  }

  /**
   * Confirmation mail model
   */
   confirm() {
    Swal.fire({
      reason: 'Are you sure ?',
      text: 'Are you sure you want to remove this product ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Close'
    }).then(result => {
      if (result.value) {
        Swal.fire('Deleted!', 'Cart has been deleted.', 'success');
      }
    });
  }


  GetData() {
    const items: any = localStorage.getItem('Items');
    
    this.items =  JSON.parse(items) ;
    // const count: any = items.length;
    // console.log(count);

    this.items=  this.items.map((item:any) =>{
        return {
            product:item,
            qty:1
        }
    });
    this.calculateSubtotal();
  }

  clearItems(){
    localStorage.removeItem('Items');
  }

  setDataArray(){
   const sales = this.confirmForm.patchValue({
    saleDetail:this.items
   });
  }

  saveData(){
    
    this.setDataArray();
    this.value = [];    
    this.productService.addSale(this.confirmForm.value).subscribe(res =>{
        window.location.reload()        
        this.clearItems();
    
        const value = JSON.stringify(res.results);
        localStorage.setItem('Invoice',value); 
          
    })
   
  }

}
