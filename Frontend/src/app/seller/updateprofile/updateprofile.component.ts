import { Component } from '@angular/core';
import { Sellers } from '../../model/sellers.model';
import { ManageproductService } from '../../services/seller/manageproduct.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrl: './updateprofile.component.css'
})
export class UpdateprofileComponent {
  newSeller:Sellers=new Sellers();
  
  constructor(public sellupdate:ManageproductService, public router:Router){}

  ngOnInit(){
    this.newSeller=this.sellupdate.seller;
  }

  updateseller()
  {
    this.sellupdate.updateSellerProfile(this.newSeller).subscribe(
      (data) => {
        this.sellupdate.seller = data;
        alert('Updated, Redirecting to login...');
        this.router.navigate(['/sellerlogin']);
      },
      (error) => {
        console.error('Error Updating Seller:', error);
      }
    )
  }



}
