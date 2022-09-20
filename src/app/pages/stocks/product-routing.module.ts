import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component pages

import { ProductsComponent } from "./list/products.component";
import { AddProductComponent } from './add-product/add-product.component';
import { CreateComponent } from "./adjust/create.component";


const routes: Routes = [
  {
    path: "list",
    component: ProductsComponent
  },
  {
    path: "add-product",
    component: AddProductComponent
  },
  {
    path:"adjust",
    component: CreateComponent
  },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CRMRoutingModule {}
