import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './navigation/nav/nav.component';
import { CustomerComponent } from './login/customer/customer.component';
import { SellerComponent } from './login/seller/seller.component';
import { AdminComponent } from './login/admin/admin.component';
import { CustomerregistrationComponent } from './register/customerregistration/customerregistration.component';
import { SellerregistrationComponent } from './register/sellerregistration/sellerregistration.component';
import { HomeComponent } from './miscellenous/home/home.component';
import { SellerhomeComponent } from './seller/sellerhome/sellerhome.component';
import { SellernavComponent } from './navigation/sellernav/sellernav.component';
import { AboutComponent } from './miscellenous/about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { ManageproductsComponent } from './seller/manageproducts/manageproducts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddNewProductComponent } from './seller/add-new-product/add-new-product.component';
import { UsernavComponent } from './navigation/usernav/usernav.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ManagecategoryComponent } from './admin/managecategory/managecategory.component';
import { AdminnavComponent } from './navigation/adminnav/adminnav.component';
import { AddorupdateComponent } from './admin/category/addorupdate/addorupdate.component';
import { ManageusersComponent } from './admin/manageusers/manageusers.component';
import { ManagesellersComponent } from './admin/managesellers/managesellers.component';
import { UserforgetComponent } from './login/forgetpwd/userforget/userforget.component';
import { SellerforgetComponent } from './login/forgetpwd/sellerforget/sellerforget.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UserhomeComponent } from './user/userhome/userhome.component';
import { CartComponent } from './user/cart/cart.component';
import { OrderDialogComponentComponent } from './orderdialogcomp/order-dialog-component/order-dialog-component.component';
import { OrderItemsComponent } from './orderdialogcomp/order-items/order-items.component';
import { ViewOrderComponent } from './orderdialogcomp/view-order/view-order.component';
import { SaleslistComponent } from './seller/saleslist/saleslist.component';
import { TotalsaleComponent } from './admin/totalsale/totalsale.component';
import { ProcessorderComponent } from './admin/processorder/processorder.component';
import { UpdateprofileComponent } from './seller/updateprofile/updateprofile.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CustomerComponent,
    SellerComponent,
    AdminComponent,
    CustomerregistrationComponent,
    SellerregistrationComponent,
    HomeComponent,
    SellerhomeComponent,
    SellernavComponent,
    AboutComponent,
    ManageproductsComponent,
    AddNewProductComponent,
    UsernavComponent,
    ProfileComponent,
    ManagecategoryComponent,
    AdminnavComponent,
    AddorupdateComponent,
    ManageusersComponent,
    ManagesellersComponent,
    UserforgetComponent,
    SellerforgetComponent,
    UserhomeComponent,
    CartComponent,
    OrderDialogComponentComponent,
    OrderItemsComponent,
    ViewOrderComponent,
    SaleslistComponent,
    TotalsaleComponent,
    ProcessorderComponent,
    UpdateprofileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
