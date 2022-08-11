import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component pages
import { ListComponent } from "./transac/list.component";

const routes: Routes = [
  {
    path:"transac",
    component: ListComponent
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TicketsRoutingModule {}
