import { Injectable } from '@angular/core';
import { Products } from '../../model/products.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Sellers } from '../../model/sellers.model';
import { Observable, catchError, throwError } from 'rxjs';
import { Categories } from '../../model/categories.model';
import { Orderitems } from '../../model/orderitems.model';


@Injectable({
  providedIn: 'root'
})
export class ManageproductService {
  readonly prodApiUrl = 'http://localhost:5272/api/products';
  readonly catApiUrl = 'http://localhost:5272/api/categories';
  readonly authApiUrl = 'http://localhost:5272/api/auth/sellerauth';
  readonly sellerapiurl='http://localhost:5272/api/sellers';
  readonly oiapiurl='http://localhost:5272/api/orderitems/whereseller'

  prodlist: Products[];
  proddata: Products = new Products();
  selleremail: string;
  authToken: string;
  seller:Sellers;

    constructor(private objHttp: HttpClient) {}

    public setSelleremail(id: string) {
      this.selleremail = id;
    }

    public getSellerId(): string {
      return this.selleremail;
    }

    public setAuthToken(token: string) {
      this.authToken = token;
    }

    public authenticateSeller(seller: Sellers): Observable<string> {
      return this.objHttp.post(this.authApiUrl, seller, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' 
      })
    }
    
    public sellerdetail(email:string):Observable<Sellers>
    {
      return this.objHttp.get<Sellers>(this.sellerapiurl+'/getbyemail/'+email);
    }
    
    public ProductsListForSeller(id: number): Observable<Products[]> {
      const headers = new HttpHeaders({ Authorization: `Bearer ${this.authToken}` }); 
      return this.objHttp.get<Products[]>(`${this.prodApiUrl}/getforseller/${id}`, { headers });
    }

    getCategories(): Observable<Categories[]> {
      return this.objHttp.get<Categories[]>(`${this.catApiUrl}`);
    }

    addProduct(product: Products): Observable<Products> {
      return this.objHttp.post<Products>(`${this.prodApiUrl}`, product);
    }
    
    deleteProduct(productId: number): Observable<void> {
      return this.objHttp.delete<void>(`${this.prodApiUrl}/${productId}`);
    }

    public updateproduct()
    {
      return this.objHttp.put(this.prodApiUrl+'/'+this.proddata.ProductId,this.proddata);
    }

    public getbyemailpwd(email:string,phone:string):Observable<Sellers>
    {
      return this.objHttp.get<Sellers>(this.sellerapiurl+'/GetByEmailPwd/'+email+'/'+phone);
    }

    public resetpassword(sellerreset:Sellers)
    {
      return this.objHttp.put(this.sellerapiurl+'/'+sellerreset.SellerId,sellerreset);
    }


    public getOrderItemsForSeller(sellerId: number): Observable<Orderitems[]> {
      return this.objHttp.get<Orderitems[]>(`${this.oiapiurl}/${sellerId}`);
    }

    public updateSellerProfile(updatedSeller: Sellers): Observable<Sellers> {
      return this.objHttp.put<Sellers>(`${this.sellerapiurl}/${updatedSeller.SellerId}`, updatedSeller);
    }
}
