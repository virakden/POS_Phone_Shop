import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../core/services/auth.service';
import { MenuItem } from 'primeng/api';
import * as moment from 'moment';
@Injectable()
export class SharedService extends AuthenticationService {
  // Observable string sources
  private itemsSource = new Subject<MenuItem[]>();
  private emitShowLoading = new Subject();
  private emitStopLoading = new Subject();
  showLoading$ = this.emitShowLoading.asObservable();
  
  itemsHandler$ = this.itemsSource.asObservable();
  // showLoading$ = this.emitShowLoading.asObservable();

  emitChange(change: any) {
    this.itemsSource.next(change);
  }

  setBreadcrumb(items: MenuItem[]) {
    this.itemsSource.next(items);
  }

  showLoading(isShow: boolean) {
    this.emitShowLoading.next(isShow);
  }

  stopLoadingList(isStop: boolean) {
    this.emitStopLoading.next(isStop);
  }

  getName(obj: any, fieldSearch: string, valueSearch: any, fieldReturn: string) {
    return obj.find((x: any) => x[fieldSearch] === valueSearch)[fieldReturn];
  }

  getList(obj: any, fieldSearch: string, valueSearch: any) {
    return obj.filter((x: any) => x[fieldSearch] === valueSearch);
  }

  checkPermission(feature_str: string, function_str: string) {
    // const permission = this.getPermission();
    // const per = permission.find(x => x.function_name === function_str && x.feature.feature_name === feature_str);
  }

  log(str: any, title = '') {
    console.log(title);
    console.log(str);
  }

  dateFilter(date: any): any {
    return new Date(date).toLocaleDateString();
  }

  dateTimeFilter(date: any): any {
    return moment(date).format('MM/DD/YYYY HH:mm:ss');
  }

  convertToNumber = (numberData: any) => {
    if (typeof (numberData) === 'string') {
      if (numberData.indexOf(',') > -1) {
        return Number(numberData.split(',').join(''));
      } else {
        return Number(numberData);
      }
    } else {
      return Number(numberData);
    }
  }


}
