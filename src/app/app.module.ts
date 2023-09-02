import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AddemployeeComponent } from './admin/addemployee/addemployee.component';
import { AddproductComponent } from './admin/addproduct/addproduct.component';
import { ViewproductComponent } from './admin/viewproduct/viewproduct.component';
import { MaterialModule } from './shared/material/material.module';
import { ViewemployeeComponent } from './admin/viewemployee/viewemployee.component';
import { EditemployeeComponent } from './admin/editemployee/editemployee.component';
import { EditproductComponent } from './admin/editproduct/editproduct.component';
import { ExpensesComponent } from './admin/expenses/expenses.component';
import { SalesComponent } from './admin/sales/sales.component';
import { SelectproductComponent } from './admin/selectproduct/selectproduct.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { MainpageComponent } from './admin/mainpage/mainpage.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    DashboardComponent,
    AddemployeeComponent,
    AddproductComponent,
    ViewproductComponent,
    ViewemployeeComponent,
    EditemployeeComponent,
    EditproductComponent,
    ExpensesComponent,
    SalesComponent,
    SelectproductComponent,
    OrdersComponent,
    MainpageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AgGridModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
