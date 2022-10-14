import { HttpHandler, HttpClient } from '@angular/common/http';
import { NgbdLeadsSortableHeader } from 'src/app/core/base/base.directive';
import { EmployeeModules } from './../employees.module';
import { SharedService } from './../../../shared/shared.service';
import { BaseComponent } from './../../../core/base/base.component';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Sweet Alert

import { employeeModel } from './employees.model';
import { EmployeeService } from './employees.service';
import { Router } from '@angular/router';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '../../home/products/products.service';
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  providers: [ProductsService, DecimalPipe]
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
  fileUploaded: any;
  imagePath!: String;
  urlLink: any = 'assets/images/users/user-dummy-img.jpg';
  objs: any;
  startIndex = 0;
  endIndex = 3;
  totalRecord!: number;
  pages = 1
  pageSize = 3
  private _total$ = new BehaviorSubject<number>(0);
  total$?: Observable<number>;
  public Storage= "http://localhost:8080/v1/image";

    // Table data
    staff$!: Observable<employeeModel[]>;
    // total$: Observable<number>;
    @ViewChildren(NgbdLeadsSortableHeader) headers!: QueryList<NgbdLeadsSortableHeader>;
  

  get totals$() { return this._total$.asObservable(); }
  constructor(
    public http: HttpClient,
    public shared: SharedService,
    public override fb: FormBuilder,
    public override service: EmployeeService,
    private route: Router,
    private modalService: NgbModal,
    public dialogService: DialogService,

  ) {
    super();
    this.sharedService = shared;
    this.initCreateForm();
    this.staff$ = service.data$;
    this.total$ = this.totals$

  }

  ngOnInit(): void {
    // this.getObjList();
    this.initCreateForm();
    this.getEmp();
    
  }


  initCreateForm() {
    this.employeeForm = this.fb.group({
      id: [null],
      employeeName: ['', Validators.required],
      employeeEmail: ['', Validators.required],
      employeeTelephone: ['', Validators.required],
      joinDate:[null],
      profilePhoto: [null],
      password: ['', Validators.required],
      status: [null]
    });
  }



  openModal(add: any) {

    this.submitted = false;
    this.employeeForm.reset();
    this.modalService.open(add, { size: 'md', centered: true });
  }


  editModal(edit: any,emp: any) {
    this.employeeForm.patchValue(emp)
    // this.submitted = false;
    this.modalService.open(edit, { size: 'md', centered: true });
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
     
      return of(this.Empl)

    })
  }

 onSave(formObj: any) {
    this.objs = formObj;
    
    
    this.objs.profilePhoto = this.imagePath;

   this.service.creatEmp(this.objs).subscribe(res=>{
      this.ngOnInit()
      
    })
    
    // this.service.create(this.objs).subscribe(
    //   (res: any) => {
    //     this.ngOnInit();
    //   });
      


      this.modalService.dismissAll();
  }

  onEdit(object: any) {
    this.objs = object;
    this.objs.profilePhoto = this.imagePath;

    this.service.updateObj(this.objs).subscribe(
        (res: any) => {
            this.ngOnInit();
        }
    ); 



   
    this.modalService.dismissAll();
  
  }



  /**
   * Upload Image
   */
   onSelectFile(event: any ) {
    if (event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event) => {
        // @ts-ignore
        this.urlLink = event.target.result
        // this.f.controls["profilePhoto"] = this.urlLink
      };
    }
    this.fileUploaded = event.target.files[0];
    this.service.uploadImage(this.fileUploaded, "employeeProfile").subscribe((res:any) =>{


      this.imagePath = res.results.file
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



