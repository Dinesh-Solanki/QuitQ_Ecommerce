import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../../model/admin.model';
import { Observable } from 'rxjs';
import { Categories } from '../../model/categories.model';
import { Sellers } from '../../model/sellers.model';
import { UsernavComponent } from '../../navigation/usernav/usernav.component';
import { Users } from '../../model/users.model';
import { Orderitems } from '../../model/orderitems.model';
import { Order } from '../../model/order.model';

@Injectable({
  providedIn: 'root'
})
export class AdminserveService {
  readonly authApiUrl = 'http://localhost:5272/api/auth/adminauth';
  readonly catApiUrl = 'http://localhost:5272/api/categories';
  readonly sellerapiurl = 'http://localhost:5272/api/sellers';
  readonly userapiurl = 'http://localhost:5272/api/users';
  readonly oiapiurl = 'http://localhost:5272/api/orderitems';
  readonly orderapiurl = 'http://localhost:5272/api/orders';

  


  category:Categories=new Categories();
  catlist:Categories[];
  sellerlist:Sellers[];
  userlist:Users[];

  authToken: string;
  
  constructor(public objHttp:HttpClient) { }

  public setAuthToken(token: string) {
    this.authToken = token;
  }

  public authenticateadmin(admin:Admin): Observable<string> {
    return this.objHttp.post(this.authApiUrl, admin, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' 
    })
    }

    getCategories() {
      this.objHttp.get(this.catApiUrl).toPromise().then(res=>this.catlist=res as Categories[]);
    }

    addCategory(category: Categories): Observable<Categories> {
      return this.objHttp.post<Categories>(`${this.catApiUrl}`, category);
    }

    deleteCategory(categoryid: number): Observable<void> {
      return this.objHttp.delete<void>(`${this.catApiUrl}/${categoryid}`);
    }

    public updateCategory()
    {
      return this.objHttp.put(this.catApiUrl+'/'+this.category.CategoryId,this.category);
    }

    getallseller()
    {
      this.objHttp.get(this.sellerapiurl).toPromise().then(res=>this.sellerlist=res as Sellers[]);
    }

    getalluser()
    {
      this.objHttp.get(this.userapiurl).toPromise().then(res=>this.userlist=res as Users[]);
    }

    deleteSeller(sellerid: number): Observable<void> 
    {
      return this.objHttp.delete<void>(`${this.sellerapiurl}/${sellerid}`);
    }

    deleteUser(Userid: number): Observable<void> 
    {
      return this.objHttp.delete<void>(`${this.userapiurl}/${Userid}`);
    }

    getallorderitems():Observable<Orderitems[]>
    {
      return this.objHttp.get<Orderitems[]>(`${this.oiapiurl}`);
    }

    getallorders():Observable<Order[]>
    {
      return this.objHttp.get<Order[]>(`${this.orderapiurl}`);
    }



    updateOrderStatus(orderId: number, order: Order): Observable<Order> {
      return this.objHttp.put<Order>(`${this.orderapiurl}/${orderId}`, order);
    }
}
