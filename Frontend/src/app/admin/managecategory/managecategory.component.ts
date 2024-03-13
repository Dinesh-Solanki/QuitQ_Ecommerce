import { Component } from '@angular/core';
import { AdminserveService } from '../../services/admin/adminserve.service';

@Component({
  selector: 'app-managecategory',
  templateUrl: './managecategory.component.html',
  styleUrl: './managecategory.component.css'
})
export class ManagecategoryComponent {

  constructor(public srv:AdminserveService){}

  ngOnInit():void
  {
    this.srv.getCategories();
  }

  fillform(category)
  {
    this.srv.category=Object.assign({},category);
  }

  deleterecord(cid)
  {
    if(confirm('Are you sure to delete?'))
    {
      this.srv.deleteCategory(cid).subscribe(res=>
        {
          alert("Deleted !!!");
          this.srv.getCategories();
        },
        err=>{alert("error !!!"+err);}
        );
    }
  }

}
