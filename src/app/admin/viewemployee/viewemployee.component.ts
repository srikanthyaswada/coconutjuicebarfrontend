import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/shared/admin.service';
import { EditemployeeComponent } from '../editemployee/editemployee.component';

@Component({
  selector: 'app-viewemployee',
  templateUrl: './viewemployee.component.html',
  styleUrls: ['./viewemployee.component.scss'],
})
export class ViewemployeeComponent implements OnInit {
  employees: any;

  constructor(private adminApi: AdminService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.adminApi.viewemp().subscribe((res: any) => {
      this.employees = res;
      console.log(this.employees);
    });
  }
  edit(d: any) {
    this.dialog.open(EditemployeeComponent, {
      width: '60%',
      data: d,
    });
  }
  delete(s: any) {
    let did = s._id;
    this.adminApi.deleteemp(did).subscribe((res: any) => {
      console.log(res, 'Deleted Employee');
      alert('Are you sure you want to delete')
      window.location.reload();
    });
  }
}
