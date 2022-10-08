import { FormGroup, FormBuilder } from '@angular/forms';
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
        productName:[null]
    });
  }

  getProName(){
    this.service.getObj().subscribe(res => {
        this.ProductData = res.results
        console.log(this.ProductData)
    })
  }

  getDes(product:any) {
    const pro = JSON.parse(product);
    console.log(pro);
    this.f.patchValue ({
        id : pro.id
    })
  }

}
