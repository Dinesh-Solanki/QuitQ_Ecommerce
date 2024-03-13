import { Component } from '@angular/core';
import { Users } from '../../model/users.model';
import { UserserveService } from '../../services/user/userserve.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})

export class CustomerComponent {
  user: Users = new Users();
  constructor(public srv:UserserveService, private router: Router) {}

  login() {
    this.srv.authenticateuser(this.user).subscribe(
      (token: string) => {
          this.srv.setAuthToken(token);
          this.srv.setUserEmail(this.user.Email);
          alert('Login successful...');
          this.router.navigate(['/userhome']);
      },
      (error) => {
        alert('Login failed. Please Enter valid id and password.');
      }
    );
  }
}
