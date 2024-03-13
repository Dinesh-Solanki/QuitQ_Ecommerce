import { Component } from '@angular/core';
import { AdminserveService } from '../../services/admin/adminserve.service';

@Component({
  selector: 'app-managesellers',
  templateUrl: './managesellers.component.html',
  styleUrl: './managesellers.component.css'
})
export class ManagesellersComponent {

  constructor(public srv:AdminserveService){}

  ngOnInit(){
    this.srv.getallseller();
  }

  deleteSeller(sellerid: number) {
    const confirmDelete = confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      this.srv.deleteSeller(sellerid).subscribe(
        () => {
          alert('Seller deleted successfully');
          this.ngOnInit();
        },
        (error) => {
          alert('Error deleting product');
        }
      );
    }
  }


}
