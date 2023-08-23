import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColDef, DataTypeDefinition, GridReadyEvent } from 'ag-grid-community';
import { GridApi } from 'ag-grid-community/dist/lib/gridApi';
import { AdminService } from 'src/app/shared/admin.service';
import { EditemployeeComponent } from '../editemployee/editemployee.component';

@Component({
  selector: 'app-viewemployee',
  templateUrl: './viewemployee.component.html',
  styleUrls: ['./viewemployee.component.scss'],
})
export class ViewemployeeComponent implements OnInit {
  employees: any;

  rowData: any[] = [];

  colDefs: any[] = [
    { field: 'firstname', rowDrag: true, unSortIcon: true, },
    { field: 'lastname', unSortIcon: true },
    { field: 'gender', width: 120, unSortIcon: true },
    { field: 'email', width: 210, unSortIcon: true },
    { field: 'mobile', unSortIcon: true },
    { field: 'role', unSortIcon: true },
    { field: 'salary', width: 120, unSortIcon: true },
    { field: 'address', width: 210, unSortIcon: true },
  ]


  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    width: 160,
    floatingFilter: true,
    resizable: true,
    editable: true,
  }
  gridApi!: GridApi;

  constructor(private adminApi: AdminService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.adminApi.viewemp().subscribe((res: any) => {
      this.employees = res;
      this.rowData = this.employees
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
