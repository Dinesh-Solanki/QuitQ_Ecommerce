import { Component } from '@angular/core';
import { UserserveService } from '../../services/user/userserve.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Order } from '../../model/order.model';
import { Orderitems } from '../../model/orderitems.model';
import { Payments } from '../../model/payments.model';
import { OrderDialogComponentComponent } from '../../orderdialogcomp/order-dialog-component/order-dialog-component.component';
import { Products } from '../../model/products.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  public cartlist : any;

  router: any;
  productDetails: { [productId: number]: Products } = {};
  
  constructor(public auth: UserserveService, public dialog: MatDialog , public rout: Router){}


  ngOnInit(): void {
    this.auth.getUserCart(this.auth.user.UserId)
    .subscribe(res=>{
      this.cartlist = res;
      this.loadProductDetails();
    })

  }


  deleteCart(cartId: number) {
    const confirmDelete = confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      this.auth.deleteCartItem(cartId).subscribe(
        () => {
          alert('Cart Item deleted successfully');
          this.ngOnInit();
          this.rout.navigate(['/cart'])
        },
        (error) => {
          alert('Error deleting Cart Item');
        }
      );
    }
  }

  calculateTotalPrice(): number {
    return this.cartlist.reduce((total, item) => total + item.Amount, 0);
  }

  
  placeOrder(): void {
    const dialogRef = this.dialog.open(OrderDialogComponentComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const order = new Order();
        order.UserId = this.auth.user.UserId;
        order.ShippingAddress = result.shippingAddress;
        order.Status = 'Pending';
        order.Amount = this.calculateTotalPrice();
        this.auth.placeOrder(order).subscribe(
          (res) => {
            this.addOrderItems(res.OrderId);
          },
          err => {
            alert('Error placing order');
          }
        );
      }
    });
  }

  addOrderItems(orderId: number): void {
    const orderItems: Orderitems[] = this.cartlist.map(item => ({
      OrderId: orderId,
      ProductId: item.ProductId,
      Quantity: item.Quantity,
      ItemTotalPrice: item.Amount,
    }));
  
    console.log("Order Items Data:", JSON.stringify(orderItems));
  
    
    orderItems.forEach(orderItem => {
      this.auth.addOrderItems(orderItem).subscribe(
        (res) => {
          console.log('Order Item Response:', res);
        },
        err => {
          console.log(orderItem);
          alert('Error adding order item'+orderItem);
        }
      );
    });
    this.addPayment(orderId);
  }

  addPayment(orderId: number): void {
    const payment = new Payments();
    payment.OrderId = orderId;
    payment.PaymentDate = new Date();
    payment.PaymentStatus = 'Pending'; 

    this.auth.addPayment(payment).subscribe(
      (res) => {
        alert('Order placed successfully');

        this.auth.deleteCartByUserId(this.auth.user.UserId).subscribe(
          () => {
            console.log('Cart data deleted successfully');
            this.rout.navigate(['/order'])
          },
          (err) => {
            console.error('Error deleting cart data');
          }
        );
        this.ngOnInit(); 
        
      },
      err => {
        alert('Error adding payment');
      }
    );
  }

  loadProductDetails(): void {
    this.cartlist.forEach(item => {
      this.auth.getProductById(item.ProductId).subscribe(
        product => {
          this.productDetails[item.ProductId] = product;
        },
        error => console.error('Error fetching product details:', error)
      );
    });
  }

  getProductById(productId: number): Products {
    return this.productDetails[productId];
  }
}
