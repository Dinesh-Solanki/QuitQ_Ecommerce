import { Component } from '@angular/core';
import { ManageproductService } from '../../services/seller/manageproduct.service';
import { NgForm } from '@angular/forms';
import { Products } from '../../model/products.model';
import { Categories } from '../../model/categories.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrl: './add-new-product.component.css'
})
export class AddNewProductComponent {

  constructor(public productService: ManageproductService, public router:Router){}

  categories: Categories[];


  ngOnInit(): void {
    this.productService.proddata.SellerId=this.productService.seller.SellerId;
    this.productService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onSubmit(form:NgForm)
  {
    if(this.productService.proddata.ProductId==0)
    {
      this.insertRecord(form);
      this.resetForm();
    }
    else
    {
      this.updaterecord(form);
      this.resetForm();
    }
  }

  resetForm(form?:NgForm)
  {
    if(form!=null)
    {
      form.form.reset();
    }
    else
    {
      this.productService.proddata={ProductId:0,ProductName:'',Price:0,QuantityInStock:null,Description:'',CategoryId:null,SellerId:this.productService.seller.SellerId,ProductUrl:''};
    }
  }



  insertRecord(form:NgForm)
  {
    this.productService.addProduct(this.productService.proddata).subscribe(res=>{
    alert("Product registration successfull");
    this.router.navigate(['/manageproductseller']);
    },
      err=>{alert("error!!!"+err);});
  }

  updaterecord(form:NgForm)
  {
    this.productService.updateproduct().subscribe(res=>{
    alert("Product Updated...!!!");
    this.router.navigate(['/manageproductseller']);
    },
      err=>{alert("error!!!"+err);});
  }
}
