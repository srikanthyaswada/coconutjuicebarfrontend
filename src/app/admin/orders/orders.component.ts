import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders: any;

  constructor(private adminApi: AdminService) {}

  ngOnInit(): void {
    this.adminApi.viewOreder().subscribe((res: any) => {
      this.orders = res;
      console.log(this.orders, 'orders');
    });
  }
}
