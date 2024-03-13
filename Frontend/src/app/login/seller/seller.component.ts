import { Component } from '@angular/core';
import { ManageproductService } from '../../services/seller/manageproduct.service';
import { Router, RouterLink } from '@angular/router';
import { Sellers } from '../../model/sellers.model';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrl: './seller.component.css'
})
export class SellerComponent {
  seller: Sellers = new Sellers();
  constructor(public srv: ManageproductService, private router: Router) {}

  login() {
    this.srv.authenticateSeller(this.seller).subscribe(
      (token: string) => {
          this.srv.setAuthToken(token);
          this.srv.setSelleremail(this.seller.SellerEmail);
          alert('Login successful...');
          this.router.navigate(['/sellerhome']);
      },
      (error) => {
        alert('Login failed. Please Enter valid id and password.');
      }
    );
  }
}
