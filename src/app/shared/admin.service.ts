import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  adminLogin(data: any) {
    return this.http.post('http://localhost:8000/admin/login', data);
  }

  addemp(data: any) {
    return this.http.post('http://localhost:8000/employees/addemployee', data);
  }
  viewemp() {
    return this.http.get('http://localhost:8000/employees/viewemployees');
  }
  editemp(id: any, data: any) {
    return this.http.put(
      'http://localhost:8000/employees/updateemployee/' + id,
      data
    );
  }
  deleteemp(id: any) {
    return this.http.delete(
      'http://localhost:8000/employees/deleteemployee/' + id
    );
  }

  addproduct(data: any) {
    return this.http.post('http://localhost:8000/product/addproduct', data);
  }
  viewproduct() {
    return this.http.get('http://localhost:8000/product/viewproducts');
  }
  editproduct(id: any, data: any) {
    return this.http.put(
      'http://localhost:8000/product/updateproduct/' + id,
      data
    );
  }
  deletepro(id: any) {
    return this.http.delete(
      'http://localhost:8000/product/deleteproduct/' + id
    );
  }

  addexpenses(data: any) {
    return this.http.post('http://localhost:8000/expenses/addexpenses', data);
  }
  viewexpenses() {
    return this.http.get('http://localhost:8000/expenses/viewexpenses');
  }

  placeOrder(data: any) {
    return this.http.post('http://localhost:8000/sales/order', data);
  }
  viewOreder() {
    return this.http.get('http://localhost:8000/sales/vieworders');
  }
}
