import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// Auth Services
import { AuthenticationService } from '../services/auth.service';

import { isNotNullOrUndefined } from 'codelyzer/util/isNotNullOrUndefined'


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot) {
        if (!this.authenticationService.getLoginUser()) {

            let data: any = this.authenticationService.getLoginUser();
            console.log(data);
            
            return true;
        } else {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/auth/login']);
            return false;
        }


    }
}



