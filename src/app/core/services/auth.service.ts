import { Constant } from './../constants/constant';
import { LoginModel, Token, UserInfoResponse } from './../../account/login/login.model';
import { EndPoint } from './../enum/end-point.enum';
import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getFirebaseBackend } from '../../authUtils';
import { User } from '../models/auth.models';
// @ts-ignore
import * as forge from 'node-forge';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })

/**
 * Auth-service Component
 */
export class AuthenticationService  {
  
    user!: User;
    token!: string;
    currentUserValue: any;
    url:string = environment.apiUrl + EndPoint.login;
    menuSubject: any;
    frontKEY = 'froLOSEncryptKey';
    frontIV = 'froLOSEncryptVec';
    KEY = 'wedPCSEncryptKey';
    IV = 'wedPCSEncryptVec';
    // localStorage: any;
    // sessionStorage: any;
    tokenLocal !: string;
    tokenSession !: string;
   

    constructor(private _http:HttpClient){
        const tokenLocal = localStorage.getItem(Constant.TOKEN);
        const tokenSession = sessionStorage.getItem(Constant.TOKEN);
        if (localStorage.getItem(Constant.TOKEN)) {
            this.token = JSON.parse(tokenLocal || '');
            this.menuSubject.next(JSON.parse(localStorage.getItem(Constant.CMENU)|| ''));
        } else if (sessionStorage.getItem(Constant.TOKEN)) {
            this.token = JSON.parse(tokenSession || '');
            this.menuSubject.next(JSON.parse(sessionStorage.getItem(Constant.CMENU) || '' ));
        }
    }

    /**
     * Performs the register
     * @param email email
     * @param password password
     */
    register(email: string, password: string) {
        return getFirebaseBackend()!.registerUser(email, password).then((response: any) => {
            const user = response;
            return user;
        });
    }

    // getToken (): string | null {
    //     return this.localStorage.getItem(Constant.TOKEN);
    // }

    getLoginUser() {
        // return this.getToken()!==null;
        if (localStorage.getItem(Constant.USER_INFO)) {
            return JSON.parse(localStorage.getItem(Constant.USER_INFO) || '') as UserInfoResponse;
        } else if (sessionStorage.getItem(Constant.USER_INFO)) {
            return JSON.parse(sessionStorage.getItem(Constant.USER_INFO) || '') as UserInfoResponse;
        }else{
            return null;
        }
    }

    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */
    login(loginData: LoginModel) {
        const body = Object.assign(loginData);
        return this. _http.post('http://localhost:8080/v1/api/authenticate',body);
    }

    setLoginUser(data: Token) {
        console.log('Hey data: ', data);
        sessionStorage.setItem('token', JSON.stringify(data));
      }


    /**
     * Returns the current user
     */
     getUserInfo(): Observable<any> {
        if (localStorage.getItem(Constant.TOKEN)) {
            const data:any = localStorage.getItem(Constant.TOKEN);
            this.token = JSON.parse(data);
        } else {
            const data:any = sessionStorage.getItem(Constant.TOKEN);
            this.token = JSON.parse(data);
        }
        return this._http.get(`${this.url}/api/authenticate`)
     }

     Encrypt(decrypted: any) {
        const key = this.KEY;
        const iv = this.IV;
        const cipher = forge.cipher.createCipher('AES-CBC', key);
        cipher.start({ iv });
        cipher.update(forge.util.createBuffer(decrypted));
        cipher.finish();
        return forge.util.encode64(cipher.output.getBytes());
    }
    /**
     * Logout the user
     */
    logout() {
        // logout the user
        return getFirebaseBackend()!.logout();
    }

    /**
     * Reset password
     * @param email email
     */
    resetPassword(email: string) {
        return getFirebaseBackend()!.forgetPassword(email).then((response: any) => {
            const message = response.data;
            return message;
        });
    }

}

