import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.scss'],
})
export class AddemployeeComponent implements OnInit, AfterViewInit {
  addEmployeeForm!: FormGroup;
  employees: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'firstname',
    'lastname',
    'gender',
    'emailid',
    'mobile',
    'role',
    'address',
  ];
  dataSource!: MatTableDataSource<any>;

  constructor(private fb: FormBuilder, private adminApi: AdminService) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.addEmployeeForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      role: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });

    this.adminApi.viewemp().subscribe((res: any) => {
      this.employees = res;
      this.dataSource = new MatTableDataSource(this.employees);
      console.log(this.employees, 'emps');
    });
  }

  addEmp() {
    this.adminApi.addemp(this.addEmployeeForm.value).subscribe((res: any) => {
      console.log(res, 'employess');
      window.location.reload();
    });
  }
}
