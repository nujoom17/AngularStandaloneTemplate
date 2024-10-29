import { Component, input, Input, signal, TemplateRef, ViewChild, WritableSignal } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-mat-table-common',
  templateUrl: './mat-table-common.component.html',
  styleUrls: ['./mat-table-common.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
  ]})
export class MatReportTableComponent {
  @Input() displayedColumns: string[] = [];
  totalCount = input<number>()
  private _dataSource: any[] = [];
  @Input() 
  set dataSource(data: any[]) {
    this._dataSource = data;
    this.tableDataSource.data = data; // Update the table data here
  }
  get dataSource(): any[] {
    return this._dataSource;
  }

  tableDataSource = new MatTableDataSource<any>();

  @ViewChild('customHeaders') customHeaders?: TemplateRef<any>;
  @ViewChild('customRows') customRows?: TemplateRef<any>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.tableDataSource.paginator = this.paginator;
    this.tableDataSource.sort = this.sort;
  }

  fetchReportData() {
    // Logic to fetch report data
  }

  exportExcel() {
    // Logic to export data as Excel
  }
}
