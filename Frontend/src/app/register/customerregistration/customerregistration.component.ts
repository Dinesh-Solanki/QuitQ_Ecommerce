import { Component } from '@angular/core';
import { Users } from '../../model/users.model';
import { RegisterService } from '../../services/registration/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customerregistration',
  templateUrl: './customerregistration.component.html',
  styleUrl: './customerregistration.component.css'
})
export class CustomerregistrationComponent {
  newUser: Users = new Users(); 
  confirmPassword:string;
  isFormValid: boolean = false;

  constructor(private userservice: RegisterService, private router: Router) {}

  registerUser() {
      this.userservice.registerUser(this.newUser).subscribe(
        (response) => {
          alert("Registered... Redirecting you to login");
          this.router.navigate(['/customerlogin']);
        },
        (error) => {
          alert("Failed to register"+error);
        }
      );
  }
}
