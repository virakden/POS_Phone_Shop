import { environment } from './../../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';

export abstract class BaseService {
    protected url:string;
    constructor(public _http:HttpClient) {
        this.url = environment.apiUrl + this.getEndPoint();
    }
    abstract getEndPoint():string;

    //CRUD Method
    list(){
        return this._http.get(this.url);
    }
    update(body:any){
        return this._http.put(this.url,body);
    }
    trash(id:number){
        let Params = new HttpParams();
        Params = Params.append("id",id);
        return this._http.delete(this.url,{params:Params});
    }
    create(body:any){
        return this._http.post(this.url,body)
    }
}