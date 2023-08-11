import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss'],
})
export class AddproductComponent {
  productimg: any;

  products: any

  constructor(
    private fb: FormBuilder,
    private adminApi: AdminService,
    private router: Router
  ) {}

 
  ngOnInit(): void {
    this.adminApi.viewproduct().subscribe((res:any)=> {
      console.log(res,'products');
      this.products =res
     })

  }

  addproductForm = new FormGroup({
    productname: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    rating: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  
  addProduct() {
    let pdata = {
      ...this.addproductForm.value,
      image: this.productimg,
    };
    console.log(this.productimg);

    console.log(this.addproductForm.value);

    this.adminApi.addproduct(pdata).subscribe((res: any) => {
      alert('Added sucessfully');
    });
  }
  selectedFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.productimg = event.target?.result;
      };
    }
  }
}
