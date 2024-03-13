import { Component } from '@angular/core';
import { Orderitems } from '../../model/orderitems.model';
import { Products } from '../../model/products.model';
import { ActivatedRoute } from '@angular/router';
import { UserserveService } from '../../services/user/userserve.service';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrl: './order-items.component.css'
})
export class OrderItemsComponent {

  orderItems: Orderitems[] = [];
  productDetails: { [productId: number]: Products } = {};

  constructor(
    private route: ActivatedRoute,
    private userService: UserserveService
  ) {}

  ngOnInit(): void {
    const orderId = this.userService.getOrderId();
    this.userService.getOrderItems(orderId).subscribe(
      data => {
        this.orderItems = data;
        this.loadProductDetails();
      },
      error => console.error('Error fetching order items:', error)
    );
  }

  loadProductDetails(): void {
    this.orderItems.forEach(item => {
      this.userService.getProductById(item.ProductId).subscribe(
        product => {
          this.productDetails[item.ProductId] = product;
        },
        error => console.error('Error fetching product details:', error)
      );
    });
  }

  removeOrderItem(orderItemId: number): void {
    const confirmRemove = confirm('Are you sure you want to remove this item?');
    if (confirmRemove) {
      this.userService.removeOrderItem(orderItemId).subscribe(
        () => {
          alert('Order item removed successfully');
          this.ngOnInit();
        },
        (error) => {
          alert('Error removing order item');
        }
      );
    }
  }

  getProductById(productId: number): Products {
    return this.productDetails[productId];
  }
}
