import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AddemployeeComponent } from './admin/addemployee/addemployee.component';
import { AddproductComponent } from './admin/addproduct/addproduct.component';
import { ViewproductComponent } from './admin/viewproduct/viewproduct.component';
import { ViewemployeeComponent } from './admin/viewemployee/viewemployee.component';
import { ExpensesComponent } from './admin/expenses/expenses.component';
import { SalesComponent } from './admin/sales/sales.component';
import { OrdersComponent } from './admin/orders/orders.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  {
    path: 'admin-dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'addemployee', pathMatch: 'full' },
      { path: 'addemployee', component: AddemployeeComponent },
      { path: 'viewemployee', component: ViewemployeeComponent },
      { path: 'addproduct', component: AddproductComponent },
      { path: 'viewproduct', component: ViewproductComponent },
      { path: 'expenses', component: ExpensesComponent },
      { path: 'sales', component: SalesComponent },
      { path: 'orders', component: OrdersComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
