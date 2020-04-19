import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OBNB_ROUTES } from './shared/constants/routing.constants';


const routes: Routes = [
  { path: '',  loadChildren: () => import('./search/search.module').then(m => m.SearchModule)},
  { path: OBNB_ROUTES.REGISTER, loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)},
  { path: OBNB_ROUTES.DASHBOARD, loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
  { path: OBNB_ROUTES.ADMIN, loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: OBNB_ROUTES.USER_LANDING, loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: OBNB_ROUTES.SEARCH, loadChildren: () => import('./search/search.module').then(m => m.SearchModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
