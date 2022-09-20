import { EmployeeModules } from './../employees.module';
import { SharedService } from './../../../shared/shared.service';
import { BaseComponent } from './../../../core/base/base.component';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { FormGroup, FormBuilder } from '@angular/forms';

// Sweet Alert

import { employeeModel } from './employees.model';
import { EmployeeService } from './employees.service';
import { Router } from '@angular/router';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})


/**
 * Customers Component
 */
export class EmployeesComponent extends BaseComponent implements OnInit {



  // bread crumb items
  breadCrumbItems!: Array<{}>;
  rowSelected = {} as EmployeeModules;
  submitted = false;
  employeeForm!: FormGroup;
  Empl!: employeeModel[];
  masterSelected!: boolean;
  checkedList: any;
  display = false;
  employeeHave = false;
  employeeNotExist = false;
  startIndex = 0;
  endIndex = 5;
  totalRecord!: number;
  pages = 1
  pageSize = 5
  private _total$ = new BehaviorSubject<number>(0);
  total$?: Observable<number>;

  get totals$() { return this._total$.asObservable(); }
  constructor(
    public shared: SharedService,
    public override fb: FormBuilder,
    public override service: EmployeeService,
    private route: Router,
    private modalService: NgbModal,
    public dialogService: DialogService

  ) {
    super();
    this.sharedService = shared;
    this.initCreateForm();
    this.total$ = this.totals$

  }

  ngOnInit(): void {
    // this.getObjList();
    this.getEmp();
    console.log('ts:', this.total$);
  }

  initCreateForm() {
    this.employeeForm = this.fb.group({
      employeeName: [null],
      employeeEmail: [null],
      employeeTelephone: [null],
      profilePhoto: [null],
      password: [null],
    });
  }

  /**
* Open modal
* @param content modal content
*/
  openModal(content: any) {
    this.submitted = false;
    this.modalService.open(content, { size: 'md', centered: true });
  }

  editModal(content: any) {
    this.submitted = false;
    this.modalService.open(content, { size: 'md', centered: true });
  }

  done() {
    return this.getEmp();
  }

  getEmp() {
    this.service.getObj().subscribe(res => {
      this.Empl = res.results
      // this.ngOnInit();
      this._total$.next(this.Empl.length)
      this.totalRecord = this.Empl.length
      this.startIndex = (this.pages - 1) * this.pageSize + 1;
      this.endIndex = (this.pages - 1) * this.pageSize + this.pageSize;
      if (this.endIndex > this.totalRecord) {
        this.endIndex = this.totalRecord;
      }
      this.Empl = this.Empl.slice(this.startIndex - 1, this.endIndex);
      // console.log('total:', total);

      console.log('employee:', of(this.Empl));
      return of(this.Empl)

    })

  }

  override showViewForm(obj: any) {
    this.obj = obj;
    this.route.navigate(['/customer/view-customer', this.obj.id]).then();
  }


  onSelectRow(event: any) {
    this.rowSelected = event.data;
  }

  override search(query: any) {
    this.queryString = query;
    this.pageIndex = 0;
    this.activeCurrentPage();
    this.queryData();
  }

  setPaginator(event: any) {
    this.pageIndex = event.pages;
    this.numRecord = event.rows;
    this.activeCurrentPage();
    this.queryData();
  }

  onDedupeSearch(value: any) {
    // value.dob = formatDate(value.dob, 'dd-MMM-y', 'en-US');
    this.queryString = value;
    this.queryData();
  }

  onCancel() {
    this.display = false;
    this.employeeHave = false;
    this.employeeNotExist = false;
  }

  onResetForm() {
    this.fs.reset();
    this.search(this.fs.value);
  }

}



