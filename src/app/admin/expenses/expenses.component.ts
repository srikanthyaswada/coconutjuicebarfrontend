import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColDef, DataTypeDefinition, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit {
  expenses: any;
  expensesForm!: FormGroup;
  totalamount: number = 0;


  rowData: any[] = [];

  colDefs: any[] = [
    { field: 'selectdate', rowDrag: true, unSortIcon: true, },
    { field: 'bills', unSortIcon: true },
    { field: 'remarks', unSortIcon: true },
    { field: 'amount', unSortIcon: true },
  ]


  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    width: 185,
    floatingFilter: true,
    resizable: true,
    editable: true,
  }
  gridApi!: GridApi;

  constructor(private adminApi: AdminService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.adminApi.viewexpenses().subscribe((res: any) => {
      this.expenses = res;
      this.rowData = this.expenses
      console.log(this.rowData);

      this.expenses.map((t: any) => {
        this.totalamount += t.amount;
        console.log(this.totalamount, 'e total');
      });
    });

    this.expensesForm = this.fb.group({
      selectdate: ['', [Validators.required]],
      bills: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      remarks: ['', [Validators.required]],
    });
  }

  exp() {
    this.adminApi.addexpenses(this.expensesForm.value).subscribe((res: any) => {
      console.log(res);
      window.location.reload();
    });
  }


  onCellClicked(event: any) {

  }

  public dataTypeDefinitions: {
    [cellDataType: string]: DataTypeDefinition;
  } = {
      object: {
        baseDataType: 'object',
        extendsDataType: 'object',
        valueParser: (params) => ({ name: params.newValue }),
        valueFormatter: (params) =>
          params.value == null ? '' : params.value.name,
      },
    };

  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
}
