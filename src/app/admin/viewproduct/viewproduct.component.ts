import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/shared/admin.service';
import { EditproductComponent } from '../editproduct/editproduct.component';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.scss'],
})
export class ViewproductComponent implements OnInit {
  products: any;
  constructor(private adminApi: AdminService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.adminApi.viewproduct().subscribe((res: any) => {
      console.log(res, 'products');
      this.products = res;
    });
  }

  editProduct(e: any) {
    this.dialog.open(EditproductComponent, {
      width: '60%',
      data: e,
    });
  }

  deleteProduct(p: any) {
    let did = p._id;
    this.adminApi.deletepro(did).subscribe((res: any) => {
      console.log(res, 'Deleted Employee');
      alert('Are you sure you want to delete');
      window.location.reload();
    });
  }
}
