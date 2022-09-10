
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component pages
import { DashboardComponent } from "./dashboards/dashboard/dashboard.component";

const routes: Routes = [
    {
        path: "",
        component: DashboardComponent
    },
    {
      path: '', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule)
    },
  
    {
      path: 'home', loadChildren: () => import('./home/ecommerce.module').then(m => m.EcommerceModule)
    },
    {
      path: 'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule)
    },
    {
      path: 'tasks', loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule)
    },
    {
      path: 'stocks', loadChildren: () => import('./stocks/crm.module').then(m => m.CrmModule)
    },
    {
      path: 'crypto', loadChildren: () => import('./crypto/crypto.module').then(m => m.CryptoModule)
    },
    {
      path: 'invoices', loadChildren: () => import('./invoices/invoices.module').then(m => m.InvoicesModule)
    },
    {
      path: 'reports', loadChildren: () => import('./reports/tickets.module').then(m => m.TicketsModule)
    },
    { path: 'ui', loadChildren: () => import('./ui/ui.module').then(m => m.UiModule) },
    {
      path: 'advance-ui', loadChildren: () => import('./advance-ui/advance-ui.module').then(m => m.AdvanceUiModule)
    },
    {
      path: 'forms', loadChildren: () => import('./form/form.module').then(m => m.FormModule)
    },
    {
      path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule)
    },
    {
      path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule)
    },
    {
      path: 'maps', loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule)
    },
    {
      path: 'employees', loadChildren: () => import('./employees/employee.module').then(m => m.EmployeeModules)
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
