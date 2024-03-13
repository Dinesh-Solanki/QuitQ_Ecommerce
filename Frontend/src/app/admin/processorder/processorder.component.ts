import { Component } from '@angular/core';
import { Order } from '../../model/order.model';
import { AdminserveService } from '../../services/admin/adminserve.service';

@Component({
  selector: 'app-processorder',
  templateUrl: './processorder.component.html',
  styleUrl: './processorder.component.css'
})
export class ProcessorderComponent {
  orders: Order[];

  constructor(private adminserve:AdminserveService) { }

  ngOnInit(): void {
    this.adminserve.getallorders().subscribe(
      data => {
        this.orders = data;
        this.orders.forEach(order => {
          order.showDropdown = false;
          order.selectedStatus = order.Status; // Set default status
        });
        
      },
      error => {
        console.error('Error fetching order items:', error);
      }
    );
  }
  showDropdown(order: Order): void {
    order.showDropdown = !order.showDropdown;
  }

  updateStatus(order: Order): void {
    console.log(`Update status for Order ID ${order.OrderId} to ${order.selectedStatus}`);
    order.Status=order.selectedStatus;
    this.adminserve.updateOrderStatus(order.OrderId, order).subscribe(
      (updatedOrder) => {
        alert('order updated');
      },
      (error) => {
        console.error('Error updating order status:', error);
      }
    );

    order.showDropdown = false; // Hide the dropdown after updating
  }
}
