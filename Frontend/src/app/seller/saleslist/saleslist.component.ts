import { Component } from '@angular/core';
import { Orderitems } from '../../model/orderitems.model';
import { ManageproductService } from '../../services/seller/manageproduct.service';

@Component({
  selector: 'app-saleslist',
  templateUrl: './saleslist.component.html',
  styleUrl: './saleslist.component.css'
})
export class SaleslistComponent {
  orderItems: Orderitems[];

  constructor(private manageProductService: ManageproductService) { }

  ngOnInit(): void {
    this.manageProductService.getOrderItemsForSeller(this.manageProductService.seller.SellerId).subscribe(
      data => {
        this.orderItems = data;
      },
      error => {
        console.error('Error fetching order items:', error);
      }
    );
  }

  calculateTotalRevenue(): number {
    return this.orderItems.reduce((total, item) => total + item.ItemTotalPrice, 0);
  }
}
