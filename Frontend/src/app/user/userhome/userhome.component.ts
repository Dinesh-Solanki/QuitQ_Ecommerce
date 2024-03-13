import { Component } from '@angular/core';
import { UserserveService } from '../../services/user/userserve.service';
import { Categories } from '../../model/categories.model';
import { Products } from '../../model/products.model';
import { Cart } from '../../model/cart.model';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrl: './userhome.component.css'
})
export class UserhomeComponent {
  quantity:number=1;
  public productList : any;
  public categoriesList : Categories[] = [];
  public selectedCategory : number;

  constructor(public userprofile:UserserveService){}

  ngOnInit(): void {
    this.userprofile.getbyemail(this.userprofile.useremail).subscribe(
      (data) => {
        this.userprofile.user=data;
      },
      (error) => {
        console.error('Error fetching seller details:', error);
      }
    );

    this.loadCategories();
    this.userprofile.getProducts();
  }

  loadCategories() {
    this.userprofile.getCategories()
    .subscribe(res => {
      this.categoriesList = res;
    });
  }

  addToCart(productid: number, ProductName: string, productprice: number,quantity:any) {
    const addnew: Cart = {
      CartId:0,
      UserId: this.userprofile.user.UserId,
      ProductId: productid,
      Quantity: quantity,
      Amount: productprice
    };
  
    console.log(addnew);
    this.userprofile.addToCart(addnew).subscribe(
      () => {
        console.log(this.userprofile.cartdata);
        alert(`${ProductName} added to cart successfully`);
      },
      (error) => {
        alert(`Failed to add ${ProductName} to cart: ${error.message}`);
      }
    );
  }
  

  filter(category: number){
    this.userprofile.getProductsForCategory(category);
  }

}
