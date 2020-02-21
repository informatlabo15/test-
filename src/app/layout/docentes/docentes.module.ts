import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocentesRoutingModule } from './docentes-routing.module';
import { DocentesComponent } from './docentes.component';
import { PageHeaderModule, SharedPipesModule } from 'src/app/shared';
import { DataTableModule } from 'angular-6-datatable';
import {NgxMaskModule} from 'ngx-mask';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxLoadingModule } from 'ngx-loading';


@NgModule({
    imports: [
      CommonModule,
      DocentesRoutingModule,
      PageHeaderModule,
      FormsModule,
      ReactiveFormsModule,
      DataTableModule,
      NgxMaskModule.forRoot(),
      NgbTabsetModule,
      SharedPipesModule,
      NgxLoadingModule,
      
    ],
    declarations: [DocentesComponent]
})
export class DocentesModule {}
