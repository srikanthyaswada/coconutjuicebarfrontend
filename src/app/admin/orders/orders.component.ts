import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ColDef, DataTypeDefinition, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = [
    'createdAt',
    'mobile number',
    'item',
    'price',
    'quantity',
    'total price',
    'total',
  ];
  dataSource: any = [];
  orders: any;
  income: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  rowData: any[] = [];

  colDefs: any[] = [
    { field: 'createdAt', rowDrag: true, unSortIcon: true, },
    { field: 'mobilenumber', unSortIcon: true },
    {
      field: "orderDetails[].product",
      width: 120, unSortIcon: true,
    },
    { field: 'price', width: 210, unSortIcon: true },
    { field: 'quatity', unSortIcon: true },
    { field: 'total', unSortIcon: true },
    { field: 'grandTotal', width: 120, unSortIcon: true },

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
  constructor(private adminApi: AdminService) { }

  ngOnInit(): void {
    this.adminApi.viewOreder().subscribe((res: any) => {
      this.orders = res;
      this.rowData = this.orders
      console.log(this.orders);

      this.orders.map((i: any) => {
        this.income += i.grandTotal;
      });
      this.dataSource = new MatTableDataSource(this.orders);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
