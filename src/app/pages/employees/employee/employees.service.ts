import { SortColumn, SortDirection } from './../../reports/transac/list-sortable.directive';
import { employeeModel } from './employees.model';


import { HttpClient } from '@angular/common/http';
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { Injectable } from '@angular/core';
import { Subject, Observable, of, BehaviorSubject } from 'rxjs';
import { BaseService } from 'src/app/core/base/base.service';
import { DecimalPipe } from '@angular/common';


@Injectable({ providedIn: 'root' })
export class EmployeeService extends BaseService {

  protected url = "http://localhost:8080/v1/employee/upLoadImage"

  constructor(public override http: HttpClient, public override pipe: DecimalPipe) {
    super(http, "/employee", pipe)
    this.getEmp()
  }
  emp: employeeModel[] = [];

  getEmp() {
    this.getObj().subscribe(res => {
      this.emp = res.results
      this._state.totalRecords = this.emp.length
      this.startIndex = (this._state.page - 1) * this.pageSize + 1;
      this.endIndex = (this._state.page - 1) * this.pageSize + this.pageSize;
      if (this.endIndex > this._state.totalRecords) {
        this.endIndex = this._state.totalRecords;
      }
      this.emp = this.emp.slice(this.startIndex - 1, this.endIndex);
      console.log('employee:', of(this.emp));
      return of(this.emp)

    })

  }


  uploadImageProfile(id: number, profilePhoto: string) {
    // @ts-ignore
    return this.http.put<any>(`${this.url}/${id}?profilePhoto=${profilePhoto}`);
  }

}
