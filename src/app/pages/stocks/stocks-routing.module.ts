import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component pages

import { listStockComponent } from "./list/listStock.component";
import { AddProductComponent } from './add-product/add-product.component';
import { AdjustmentComponent } from "./adjust/adjustment.component";


const routes: Routes = [
  {
    path: "list",
    component: listStockComponent
  },
  {
    path: "add-product",
    component: AddProductComponent
  },
  {
    path:"adjust",
    component: AdjustmentComponent
  },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StockRoutingModule {}
