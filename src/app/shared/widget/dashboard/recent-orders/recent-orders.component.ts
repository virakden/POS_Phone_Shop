import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recent-orders',
  templateUrl: './recent-orders.component.html',
  styleUrls: ['./recent-orders.component.scss']
})
export class RecentOrdersComponent implements OnInit {

   // Recent Orders data
   @Input() RecentSelling: Array<{
    id?: string;
    image?: string;
    product?: string;
    amount?: string;
    seller?: string;
    status?: string;
    date?: string;
    time?: string;
  }> | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
