import { Component } from '@angular/core';
import { AdminserveService } from '../../../services/admin/adminserve.service';
import { NgForm } from '@angular/forms';
import { RouteConfigLoadEnd, Router } from '@angular/router';

@Component({
  selector: 'app-addorupdate',
  templateUrl: './addorupdate.component.html',
  styleUrl: './addorupdate.component.css'
})
export class AddorupdateComponent {

  constructor(public cat:AdminserveService,public router:Router){}


  resetForm(form?:NgForm)
  {
    if(form!=null)
    {
      form.form.reset();
    }
    else
    {
      this.cat.category={CategoryId:0,CategoryName:''};
    }
  }

  onSubmit(form:NgForm)
  {
    if(this.cat.category.CategoryId==0)
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



  insertRecord(form:NgForm)
  {
    this.cat.addCategory(this.cat.category).subscribe(res=>{
    alert("Category registration successfull");
    this.cat.getCategories();
    this.router.navigate(['/adminmngcategory'])
    },
      err=>{alert("error!!!"+err);});
  }


  updaterecord(form:NgForm)
  {
    this.cat.updateCategory().subscribe(res=>{
    this.cat.getCategories();
    alert("Category Updated...!!!");
    },
      err=>{alert("error!!!"+err);})
  }




}
