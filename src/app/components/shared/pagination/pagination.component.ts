import { CommonModule, } from '@angular/common';
import {
  Component,
  EventEmitter,
  input,
  Output,
  computed,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

interface pageConfig {
  pageSize: number;
  pageNumber: number;
}
@Component({
  standalone: true,
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class PaginationComponent {
 
  minIndex = computed(()=>{
    return  this.pageConfig().pageNumber * this.pageConfig().pageSize -
    this.pageConfig().pageSize + 1;
  })

  maxIndex = computed(()=>{
    let result = this.pageConfig().pageSize * this.pageConfig().pageNumber;

    if (result > this.totalCount()) {
      result = this.totalCount();
    }
    return result
  })

  totalPage: number[] = [];
  showPageIndex = input<boolean>();
  @Output() pageData = new EventEmitter();
  pageConfig = input<pageConfig>({
    pageNumber:1,
    pageSize:10
  })
  pagesVisible = input<number>(0)
  totalCount = input<number>(0)

  totalPageVisible = computed(()=>{
    let pages: any = [];
    for (
      let i = this.pageConfig().pageNumber, j = this.pageConfig().pageNumber - 1;
      i <= this.pageConfig().pageNumber + 4, j >= this.pageConfig().pageNumber - 5;
      i++, j--
    ) {
      if (i <= this.pagesVisible() && pages?.length < 5) {
        pages?.push(i);
      }
      if (j > 0 && pages?.length < 5) pages?.unshift(j);
    }

    return pages
  },);

  constructor() {}

  applyPagination(event: any, pageSizeChanged?:boolean) {
    if (
      event > this.pagesVisible() ||
      event < 1 ||
      (this.pageConfig().pageNumber == event && !pageSizeChanged)
    )
      return;
    this.pageConfig().pageNumber = event;

    this.pageData.emit({
      pageNumber: this.pageConfig().pageNumber,
      pageSize: this.pageConfig().pageSize,
    });
  }

  pageSizeChanged(event:any){
    this.pageConfig().pageSize = event as number
    this.applyPagination(1,true)
  }
}
