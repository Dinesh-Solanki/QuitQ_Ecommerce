import { Component } from '@angular/core';
import { UserserveService } from '../../services/user/userserve.service';
import { Router } from '@angular/router';
import { Order } from '../../model/order.model';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrl: './view-order.component.css'
})
export class ViewOrderComponent {
  public orderList: Order[];

  constructor(public auth: UserserveService,public router:Router) {}

  ngOnInit(): void {
    this.auth.getOrdersForUser(this.auth.user.UserId)
      .subscribe(res => {
        this.orderList = res;
      });
  }


  cancelOrder(orderId: number): void {
    const confirmCancel = confirm('Are you sure you want to cancel this order?');
    if (confirmCancel) {
      // Call the service method to remove the order by orderId
      this.auth.cancelOrder(orderId).subscribe(
        () => {
          alert('Order canceled successfully');
          this.ngOnInit(); // Refresh the order list
        },
        (error) => {
          alert('Error canceling order');
        }
      );
    }
  }

  viewDetails(orderId: number): void {
    this.auth.setOrderId(orderId);
    this.router.navigate(['/orderitems']);
  }

  isCancellationDisabled(status: string): boolean {
    return status === 'Shipped' || status === 'In Transit' || status === 'Delivered';
  }
}
