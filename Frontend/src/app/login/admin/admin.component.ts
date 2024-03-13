import { Component } from '@angular/core';
import { Admin } from '../../model/admin.model';
import { AdminserveService } from '../../services/admin/adminserve.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  admin:Admin= new Admin();

  constructor(public srv:AdminserveService, public router:Router){}

  login() {
    this.srv.authenticateadmin(this.admin).subscribe(
      (token: string) => {
          this.srv.setAuthToken(token);
          alert('Login successful...');
          this.router.navigate(['/adminmngcategory']);
      },
      (error) => {
        alert('Login failed. Please Enter valid Email and password.');
      }
    );
  }
}
