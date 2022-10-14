import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

/**
 * Details Component
 */
export class DetailsComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  invoice: any;

  constructor() { 
    this.getValue()
  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Invoices' },
      { label: 'Create Invoice', active: true }
    ];
  }

  timer() {
    let timerInterval: any;
    Swal.fire({
      reason: 'Processing Save!',
      html: 'I will close in <b></b> milliseconds.',
      timer: 2000,
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
        this.clearInvoice()
      }
    });
  }

  getValue(){
    const invoice: any = localStorage.getItem('Invoice');
    this.invoice =  JSON.parse(invoice) ;
  }

  clearInvoice(){
    localStorage.removeItem('Invoice');
  }

}
