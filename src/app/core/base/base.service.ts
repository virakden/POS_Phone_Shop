import { tap, debounceTime, switchMap, delay } from 'rxjs/operators';
import { SortColumn, SortDirection } from './base.directive';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Injectable, PipeTransform } from '@angular/core';
import { isNotNullOrUndefined } from 'codelyzer/util/isNotNullOrUndefined';
import { BehaviorSubject, Subject, of, Observable } from 'rxjs';
import { DecimalPipe } from '@angular/common';

interface SearchResult {
  data: any[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  startIndex: number;
  endIndex: number;
  totalRecords: number;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(countries: any[], column: SortColumn, direction: string): any[] {
  if (direction === '' || column === '') {
    return countries;
  } else {
    return [...countries].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(item: any, term: string, pipe: PipeTransform) {
  return item.id.toLowerCase().includes(term.toLowerCase())
  || item.itemName.toLowerCase().includes(term.toLowerCase())
  || item.email.toLowerCase().includes(term.toLowerCase())
  || item.score.toLowerCase().includes(term.toLowerCase())
  || item.phone.toLowerCase().includes(term.toLowerCase())
  || item.brand.toLowerCase().includes(term.toLowerCase())
  || item.date.toLowerCase().includes(term.toLowerCase())
  || item.priority.toLowerCase().includes(term.toLowerCase())
  ;
}

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  protected userUrl = environment.baseServer;
  protected baseUrl = environment.baseServer;
  protected baseServer = environment.baseServer;
  protected data:Array<any> = [];
  protected _loading$ = new BehaviorSubject<boolean>(true);
  protected _search$ = new Subject<void>();
  protected _data$ = new BehaviorSubject<any[]>([]);  
  protected _total$ = new BehaviorSubject<number>(0);

  userType!: String;

  public _state: State = {
    page: 1,
    pageSize: 8,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
    startIndex: 0,
    endIndex: 9,
    totalRecords: 0
  };


  constructor(public http: HttpClient, path: String, public pipe: DecimalPipe) {
    this.userUrl = this.userUrl + path;
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._data$.next(result.data);
      this._total$.next(result.total);
    });

    this._search$.next();
    
  }

  get data$() { return this._data$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }
  get startIndex() { return this._state.startIndex; }
  get endIndex() { return this._state.endIndex; }
  get totalRecords() { return this._state.totalRecords; }

  get(path: string) {
   return this.http.get(this.baseUrl + path);
  }
  getObj() {
    return this.http.get<any>(this.userUrl+ '/all');
  }
  list(queryString: any, max: number, offset: number,) {
    let Params = new HttpParams();
    Params = Params.append('page', max.toString());
    Params = Params.append('size', offset.toString());

    if (isNotNullOrUndefined(queryString)) {
      if (isNotNullOrUndefined(queryString.query)) {
          Params = Params.append('query', queryString.query?.toString());
      }
      if (isNotNullOrUndefined(queryString.startDate)) {
          Params = Params.append('startDate', queryString?.startDate);
      }
      if (isNotNullOrUndefined(queryString.endDate)) {
          Params = Params.append('endDate', queryString?.endDate);
      }
  }
    return this.http.get(this.userUrl,{params:Params});
  }
  show(id: number) {
    return this.http.get<any>(this.userUrl + '/' + id);
  }
  update(obj: any) {
    return this.http.put<any>(this.userUrl + '/' + obj, obj.id);
  }
  create(obj: any) {
    return this.http.post<any>(this.userUrl, obj);
  }
  
  updateObj(obj: any) {
    return this.http.put(`${this.userUrl}/update/${obj.id}`, obj);
  }
  delete(id:any) {
    return this.http.delete(this.userUrl + '/' + id)
  }

  // /*** Upload Single Image */
  // uploadImage(file: any) {
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   return this.http.put<any>(this.userUrl + '/upLoadImage' ,formData);
  // }

  // uploadImageProfile(id: number, profilePhoto: string) {
  //   // @ts-ignore
  //   return this.http.put<any>(this.userUrl+ '/upLoadImage'/${id});
  // }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }
  set startIndex(startIndex: number) { this._set({ startIndex }); }
  set endIndex(endIndex: number) { this._set({ endIndex }); }
  set totalRecords(totalRecords: number) { this._set({ totalRecords }); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }
  private _search(): Observable<SearchResult> {
    
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let data = sort(this.data, sortColumn, sortDirection);

    // 2. filter
    data = data.filter(item => matches(item, searchTerm, this.pipe));
    const total = data.length;

    // 3. paginate
    this.totalRecords = data.length;
    this._state.startIndex = (page - 1) * this.pageSize + 1;
    this._state.endIndex = (page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
        this.endIndex = this.totalRecords;
    }
    data = data.slice(this._state.startIndex - 1, this._state.endIndex);
    return of({data, total});
  }

}
