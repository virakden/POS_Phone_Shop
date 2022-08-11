import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component pages
import { CustomersComponent } from "./employee/customers.component";


const routes: Routes = [
  {
    path: "employee",
    component: CustomersComponent
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NftMarketplaceRoutingModule {}
