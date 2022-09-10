import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // tslint:disable-next-line: max-line-length
        // const users: any[] = JSON.parse(localStorage.getItem('users')!) || [{ username: 'admin', email: 'admin@gmail.com', password: '123456' }];

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // authenticate
          

            // get users
       
            // get user by id
        
            // register user
        

            // delete user
       
                    // respond 200 OK
           
            // pass through any requests not handled above
            return next.handle(request);

        }))

            // tslint:disable-next-line: max-line-length
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());
    }
}
