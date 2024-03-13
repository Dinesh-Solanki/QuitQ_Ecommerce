import { Component } from '@angular/core';
import { ManagecategoryComponent } from '../managecategory/managecategory.component';
import { Orderitems } from '../../model/orderitems.model';
import { AdminserveService } from '../../services/admin/adminserve.service';

@Component({
  selector: 'app-totalsale',
  templateUrl: './totalsale.component.html',
  styleUrl: './totalsale.component.css'
})
export class TotalsaleComponent {
  orderItems: Orderitems[];

  constructor(private adminserve:AdminserveService) { }

  ngOnInit(): void {
    this.adminserve.getallorderitems().subscribe(
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
