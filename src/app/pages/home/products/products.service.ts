import { environment } from 'src/environments/environment.prod';
import { BaseService } from 'src/app/core/base/base.service';
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import {Injectable} from '@angular/core';

import {ProductModel} from './products.model';
import {DecimalPipe} from '@angular/common';
import {SortColumn, SortDirection} from './products-sortable.directive';
import { HttpClient } from '@angular/common/http';

interface SearchResult {
  countries: ProductModel[];
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

    

// const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

// function sort(countries: productModel[], column: SortColumn, direction: string): productModel[] {
//   if (direction === '' || column === '') {
//     return countries;
//   } else {
//     return [...countries].sort((a, b) => {
//       const res = compare(a[column], b[column]);
//       return direction === 'asc' ? res : -res;
//     });
//   }
// }

// function matches(country: productModel, term: string, pipe: PipeTransform) {
//   return country.image.toLowerCase().includes(term.toLowerCase())
//   || country.name.toLowerCase().includes(term.toLowerCase())
//  ;
// }

@Injectable({providedIn: 'root'})

export class ProductsService extends BaseService {
//   private _loading$ = new BehaviorSubject<boolean>(true);
//   private _search$ = new Subject<void>();
//   private _countries$ = new BehaviorSubject<productModel[]>([]);
//   private _total$ = new BehaviorSubject<number>(0);

//   private _state: State = {
//     page: 1,
//     pageSize: 10,
//     searchTerm: '',
//     sortColumn: '',
//     sortDirection: '',
//     startIndex: 0,
//     endIndex: 9,
//     totalRecords: 0
//   };

protected url = this.baseUrl + "/sale/add-more"

  constructor(public override http: HttpClient, public override pipe: DecimalPipe) {
    super(http, "/product", pipe)
    // this._search$.pipe(
    //   tap(() => this._loading$.next(true)),
    //   debounceTime(200),
    //   switchMap(() => this._search()),
    //   delay(200),
    //   tap(() => this._loading$.next(false))
    // ).subscribe(result => {
    //   this._countries$.next(result.countries);
    //   this._total$.next(result.total);
    // });

    // this._search$.next();
  }

  addSale(item: any) {
    return this.http.post<any>(this.url, item)
  }





//   private _search(): Observable<SearchResult> {
//     const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

//     // 1. sort
//     let countries = sort(Products, sortColumn, sortDirection);

//     // 2. filter
//     countries = countries.filter(country => matches(country, searchTerm, this.pipe));
//     const total = countries.length;

//     // 3. paginate
//     this.totalRecords = countries.length;
//     this._state.startIndex = (page - 1) * this.pageSize + 1;
//     this._state.endIndex = (page - 1) * this.pageSize + this.pageSize;
//     if (this.endIndex > this.totalRecords) {
//         this.endIndex = this.totalRecords;
//     }
//     countries = countries.slice(this._state.startIndex - 1, this._state.endIndex);
//     return of({countries, total});
//   }
}
