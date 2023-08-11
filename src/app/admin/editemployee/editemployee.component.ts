import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-editemployee',
  templateUrl: './editemployee.component.html',
  styleUrls: ['./editemployee.component.scss'],
})
export class EditemployeeComponent implements OnInit {
  editEmployeeForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private adminApi: AdminService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditemployeeComponent>
  ) {}

  ngOnInit(): void {
    this.editEmployeeForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      role: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });

    this.editEmployeeForm.patchValue({
      firstname: this.data.firstname,
      lastname: this.data.lastname,
      email: this.data.email,
      mobile: this.data.mobile,
      gender: this.data.gender,
      role: this.data.role,
      address: this.data.address,
    });
  }

  editEmp() {
    this.adminApi
      .editemp(this.data._id, this.editEmployeeForm.value)
      .subscribe((res: any) => {
        console.log(res, 'edit');
      });
    this.dialogRef.close();
    window.location.reload();
  }
}
