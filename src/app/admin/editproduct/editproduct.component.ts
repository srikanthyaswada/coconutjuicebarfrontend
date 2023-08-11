import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/shared/admin.service';
import { EditemployeeComponent } from '../editemployee/editemployee.component';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.scss'],
})
export class EditproductComponent implements OnInit {
  editproductForm!: FormGroup;
  pimage: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private adminApi: AdminService,
    private dialogRef: MatDialogRef<EditemployeeComponent>
  ) {}

  ngOnInit(): void {
    this.editproductForm = this.fb.group({
      productname: ['', [Validators.required]],
      image: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      rating: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    this.editproductForm.patchValue({
      productname: this.data.productname,
      image: this.data.image,
      quantity: this.data.quantity,
      price: this.data.price,
      rating: this.data.rating,
      description: this.data.description,
    });
  }

  selectedFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.pimage = event.target?.result;
      };
    }
  }

  editProduct() {
    this.adminApi
      .editproduct(this.data._id, this.editproductForm.value)
      .subscribe((res: any) => {
        console.log(res, 'edit');
      });
    this.dialogRef.close();
    window.location.reload();
  }
}
