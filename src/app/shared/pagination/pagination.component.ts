import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  computed,
  signal,
} from '@angular/core';

interface pageConfig {
  pageSize: number;
  pageNumber: number;
}
@Component({
  standalone: true,
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  imports: [CommonModule],
})
export class PaginationComponent {
  minIndex: number = 1;
  maxIndex: number = 1;
  totalPage: number[] = [];
  @Input() showPageIndex: boolean = true;
  @Output() pageData = new EventEmitter();
  @Input() pageConfig: pageConfig = {
    pageNumber: 1,
    pageSize: 10,
  };
  @Input() pagesVisible: number = 1;
  @Input() totalCount: number = 1;

  totalPageVisible = signal([]);

  constructor() {}

  ngOnChanges() {
    let pages: any = [];
    for (
      let i = this.pageConfig.pageNumber, j = this.pageConfig.pageNumber - 1;
      i <= this.pageConfig.pageNumber + 4, j >= this.pageConfig.pageNumber - 5;
      i++, j--
    ) {
      if (i <= this.pagesVisible && pages?.length < 5) {
        pages?.push(i);
      }
      if (j > 0 && pages?.length < 5) pages?.unshift(j);
    }

    this.totalPageVisible.set(pages);
    this.minIndex =
      this.pageConfig.pageNumber * this.pageConfig.pageSize -
      this.pageConfig.pageSize +
      1;
    this.maxIndex = this.pageConfig.pageSize * this.pageConfig.pageNumber;
    if (this.maxIndex > this.totalCount) {
      this.maxIndex = this.totalCount;
    }
  }

    applyPagination(event: any, pageSizeChanged?:boolean) {
    if (
      event > this.pagesVisible ||
      event < 1 ||
      (this.pageConfig.pageNumber == event && !pageSizeChanged) 
    )
      return;
    this.pageConfig.pageNumber = event;
    this.minIndex =
      this.pageConfig.pageNumber * this.pageConfig.pageSize -
      this.pageConfig.pageSize +
      1;
    this.maxIndex = this.pageConfig.pageSize * this.pageConfig.pageNumber;

    if (this.maxIndex > this.totalCount) {
      this.maxIndex = this.totalCount;
    }

    this.pageData.emit({
      pageNumber: this.pageConfig.pageNumber,
      pageSize: this.pageConfig.pageSize,
    });
  }

  pageSizeChanged(event){
    this.pageConfig.pageSize = event
    this.applyPagination(1,true)
  }
}
