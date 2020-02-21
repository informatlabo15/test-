import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { PageHeaderModule, SharedPipesModule } from 'src/app/shared';
import { DataTableModule } from 'angular-6-datatable';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SignupRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PageHeaderModule,
    NgbTabsetModule,
    DataTableModule,
    SharedPipesModule,
    NgxLoadingModule,
  ],
  declarations: [SignupComponent]
})
export class SignupModule { }
