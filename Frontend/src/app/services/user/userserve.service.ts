import { Injectable } from '@angular/core';
import { Users } from '../../model/users.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Products } from '../../model/products.model';
import { Categories } from '../../model/categories.model';
import { Cart } from '../../model/cart.model';
import { Orderitems } from '../../model/orderitems.model';
import { Order } from '../../model/order.model';
import { Payments } from '../../model/payments.model';

@Injectable({
  providedIn: 'root'
})
export class UserserveService {
  readonly authApiUrl = 'http://localhost:5272/api/auth/userauth';
  readonly userapiurl='http://localhost:5272/api/users';
  readonly prodapiurl='http://localhost:5272/api/products';
  readonly catApiUrl = 'http://localhost:5272/api/categories';
  readonly cartApiUrl = 'http://localhost:5272/api/carts';

  readonly orderApiUrl = 'http://localhost:5272/api/orders';
  readonly orderItemsApiUrl = 'http://localhost:5272/api/orderitems';
  readonly paymentApiUrl = 'http://localhost:5272/api/payments'

  authToken: string;
  //userid: number;
  useremail:string;
  user:Users;
  prodList : Products[];
  cartdata: Cart;
  cartlist: Cart[];
  orderId : number;

  constructor(private objHttp:HttpClient) { }

  public setUserEmail(id: string) {
    this.useremail = id;
  }

  public getUserEmail(): string {
    return this.useremail;
  }
  
  public setAuthToken(token: string) {
    this.authToken = token;
  }

  public authenticateuser(user:Users): Observable<string> {
    return this.objHttp.post(this.authApiUrl, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' 
    })
    }

    public getbyemailpwd(email:string,phone:string):Observable<Users>
    {
      return this.objHttp.get<Users>(this.userapiurl+'/GetByEmailPwd/'+email+'/'+phone);
    }

    public getbyemail(email:string):Observable<Users>
    {
      return this.objHttp.get<Users>(this.userapiurl+'/GetByEmail/'+email);
    }

    public resetpassword(userreset:Users)
    {
      return this.objHttp.put(this.userapiurl+'/'+userreset.UserId,userreset);
    }




    public getProducts() {
      this.objHttp.get(this.prodapiurl+'/all').toPromise().then(res=>this.prodList=res as Products[]);
    }

    public getCategories(): Observable<Categories[]> {
      return this.objHttp.get<Categories[]>(`${this.catApiUrl}`);
    }

    public addToCart(cart:Cart): Observable<Cart> {
      return this.objHttp.post<Cart>(`${this.cartApiUrl}`, cart);
    }   

    public getProductsForCategory(categoryId: number) {
       this.objHttp.get(this.prodapiurl +'/getforcategory/'+ categoryId).toPromise().then(res=>this.prodList=res as Products[]);
    }






    public getUserCart(UserId: number): Observable<Cart[]> {
      return this.objHttp.get<Cart[]>(`${this.cartApiUrl}/GetByCartId/${UserId}`);
    }

    public deleteCartItem(cartId: number): Observable<void> {
      return this.objHttp.delete<void>(`${this.cartApiUrl}/${cartId}`);
    }

    public placeOrder(order: Order): Observable<Order> {
      return this.objHttp.post<Order>(`${this.orderApiUrl}`, order);
    }

    public addOrderItems(orderItems: Orderitems): Observable<Orderitems> {
      return this.objHttp.post<Orderitems>(`${this.orderItemsApiUrl}`, orderItems);
    }

    public addPayment(payment: Payments): Observable<Payments> {
      return this.objHttp.post<Payments>(`${this.paymentApiUrl}`, payment);
    }

    public deleteCartByUserId(userId: number): Observable<void> {
      const url = `${this.cartApiUrl}/DeleteByUserId/${userId}`;
      return this.objHttp.delete<void>(url);
    }

    public getOrdersForUser(userId: number): Observable<Order[]> {
      return this.objHttp.get<Order[]>(`${this.orderApiUrl}/GetByUser/${userId}`);
    }

    public getOrderItems(orderId: number): Observable<Orderitems[]> {
      return this.objHttp.get<Orderitems[]>(`${this.orderItemsApiUrl}/GetByOrder/${orderId}`);
    }

    public cancelOrder(orderId: number): Observable<void> {
      return this.objHttp.delete<void>(`${this.orderApiUrl}/${orderId}`);
    }

    public setOrderId(orderId: number): void {
      this.orderId = orderId;
    }
  
    public getOrderId(): number {
      return this.orderId;
    }

    public removeOrderItem(orderItemId: number): Observable<void> {
      return this.objHttp.delete<void>(`${this.orderItemsApiUrl}/${orderItemId}`);
    }

    
    public getProductById(productId: number): Observable<Products> {
      return this.objHttp.get<Products>(`${this.prodapiurl}/${productId}`);
    }


}
