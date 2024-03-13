import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sellers } from '../../model/sellers.model';
import { Observable } from 'rxjs';
import { Users } from '../../model/users.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  
  private sellerUrl = 'http://localhost:5272/api/sellers';
  private userurl = 'http://localhost:5272/api/users';

  constructor(private httpClient: HttpClient) {}

  registerSeller(seller: Sellers): Observable<any> {
    return this.httpClient.post(`${this.sellerUrl}`, seller);
  }

  registerUser(user:Users): Observable<any> {
    return this.httpClient.post(`${this.userurl}`, user);
  }
}
