import { HttpClient } from '@angular/common/http';
import { BaseService } from './../../../core/services/base.service';
import {Injectable, PipeTransform} from '@angular/core';
import { EndPoint } from 'src/app/core/enum/end-point.enum';
@Injectable()
export class EmployeeService extends BaseService {
  constructor(_http:HttpClient) {
    super(_http);
  }
  getEndPoint(): string {
    return EndPoint.employee;
  }
}
