import { Component } from '@angular/core';
import { AdminserveService } from '../../services/admin/adminserve.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrl: './adminnav.component.css'
})
export class AdminnavComponent {

  constructor(public adminnav:Router,public srv:AdminserveService){}

  logout() {
    const logoutConfirmed = confirm("Are you sure you want to logout?");
    if (logoutConfirmed) {
      this.srv.authToken=null;
      this.adminnav.navigate(['/']);
    }
  }
}
