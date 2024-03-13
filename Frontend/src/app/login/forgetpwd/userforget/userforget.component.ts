import { Component } from '@angular/core';
import { UserserveService } from '../../../services/user/userserve.service';
import { Router } from '@angular/router';
import { Users } from '../../../model/users.model';

@Component({
  selector: 'app-userforget',
  templateUrl: './userforget.component.html',
  styleUrl: './userforget.component.css'
})
export class UserforgetComponent {
  finduser:Users=new Users();
  confirmpassword:string;

  constructor(public serve:UserserveService, private router:Router){}

  find()
  {
    this.serve.getbyemailpwd(this.finduser.Email,this.finduser.PhoneNumber).subscribe(
      (data) => {
        this.finduser= data;
        alert(this.finduser.UserId + this.finduser.Password );
      },
      (error) => {
        alert('Enter valid Details');
      }
    );
  }

  resetpwd()
  {
      this.serve.resetpassword(this.finduser).subscribe(res=>{
      alert("Password Updated...!!!");
      this.router.navigate(['/customerlogin']);
      },
        err=>{alert("error!!!"+err);});
  }
}
