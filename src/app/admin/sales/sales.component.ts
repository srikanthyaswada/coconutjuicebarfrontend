import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit {
  saleForm!: FormGroup;
  products: any;
  orders: any;
  orderData: any = [];
  sp: any;
  p!: number;
  q!: number;
  grandTotal: number = 0;
  income: number = this.grandTotal;

  constructor(private adminApi: AdminService, private fb: FormBuilder) {}

  ngOnInit(): void {
    // this.adminApi.viewOreder().subscribe((res: any) => {
    //   this.orders = res;
    // });

    this.adminApi.viewproduct().subscribe((res: any) => {
      this.products = res;
    });

    this.saleForm = this.fb.group({
      mobilenumber: ['', [Validators.required]],
      product: ['', [Validators.required]],
      price: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      total: [null, [Validators.required]],
    });
  }
  get total() {
    return this.p * this.q;
  }
  getPrice(p: any) {
    let pr = this.products.find((f: any) => f.productname == p.target.value);

    this.saleForm.patchValue({
      price: Number(pr.price),
    });
  }

  totalPrice(tt: any) {
    let tot = this.saleForm.value.price * tt.target.value;

    this.saleForm.patchValue({
      total: Number(tot),
    });
  }
  order() {
    this.income += this.grandTotal;
    console.log(this.income, 'ghfj');

    this.grandTotal += this.saleForm.value.total;
    if (this.orderData.length === 0) {
      this.orderData = {
        mobilenumber: this.saleForm.value.mobilenumber,
        orderDetails: [
          {
            product: this.saleForm.value.product,
            price: this.saleForm.value.price,
            quantity: this.saleForm.value.quantity,
            total: this.saleForm.value.total,
          },
        ],
        grandTotal: this.grandTotal,
        income: this.income,
      };
    } else {
      let ordersProduct = {
        product: this.saleForm.value.product,
        price: this.saleForm.value.price,
        quantity: this.saleForm.value.quantity,
        total: this.saleForm.value.total,
      };

      this.orderData.orderDetails.push(ordersProduct);
      this.orderData.grandTotal = this.grandTotal;
      this.orderData.income = this.income;
    }
    console.log(this.orderData, 'od');

    this.saleForm.reset();
  }

  placeOrder() {
    this.adminApi.placeOrder(this.orderData).subscribe((res: any) => {
      console.log(res);
      window.location.reload();
    });
  }
  clear() {
    this.saleForm.reset();
  }
}
