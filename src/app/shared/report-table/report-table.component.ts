import { CommonModule, DatePipe } from "@angular/common";
import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  NgModule,
  Output,
  TemplateRef,
  inject,
  input,
} from "@angular/core";
import { FormsModule, NgModel } from "@angular/forms";
import { RouterOutlet } from "@angular/router";
import {
  Observable,
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
} from "rxjs";
import { SearchPipe } from "../pipes/search.pipe";
import { NgxPaginationModule } from "ngx-pagination";


@Component({
  selector: "app-report-table",
  templateUrl: "./report-table.component.html",
  styleUrls: ["./report-table.component.scss"],
  providers: [DatePipe],
  imports: [CommonModule, RouterOutlet, FormsModule, NgxPaginationModule, SearchPipe],
  standalone:true
})
export class ReportTableComponent {
  reportData = input<any>([])
  reportTitle = input<any>()
  paginateManually = input<boolean>(false)
  pageSize = input<number>(10)
  pageNumber = input<number>(1)
  isClientSideSearchEnabled = input<boolean>(false) //only works for manual pagination via front-end
  searchFilter:any

  searchFilterList = input<any[]>()

  txtQuery: any;

  sortDirection: any;
  sortField: any;
  txtFieldChangedSubject = new Subject();
  private datePipe = inject(DatePipe);
  public el = inject(ElementRef);


  @ContentChild("customHeaders") customHeaders!: TemplateRef<any>;
  @ContentChild("customRows") customRows!: TemplateRef<any>;
  entityList: any;
  entityTypeList: any;
  @Output() fetchReportDataEvent = new EventEmitter();


  fetchReportData(param?: any, additionalParam?: any) {
 
    this.fetchReportDataEvent.emit(param);
  }



  ngOnInit() {


  }

 

  constructor() {
    this.txtFieldChangedSubject
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((value) => {
        this.fetchReportData(value);
      });
  }


  entityChanged() {}
  entityTypeChanged() {}

  clearFilters() {}
  toggleMenu() {}

  exportExcel() {
    try {
      // let formattedJSON = this.reportData.map(({ Id, ...rest }) => rest); //your custom logic to export excel
      // this.excelService.exportAsExcelFile(
      //   formattedJSON,
      //   `${this.reportTitle}-${new Date().toLocaleDateString("en-US")}`
      // );
    } catch (err) {
      // display error message
    }
  }

  onFieldChange(event:any) {
    this.txtFieldChangedSubject.next(event);
  }

  addTableModal(event:any) {
    // this.addButtonEvent.emit(event);
  }

  ngOnDestroy() {
    
  }
}
