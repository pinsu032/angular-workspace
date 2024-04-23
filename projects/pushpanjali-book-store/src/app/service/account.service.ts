import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Login } from '../contracts/Login';
import { UserContract } from '../contracts/UserContract';

//import { environment } from '@environments/environment';
//import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AccountService {
   // private userSubject: BehaviorSubject<User | null>;
   // public user: Observable<User | null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        //this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        //this.user = this.userSubject.asObservable();
    }

   /*  public get userValue() {
        //return this.userSubject.value;
    } */

    login(login : Login):Observable<any> {
        return this.http.post<any>('http://localhost:8080/admin/token', login);
    }

    /* logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    } */

    public registerUser(data:UserContract):Observable<UserContract>{
        return this.http.post<UserContract>('http://localhost:8080/user/register',data);
      }

    public getAllUser():Observable<any> {
        return this.http.get<any>('http://localhost:8080/user/all');
    }

   /* getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }*/

    update(id: number, user: any) {
        return this.http.put<any>(`http://localhost:8080/user/update/${id}`,user)
    }

    delete(id:number):Observable<any> {
        console.log(id)
        return this.http.delete<any>(`http://localhost:8080/user/del/${id}`);
    } 
    
    public updateProductById(id:number,product:any):Observable<any>{
        return this.http.put<any>(`http://localhost:8080/admin/update_p/${id}`,product);
    }

    public addProduct(data:any):Observable<any>{
        return this.http.post<any>('http://localhost:8080/admin/create_p',data);
    }
}