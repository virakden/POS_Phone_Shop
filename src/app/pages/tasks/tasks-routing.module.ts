import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component pages

import { ListViewComponent } from "./list-view/list-view.component";


const routes: Routes = [
  {
    path: "list-view",
    component: ListViewComponent
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TasksRoutingModule {}
