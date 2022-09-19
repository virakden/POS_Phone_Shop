import { SortColumn, SortDirection } from './../../reports/transac/list-sortable.directive';
import { filter } from 'rxjs/operators';
import { employeeModel } from './employees.model';


import { HttpClient } from '@angular/common/http';
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { Injectable } from '@angular/core';
import { Subject, Observable, of, BehaviorSubject } from 'rxjs';
import { BaseService } from 'src/app/core/base/base.service';

interface State{
  searchTerm: string;
  page: number;
  pageSize: number;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  startIndex: number;
  endIndex: number;
  totalRecords: number;
}

interface SearchResult {
  employee: employeeModel[];
  total: number;
}

@Injectable({ providedIn: 'root' })
export class EmployeeService extends BaseService {
  private _search$ = new Subject<void>();
  emp: employeeModel[] = [];
  private _total$ = new BehaviorSubject<number>(0);
  

  constructor( protected override http: HttpClient ) {
    super( http, '/employee');
    this.getEmp()
    

  }

  private _state: State ={
    page: 1,
    pageSize: 5,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
    startIndex: 0,
    endIndex: 6,
    totalRecords: 0
  }

  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }
  get startIndex() { return this._state.startIndex; }
  get endIndex() { return this._state.endIndex; }  
  get totalRecords() { return this._state.totalRecords; }
  get total$() { return this._total$.asObservable(); }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set totalRecords(totalRecords: number) { this._set({ totalRecords }); }
  set startIndex(startIndex: number) { this._set({ startIndex }); }
  set endIndex(endIndex: number) { this._set({ endIndex }); }



  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  getEmp(){
    this.getObj().subscribe(res=>{
        this.emp = res.results
        // const total = this.Empl.length
        // this._total$.next(this.emp.length)
        this._state.totalRecords = this.emp.length
        this.startIndex = (this._state.page - 1) * this.pageSize + 1;
        this.endIndex = (this._state.page - 1) * this.pageSize + this.pageSize;
        if (this.endIndex > this._state.totalRecords) {
          this.endIndex = this._state.totalRecords;
        }
        this.emp = this.emp.slice(this.startIndex - 1, this.endIndex);
        // console.log('total:', total);
        
        console.log('employee:',of(this.emp));
        return of(this.emp)

    })

  }

}
