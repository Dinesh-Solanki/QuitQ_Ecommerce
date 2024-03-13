import { Component } from '@angular/core';
import { Sellers } from '../../../model/sellers.model';
import { ManageproductService } from '../../../services/seller/manageproduct.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sellerforget',
  templateUrl: './sellerforget.component.html',
  styleUrl: './sellerforget.component.css'
})
export class SellerforgetComponent {
  findseller:Sellers=new Sellers();
  confirmpassword:string;

  constructor(public serve:ManageproductService, private router:Router){}

  find()
  {
    this.serve.getbyemailpwd(this.findseller.SellerEmail,this.findseller.SellerPhoneNumber).subscribe(
      (data) => {
        this.findseller= data;
        alert(this.findseller.SellerId + this.findseller.SellerPassword );
      },
      (error) => {
        alert('Enter valid Details');
      }
    );
  }

  resetpwd()
  {
      this.serve.resetpassword(this.findseller).subscribe(res=>{
      alert("Password Updated...!!!");
      this.router.navigate(['/sellerlogin']);
      },
        err=>{alert("error!!!"+err);});
  }

}
