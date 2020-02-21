import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthGuard } from '../shared';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
    {  path: '', component: LoginComponent },
    {  path: 'cambio-password', component: ChangePasswordComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule {}
