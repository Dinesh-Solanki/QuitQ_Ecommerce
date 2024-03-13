import { Component } from '@angular/core';
import { ManageproductService } from '../../services/seller/manageproduct.service';
import { Sellers } from '../../model/sellers.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sellerhome',
  templateUrl: './sellerhome.component.html',
  styleUrl: './sellerhome.component.css'
})
export class SellerhomeComponent {
  showUpdateForm: boolean = false;
  updateProfileForm: FormGroup;
  
  constructor(private fb: FormBuilder,public sellhome:ManageproductService){}

  ngOnInit(): void {
    this.sellhome.sellerdetail(this.sellhome.selleremail).subscribe(
      (data) => {
        this.sellhome.seller = data;
      },
      (error) => {
        console.error('Error fetching seller details:', error);
      }
    );
  }

  
}
