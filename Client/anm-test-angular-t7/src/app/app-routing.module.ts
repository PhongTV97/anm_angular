import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { CanActivateGuard } from './guard/can-activate.guard';
import { ROUTE_LOGIN, ROUTE_HOME } from './configs/routes.config'

const routes: Routes = [
  { path: ROUTE_LOGIN, component: LoginComponent },
  { path: ROUTE_HOME, component: HomeComponent, canActivate: [CanActivateGuard] },
  { path: '', redirectTo: `/${ROUTE_HOME}`, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
