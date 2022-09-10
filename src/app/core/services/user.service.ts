import { environment } from './../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/auth.models';


@Injectable({ providedIn: 'root' })
export class UserProfileService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }
    /***
     * Get All User
     */
    getAll(): Observable<User[]> {
        return this.http.get<User[]>(`${this.apiUrl}/employee/all`);
    }

    /***
     * Facked User Register
     */
    // register(user: User) {
    //     return this.http.post(`/users/register`, user);
    // }
}
 