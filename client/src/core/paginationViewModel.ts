import { makeObservable, observable } from "mobx";

export interface IPaginationViewModel<TResultItem> {
  page: number;
  itemsPerPage: number;
  totalResults: number;

  withPagination(results: TResultItem[]): TResultItem[];
}

export abstract class AbstractPaginationViewModel {
  @observable page: number;
  @observable itemsPerPage: number = 0;
  @observable totalResults: number = 0;

  constructor(page: number, itemsPerPage: number, totalResults: number) {
    this.page = page;
    this.itemsPerPage = itemsPerPage;
    this.totalResults = totalResults;

    makeObservable(this);
  }
}

export class InMemoryPaginator<TResultItem>
  extends AbstractPaginationViewModel
  implements IPaginationViewModel<TResultItem> {
  withPagination(results: TResultItem[]): TResultItem[] {
    return results.slice(0);
  }
}

export class SQLPaginator<TResultItem>
  extends AbstractPaginationViewModel
  implements IPaginationViewModel<TResultItem> {
  withPagination(results: TResultItem[]): TResultItem[] {
    return results;
  }
}
