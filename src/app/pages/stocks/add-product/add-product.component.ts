import { environment } from 'src/environments/environment.prod';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListStocksService } from '../list/listStock.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


// Ck Editer
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.scss']
})

/**
 * AddProduct Component
 */
export class AddProductComponent implements OnInit {

    // bread crumb items
    breadCrumbItems!: Array<{}>;
    public Editor = ClassicEditor;
    productsForm!: FormGroup;
    photo: any;
    category: any;
    submitted = false;
    imagePath!: String;
    photos!: Array<{}>;
    config: DropzoneConfigInterface = {
        url: environment.baseServer + "/product/upLoadPhoto/2",
        maxFilesize: 50,
        acceptedFiles: 'image/*',
        method: "POST"
    }
    constructor(private service: ListStocksService, private fb: FormBuilder, private modalService: NgbModal) { }



    ngOnInit(): void {
        this.initCreateForm();
        this.getCatego();
        /**
        * BreadCrumb
        */
        this.breadCrumbItems = [
            { label: 'Stocks' },
            { label: 'Add Stock', active: true }
        ];


    }

    initCreateForm() {
        this.productsForm = this.fb.group({
            productName: [null],
            category: [null],
            brand: [null],
            stock:[null],
            description: [null],
            productCost: [null],
            productPrice: [null],
            photo: [null],
        });
    }

    position() {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          reason: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500,
        });
      }

    create() {
        const value = this.productsForm.value;
        value.photo = this.photos;
        this.service.create(value).subscribe(
            (res: any) => {
                if(res.response.status == 200){
                    this.position()
                }
            }
        );
        this.modalService.dismissAll();
    }

    getCatego() {
        this.service.getCate().subscribe(res => {
            this.category = res.results
        
        })
    }

   

    files: File[] = [];

    onSelect(event: any) {
        console.log(event.addedFiles);
        this.photo = event.addedFiles;
        // this.files=event.addedFiles


        this.files.push(...event.addedFiles);
        this.service.uploadImageProduct(this.files).subscribe(res => {
            console.log(res)
            const files = res.results;
            this.photos = files.map((res: any) => {
                return {
                    photoName: res.fileName,
                    photoPath: res.file
                }
            });
        })
    }


    onRemove(event: any) {
        console.log(event);
        this.files.splice(this.files.indexOf(event), 1);
    }




    /**
    * Multiple Default Select2
    */
    selectValue = ['Choice 1', 'Choice 2', 'Choice 3'];

}
