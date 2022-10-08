import { Component, OnInit } from '@angular/core';

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

  getValue(){
    const invoice: any = localStorage.getItem('Invoice');
    this.invoice =  JSON.parse(invoice) ;
  }

}
