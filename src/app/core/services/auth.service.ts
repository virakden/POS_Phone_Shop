import { Data, Token } from './../models/auth.models';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Login } from '../models/auth.models';
import * as forge from 'node-forge';


@Injectable({ providedIn: 'root' })

/**
 * Auth-service Component
 */
export class AuthenticationService {
    
    url = environment.baseServerLogin;
    public token?: string | null;
    public localUserKey = 'CurrentUser';
    public isExpired = 'IsExpired';
    private secrete = '9452e6b9-2b47-4493-b5c0-647be1f93809';
    public salt!: string;
    public iv!: string;
    // KEY = 'aesEncryptionKey';
    KEY = 'aesEncryptionKey';
    IV = 'encryptionIntVec';
    
    constructor(private http: HttpClient, private router: Router) {
        if (localStorage.getItem('token')){
            this.token = JSON.parse(localStorage.getItem('token') as string);
        } else if (sessionStorage.getItem('token')) {
            this.token = JSON.parse(sessionStorage.getItem('token') as string)
        }
     }

    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */
    login(data: Login): Observable<any> {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        return this.http.post<any>(`http://localhost:8080/v1/api/authenticate`,data);
    }

    /**
     * Check Expired Date
     */
    checkExpired(): any {
        if (localStorage.getItem(this.localUserKey)) {
            return localStorage.getItem(this.isExpired);
        } else if (sessionStorage.getItem(this.localUserKey)) {
            return sessionStorage.getItem(this.isExpired);
        }
    }



    /**
     * Returns the current user
     */
    public getUserInfo(): Observable<any> {
        if (localStorage.getItem('token')){
            this.token = JSON.parse(localStorage.getItem('token') as string);
        } else if (sessionStorage.getItem('token')) {
            this.token = JSON.parse(sessionStorage.getItem('token') as string);
        }
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: `Bearer ${this.token}`
            })
        }
        return this.http.get(`${this.url}/`)
    }

    /**
     * Logout the user
     */
    logout(): void {
        // logout the user
        this.token= null;
        sessionStorage.clear();
        localStorage.removeItem(this.localUserKey);
        localStorage.removeItem('token');
        this.router.navigate(['/auth/login']);

    }

    setLoginUser(results: Token) {
        sessionStorage.setItem('token', JSON.stringify(results.token));
    }


    /**
     * Remember Account Login
     */
    rememberLoginUser(results: Token ) {
        localStorage.setItem('token', JSON.stringify(results.token));
    } 

    getLoginUser() {
        return this.getToken();
    }

    

    Encrypt (decrypted: any) {
        const salt = forge.random.getBytesSync(128);
        const key = this.KEY;
        const iv = this.IV;

        const cipher = forge.cipher.createCipher('AES-CBC', key);
        cipher.start({iv});
        cipher.update(forge.util.createBuffer(decrypted));
        cipher.finish();
        const cipherText = forge.util.encode64(cipher.output.getBytes()); 

        const result = forge.util.encode64(decrypted);
        this.salt = forge.util.encode64(salt);
        this.iv = forge.util.encode64(iv);
        return cipherText;
    }

    public getToken() {
        const sessionToken = sessionStorage.getItem('token');
        const localToken = localStorage.getItem('token');
        return sessionToken ? sessionToken : localToken;
    }

}

