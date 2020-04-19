import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLandingComponent } from './user-landing/user-landing.component';


const routes: Routes = [
  { path: '', component: UserLandingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
