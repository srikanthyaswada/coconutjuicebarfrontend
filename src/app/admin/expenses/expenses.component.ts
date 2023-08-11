import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit {
  expenses: any;
  expensesForm!: FormGroup;

  constructor(private adminApi: AdminService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.adminApi.viewexpenses().subscribe((res: any) => {
      this.expenses = res;
      console.log(this.expenses);
    });

    this.expensesForm = this.fb.group({
      selectdate: ['', [Validators.required]],
      bills: ['', [Validators.required]],
      amount: ['', [Validators.required]],
    });
  }

  exp() {
    this.adminApi.addexpenses(this.expensesForm.value).subscribe((res: any) => {
      console.log(res);
      window.location.reload();
    });
  }
}