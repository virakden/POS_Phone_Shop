import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Injectable } from '@angular/core';
import { isNotNullOrUndefined } from 'codelyzer/util/isNotNullOrUndefined';


@Injectable({
  providedIn: 'root'
})
export class BaseService {

  protected userUrl = environment.baseServer;
  protected baseUrl = environment.baseServer;
  protected baseServer = environment.baseServer;
  userType!: String;

  constructor(protected http: HttpClient, path: String) {
    this.userUrl = this.userUrl + path;
  }

  get(path: string, p: { responseType: string }) {
    return this.http.get<any[]>(this.baseUrl + path);
  }

  getObj() {
    return this.http.get<any>(this.userUrl+ '/all');
  }

  list(queryString: any, max: number, offset: number,) {
    let Params = new HttpParams();
    Params = Params.append('page', max.toString());
    Params = Params.append('size', offset.toString());

    if (isNotNullOrUndefined(queryString)) {
      if (isNotNullOrUndefined(queryString.query)) {
          Params = Params.append('query', queryString.query?.toString());
      }
      if (isNotNullOrUndefined(queryString.startDate)) {
          Params = Params.append('startDate', queryString?.startDate);
      }
      if (isNotNullOrUndefined(queryString.endDate)) {
          Params = Params.append('endDate', queryString?.endDate);
      }
  }
    return this.http.get(this.userUrl,{params:Params});
  }

  show(id: number) {
    return this.http.get<any>(this.userUrl + '/' + id);
  }

  update(obj: any) {
    return this.http.put<any>(this.userUrl + '/' + obj, obj.id);
  }

  create(obj: any) {
    return this.http.post<any>(this.userUrl, obj);
  }

  updateObj(obj: any) {
    return this.http.put(`${this.userUrl}/${obj.id}`, obj);
  }

  delete(id:any) {
    return this.http.delete(this.userUrl + '/' + id)
  }
}
