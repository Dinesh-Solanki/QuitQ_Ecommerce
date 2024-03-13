import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './navigation/nav/nav.component';
import { CustomerComponent } from './login/customer/customer.component';
import { SellerComponent } from './login/seller/seller.component';
import { AdminComponent } from './login/admin/admin.component';
import { CustomerregistrationComponent } from './register/customerregistration/customerregistration.component';
import { SellerregistrationComponent } from './register/sellerregistration/sellerregistration.component';
import { HomeComponent } from './miscellenous/home/home.component';
import { SellerhomeComponent } from './seller/sellerhome/sellerhome.component';
import { AboutComponent } from './miscellenous/about/about.component';
import { ManageproductsComponent } from './seller/manageproducts/manageproducts.component';
import { AddNewProductComponent } from './seller/add-new-product/add-new-product.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ManagecategoryComponent } from './admin/managecategory/managecategory.component';
import { ManagesellersComponent } from './admin/managesellers/managesellers.component';
import { ManageusersComponent } from './admin/manageusers/manageusers.component';
import { UserforgetComponent } from './login/forgetpwd/userforget/userforget.component';
import { SellerforgetComponent } from './login/forgetpwd/sellerforget/sellerforget.component';
import { UserhomeComponent } from './user/userhome/userhome.component';
import { CartComponent } from './user/cart/cart.component';
import { ViewOrderComponent } from './orderdialogcomp/view-order/view-order.component';
import { OrderItemsComponent } from './orderdialogcomp/order-items/order-items.component';
import { SaleslistComponent } from './seller/saleslist/saleslist.component';
import { TotalsaleComponent } from './admin/totalsale/totalsale.component';
import { ProcessorderComponent } from './admin/processorder/processorder.component';
import { UpdateprofileComponent } from './seller/updateprofile/updateprofile.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"about",component:AboutComponent},
  {path:"customerlogin",component:CustomerComponent},
  {path:"sellerlogin",component:SellerComponent},
  {path:"adminlogin",component:AdminComponent},
  {path:"customerregister",component:CustomerregistrationComponent},
  {path:"sellerregister",component:SellerregistrationComponent},

  {path:"sellerhome",component:SellerhomeComponent},
  {path:"manageproductseller",component:ManageproductsComponent},
  {path:"addnewproduct",component:AddNewProductComponent},
  {path:"salesreport",component:SaleslistComponent},
  {path:"updateprofile",component:UpdateprofileComponent},

  {path:"userprofile",component:ProfileComponent},
  {path:"userhome",component:UserhomeComponent},
  {path: "cart" , component:CartComponent},
  {path : "order" , component:ViewOrderComponent},
  {path:"orderitems" , component:OrderItemsComponent},



  {path:"adminmngcategory",component:ManagecategoryComponent},
  {path:"adminmngseller",component:ManagesellersComponent},
  {path:"adminmnguser",component:ManageusersComponent},
  {path:"totalsale",component:TotalsaleComponent},
  {path:"processorder",component:ProcessorderComponent},

  {path:"forgotuserpwd",component:UserforgetComponent},
  {path:"forgotsellerpwd",component:SellerforgetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
