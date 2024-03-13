import { Component } from '@angular/core';
import { AdminserveService } from '../../services/admin/adminserve.service';

@Component({
  selector: 'app-manageusers',
  templateUrl: './manageusers.component.html',
  styleUrl: './manageusers.component.css'
})
export class ManageusersComponent {

  constructor(public srv:AdminserveService){}

  ngOnInit(){
    this.srv.getalluser();
  }

  deleteUser(userid: number) {
    const confirmDelete = confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      this.srv.deleteUser(userid).subscribe(
        () => {
          alert('User deleted successfully');
          this.ngOnInit();
        },
        (error) => {
          alert('Error deleting product');
        }
      );
    }
  }

}
