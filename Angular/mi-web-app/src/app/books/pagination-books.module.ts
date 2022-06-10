import { Books } from "./books.model";

export interface PaginationBook  {
  pageSize: number;
  page:Number;
  sort:string;
  sortDirection: string;
  pagesQuantity:number;
  data:Books[];
  filterValue:{};
  totalRows:number;


}
