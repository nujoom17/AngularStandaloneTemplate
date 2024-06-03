import { AfterViewInit, Component, OnInit, ViewChild, effect, inject, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../shared/data-access/auth.service';
import { Router } from '@angular/router';
import { ReportTableComponent } from '../shared/report-table/report-table.component';
import { of } from 'rxjs';
import { PaginationComponent } from '../shared/pagination/pagination.component';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: "./home.component.html",
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, PaginationComponent, ReportTableComponent],
  styleUrls: ['./home.component.scss'],
})
export default class HomeComponent implements OnInit,AfterViewInit {
  authService = inject(AuthService);
  private router = inject(Router);
  
  @ViewChild("reportTable")
  reportTableComponent: ReportTableComponent | any;
  pageConfig = signal({
    pageSize: 10,
    pageNumber: 1,
  });
  pagesVisible = signal(1);
  totalCount: number = 0;

  constructor() {
    effect(() => {
      if (!this.authService.user()) {
        this.router.navigate(['auth', 'login']);
      }
    });
  }

  ngOnInit(){
  }

  ngAfterViewInit(){
    this.fetchReportData()

  }

  fetchReportData(params?: any) {
    let payload = { //structure example, if any filters added make sure to add condition to set pagination page to 1 
      PageSize: this.pageConfig().pageSize,
      FromDate: null,
      ToDate: null,
      PageId: this.pageConfig().pageNumber,
      SortOrder: this.reportTableComponent?.sortDirection,
      SortField: this.reportTableComponent?.sortField,
      SearchCriteria: [],
    }; 

 
    console.log(this.reportTableComponent)
    of({data:[{"EntityName":"Custom One","EntityContact":"Custom 12","Type":"Type One","ExtraInfo":"ExOne23"},
    {"EntityName":"Custom 2","EntityContact":"CContactom 2","Type":"Type 2","ExtraInfo":"ExOne4523"},
    {"EntityName":"Custom 3","EntityContact":"Custom 23","Type":"Type 3","ExtraInfo":"ExOne2223"}
    ],totalCount:3}).subscribe({
      next: async (res:any) => {
        // this.reportData = res.data;
        this.reportTableComponent.reportData = await res.data
        
        this.totalCount = res.totalCount;
        
        console.log(res.data,this.totalCount)
        this.pagesVisible.set(
          Math.ceil(this.totalCount / this.pageConfig().pageSize)
        );
      },
      error: () => {
         //display error message
      },
    });
  }

  pageUpdated(event:any) {
    this.pageConfig.set(event);
    this.fetchReportData();
  }
}
