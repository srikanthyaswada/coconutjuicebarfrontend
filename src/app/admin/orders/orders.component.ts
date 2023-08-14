import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders: any;
  income: number = 0;
  constructor(private adminApi: AdminService) {}

  ngOnInit(): void {
    this.adminApi.viewOreder().subscribe((res: any) => {
      this.orders = res;
      this.orders.map((i: any) => {
        this.income += i.grandTotal;
      });
      console.log(this.income, 'gt');
    });
  }
}
