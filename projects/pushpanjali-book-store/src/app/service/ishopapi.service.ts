import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserContract } from '../contracts/UserContract'; 
import { OrderDetails } from '../contracts/OrderDetails';
import { HttpResponse ,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IshopapiService {

  

  constructor(private http: HttpClient) { }

  public getUsers():Observable<UserContract[]>{
    return this.http.get<UserContract[]>('http://localhost:9092/user/all');
  }

  public login(data:any):Observable<any>{
    return this.http.post<any>('http://localhost:9092/user/login',data);
  }

  public loadCategories():Observable<any>{
    return this.http.get<any>('http://localhost:8080/admin/categories');
  }

  public loadProductsByCategory():Observable<any>{
    return this.http.get<any>('http://localhost:8080/admin/fetch/');
  }

  public loadProducts():Observable<any>{
    return this.http.get<any>('http://localhost:8080/admin/getAll_p');
  }

  public placeOrder(data:OrderDetails):Observable<any>{
    return this.http.post<any>('http://localhost:8080/order/place',data)
  }

  public checkStock(pid:number,noOfproduct:number):Observable<any>{
    return this.http.get<any>(`http://localhost:8080/admin/stock/${pid}/${noOfproduct}`);
  }

  public getOrderDetails():Observable<any>{
    return this.http.get<any>('http://localhost:8080/order/all');
  }

  public changeStatus(id:number):Observable<any>{
    return this.http.get<any>(`http://localhost:8080/order/change/${id}`);
  }

}