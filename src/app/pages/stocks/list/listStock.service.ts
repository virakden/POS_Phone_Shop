import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService } from 'src/app/core/base/base.service';
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable } from '@angular/core';
import { DecimalPipe } from '@angular/common';


@Injectable({ providedIn: 'root' })
export class ListStocksService extends BaseService{

    protected url = "http://localhost:8080/v1/image/upload-images"
    protected urlCate = environment.baseServer+"/category/all"
    protected urlAdj = environment.baseServer+"/stock-adjust/update"



    constructor(public override http: HttpClient, public override pipe: DecimalPipe){
        super(http, "/product", pipe)
    }

    uploadImageProduct( photo: File[]) {
        let body = new FormData();
        photo.map(file => {
            body.append('files',file);
        });
        // @ts-ignore
        return this.http.post<any>(`${this.url}`, body);
    }

    getCate(){
        return this.http.get<any>(this.urlCate)
    }

    ajustment(obj: any){
        return this.http.put<any>(this.urlAdj +'/'+ obj.id, obj);
    }

}
