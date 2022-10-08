import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.scss']
})

/**
 * OrdersDetails Component
 */
export class OrdersDetailsComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  invoice: any;
  public Storage = "http://localhost:8080/v1/image";


  constructor() {
    this.getValue();
   }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'home' },
      { label: 'Order Details', active: true }
    ];


  }

  getValue(){
    const invoice: any = localStorage.getItem('Invoice');
    this.invoice =  JSON.parse(invoice) ;
  }

  clearInvoice(){
    localStorage.removeItem('Invoice');
  }

//   saveData(){
    
//     // this.setDataArray();
//     this.value = [];
//     // console.log(this.confirmForm.value);
    
//     this.productService.addSale(this.confirmForm.value).subscribe(res =>{
//         this.clearItems();
//         const value = JSON.stringify(res.results);
//         localStorage.setItem('Invoice',value);      
//     })
//   }

}
