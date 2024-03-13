import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ManageproductService } from '../../services/seller/manageproduct.service';

@Component({
  selector: 'app-sellernav',
  templateUrl: './sellernav.component.html',
  styleUrl: './sellernav.component.css'
})
export class SellernavComponent {

  constructor(public selnav:Router,public srv:ManageproductService){}
  
  logout() {
    const logoutConfirmed = confirm("Are you sure you want to logout?");
    if (logoutConfirmed) {
      this.srv.authToken=null;
      this.selnav.navigate(['/']);
    }
  }

}
