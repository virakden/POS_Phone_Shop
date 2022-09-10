import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component pages
import { EmployeeComponent } from "./employee/employee.component";


const routes: Routes = [
  {
    path: "employee",
    component: EmployeeComponent
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployeeRouting {}
