import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Sweet Alert
import Swal from 'sweetalert2';

import { EmployeeService } from './employee.service';
import { NgbdAdvancedSortableHeader } from './employee-sortable.directive';
import { employeeModel } from './employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})

/**
 * Customers Component
 */
export class EmployeeComponent {

  @ViewChildren(NgbdAdvancedSortableHeader) headers!: QueryList<NgbdAdvancedSortableHeader>;
  form!: FormGroup;
  submitted: boolean=false;
  employees!: employeeModel[];
  constructor(public service: EmployeeService, private formBuilder: FormBuilder) {

  }
  iniForm() {
    this.form = this.formBuilder.group({
      employee_name: [null, Validators.required],
      employee_email: [null, Validators.required],
      employee_telephone: [null, Validators.required],
      join_date: [new Date],
      profile_photo: [null],
      Status:[null]
    });
  }
  ngOnInit(): void {
    this.list();
    this.iniForm();
  }
  get f() {
    return this.form.controls;
  }

  saveUser(){

  }


  
  list() {
    const com = 'complete';
    this.service.list().subscribe((res: any) => {
      console.log('res');

    }, (error: Error) => {
      console.log('error');

    }, () => {
      console.log(com);

    })
  }

  /**
  * Confirmation mail model
  */
  confirm() {
    Swal.fire({
      reason: 'Are you sure ?',
      text: 'Are you sure you want to remove this record ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Close'
    }).then(result => {
      if (result.value) {
        Swal.fire('Deleted!', 'Mail has been deleted.', 'success');
      }
    });
  }


}
