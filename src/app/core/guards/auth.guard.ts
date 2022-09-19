import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// Auth Services
import { AuthenticationService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

        console.log(this.authenticationService.getLoginUser());
        
        if(this.authenticationService.getLoginUser()){
            return true;
        }else{
            this.router.navigate(['/auth/login']);
            return false;
        }
    }

}
