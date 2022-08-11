import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component pages
import { ProductsComponent } from "./products/products.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { OrdersComponent } from "./orders/orders.component";
import { OrdersDetailsComponent } from "./orders-details/orders-details.component";
import { CartComponent } from "./confirm/cart.component";


const routes: Routes = [
  {
    path: "products",
    component: ProductsComponent
  },
  {
    path: "product-detail/:id",
    component: ProductDetailComponent
  },
//   {
//     path: "add-product",
//     component: AddProductComponent
//   },
  {
    path: "orders",
    component: OrdersComponent
  },
  {
    path: "order-details",
    component: OrdersDetailsComponent
  },
  {
    path: "confirm",
    component: CartComponent
  },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EcommerceRoutingModule {}
