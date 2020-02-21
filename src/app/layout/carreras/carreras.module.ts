import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrerasRoutingModule } from './carreras-routing.module';
import { CarrerasComponent } from './carreras.component';
import { PageHeaderModule, SharedPipesModule } from 'src/app/shared';
import { FormsModule, ReactiveFormsModule, FormControl} from '@angular/forms';
import { DataTableModule } from 'angular-6-datatable';
import { NgxMaskModule } from 'ngx-mask';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  imports: [
    CommonModule,
    CarrerasRoutingModule,
    PageHeaderModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    NgxMaskModule.forRoot(),
    NgbTabsetModule,
    SharedPipesModule,
    NgxLoadingModule
  ],
  declarations: [CarrerasComponent ]
})
export class CarrerasModule { }
