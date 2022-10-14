import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, RequiredValidator, Validators } from '@angular/forms';
import { ProductsModel } from '../list/listStock.model';
import { ListStocksService } from '../list/listStock.service';
import { Component, OnInit } from '@angular/core';
// Ck Editer
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-adjustment',
  templateUrl: './adjustment.component.html',
  styleUrls: ['./adjustment.component.scss']
})

/**
 * Create Component
 */
export class AdjustmentComponent implements OnInit {

  // bread crumb items
  f!: FormGroup;
  breadCrumbItems!: Array<{}>;
  ProductData: ProductsModel[]=[];
  public Editor = ClassicEditor;

  constructor(private service: ListStocksService, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.initCreateForm();
    this.getProName();
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Stocks' },
      { label: 'Stock Adjustment', active: true }
    ];
  }

  initCreateForm() {
    this.f = this.fb.group({
        id: [null],
        productName:['',Validators.required],
        adjustmentType:['',Validators.required],
        qty: ['',Validators.required],
        reason:[null]
    });
  }

  getProName(){
    this.service.getObj().subscribe(res => {
        this.ProductData = res.results
    })
  }

  getDes(product:any) {
    const pro = JSON.parse(product);
    this.f.patchValue ({
        id : pro.id
    })
  }

  successmsg() {
    Swal.fire({
      reason: 'Good job!',
      text: 'You Success for Add stock!',
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: 'rgb(3, 142, 220)',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'OK'
    });
  }

  modelTitle() {
    Swal.fire({
      reason: 'Oops...',
      text: 'Stock Not Available Deduct!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(3, 142, 220)',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'Try Again',
    }).then(result => {
      if (result.value) {
        Swal.fire({ text:'Noted! QTY less than Stock.'});
      }
    });
  }

  updateAdjust(obj: any){
    this.service.ajustment(obj).subscribe(
        (res: any) => {
            if(res.results.response.status == 200){
                this.successmsg()
            } else if(res.results.response.status == 500){
                this.modelTitle()
            }
        } 
    )
  }

}
