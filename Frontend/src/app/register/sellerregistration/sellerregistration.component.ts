import { Component } from '@angular/core';
import { Sellers } from '../../model/sellers.model';
import { RegisterService } from '../../services/registration/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sellerregistration',
  templateUrl: './sellerregistration.component.html',
  styleUrl: './sellerregistration.component.css'
})
export class SellerregistrationComponent {
  newSeller: Sellers = new Sellers(); 
  confirmPassword:string;
  isFormValid: boolean = false;

  constructor(private sellerService: RegisterService, private router: Router) {}

  registerSeller() {
      this.sellerService.registerSeller(this.newSeller).subscribe(
        (response) => {
          alert("Registered... Redirecting you to login");
          this.router.navigate(['/sellerlogin']);
        },
        (error) => {
          alert("Email Already Registered");
        }
      );
  }
}
