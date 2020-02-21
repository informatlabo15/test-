import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { PageHeaderModule } from '../shared';
import {  NgxLoadingModule  }   from 'ngx-loading';
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        LoginRoutingModule,
        FormsModule,
        PageHeaderModule,
        NgxLoadingModule
    ],

    declarations: [LoginComponent, ChangePasswordComponent]

})
export class LoginModule {}
