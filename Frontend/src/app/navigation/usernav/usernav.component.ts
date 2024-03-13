import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserserveService } from '../../services/user/userserve.service';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrl: './usernav.component.css'
})
export class UsernavComponent {

  constructor(public usernav:Router,public srv:UserserveService){}

  logout() {
    const logoutConfirmed = confirm("Are you sure you want to logout?");
    if (logoutConfirmed) {
      this.srv.authToken=null;
      this.usernav.navigate(['/']);
    }
  }

}
