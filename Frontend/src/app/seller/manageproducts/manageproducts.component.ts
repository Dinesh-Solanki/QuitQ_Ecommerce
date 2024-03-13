import { Component } from '@angular/core';
import { ManageproductService } from '../../services/seller/manageproduct.service';
import { SellerComponent } from '../../login/seller/seller.component';
import { Products } from '../../model/products.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manageproducts',
  templateUrl: './manageproducts.component.html',
  styleUrl: './manageproducts.component.css'
})
export class ManageproductsComponent {

  constructor(public srv: ManageproductService,public router:Router) {}

  ngOnInit(): void {
    this.srv.ProductsListForSeller(this.srv.seller.SellerId).subscribe(
      (data) => {
        this.srv.prodlist=data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  fillform(product:Products)
  {
    this.srv.proddata=Object.assign({},product);
    // alert(product.ProductId);
    this.router.navigate(["/addnewproduct"]);
  }


  deleteProduct(productId: number) {
    const confirmDelete = confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      this.srv.deleteProduct(productId).subscribe(
        () => {
          alert('Product deleted successfully');
          this.ngOnInit();
        },
        (error) => {
          alert('Error deleting product');
        }
      );
    }
  }


}
