import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "searchPipe",
  standalone: true
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchText: string,searchKey: string): any[] {
    if (!items) return [];
    if (searchText == "" || !searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter((it) => {
      return it?.[searchKey].toLowerCase().includes(searchText);
    });
  }
}