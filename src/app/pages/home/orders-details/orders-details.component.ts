import { DatePipe } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import Swal from 'sweetalert2';

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
  currentDataTime: any


  constructor(public datepipe: DatePipe) {
    // 
    
    this.currentDataTime =this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
    console.log(this.currentDataTime);
   }
  ngOnInit(): void {
    /*
    * BreadCrumb
    */
    this.timer();
    // this.getValue();
     this.breadCrumbItems = [
      { label: 'home' },
      { label: 'Order Details', active: true }
    ];
  }

  timer() {
    let timerInterval: any;
    Swal.fire({
      reason: 'Processing Save!',
      html: 'I will close in <b></b> milliseconds.',
      timer: 500,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {
          const content = Swal.getHtmlContainer();
          if (content) {
            const b: any = content.querySelector('b');
            if (b) {
              b.textContent = Swal.getTimerLeft();
            }
          }
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        this.getValue()
      }
    });
  }

  getValue(){
    // let landing = true
    setTimeout(() => {
        const invoice: any = localStorage.getItem('Invoice');    
        this.invoice =  JSON.parse(invoice) ;
        // landing = false
    }, 500);
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
