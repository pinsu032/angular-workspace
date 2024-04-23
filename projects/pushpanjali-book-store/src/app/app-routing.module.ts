
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { NotfoundComponent } from './component/notfound/notfound.component';
import { ErrorpageComponent } from './component/errorpage/errorpage.component';
import { ProductComponent } from './component/product/product.component';
import { OrderdetailsComponent } from './component/orderdetails/orderdetails.component';
import { LoginComponent } from './component/login/login.component';
import { UserComponent } from './component/user/user.component';

const routes: Routes = [
  {path:"home", component:HomeComponent},
  //{path:"categories",component:CategoriesComponent , canActivate: [CategoriesGuard]},
  {path:"product",component:ProductComponent},
  {path:"order",component:OrderdetailsComponent},
  {path:"login",component:LoginComponent},
  {path:"user",component:UserComponent},
  {path:"errorpage",component:ErrorpageComponent},
  {path:"", redirectTo:"home",pathMatch:"full"},
  {path:"**",component:NotfoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
