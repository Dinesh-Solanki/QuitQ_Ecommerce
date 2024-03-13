import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-order-dialog-component',
  templateUrl: './order-dialog-component.component.html',
  styleUrl: './order-dialog-component.component.css'
})
export class OrderDialogComponentComponent {

  orderForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<OrderDialogComponentComponent>, private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      shippingAddress: ['', Validators.required],
      paymentType: ['CashOnDelivery', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
