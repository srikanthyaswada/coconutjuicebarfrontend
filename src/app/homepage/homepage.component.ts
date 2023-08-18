import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../shared/admin.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  adminForm!: FormGroup;
  admin: any;
  constructor(
    private router: Router,
    private f: FormBuilder,
    private api: AdminService
  ) {}

  ngOnInit(): void {
    this.adminForm = this.f.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  login() {
    if (this.adminForm.valid) {
      this.api.adminLogin(this.adminForm.value).subscribe((res: any) => {
        this.admin = res;
        debugger
        if (
          this.admin.username == this.adminForm.value.username &&
          this.admin.password == this.adminForm.value.password
        ) {
          localStorage.setItem('admin', JSON.stringify(res));
          this.router.navigate(['admin-dashboard']);
        } else {
          alert('Admin Login failed...!');
        }
      });
    }
  }
}
