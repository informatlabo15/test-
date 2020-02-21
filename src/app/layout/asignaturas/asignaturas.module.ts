import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsignaturasRoutingModule } from './asignaturas-routing.module';
import { AsignaturasComponent } from './asignaturas.component';
import { PageHeaderModule, SharedPipesModule } from 'src/app/shared';
import { FormsModule, ReactiveFormsModule, FormControl} from '@angular/forms';
import { DataTableModule } from 'angular-6-datatable';
import { NgxMaskModule } from 'ngx-mask';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  imports: [
    CommonModule,
    AsignaturasRoutingModule,
    PageHeaderModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    NgxMaskModule.forRoot(),
    NgbTabsetModule,
    SharedPipesModule,
    NgxLoadingModule
  ],
  declarations: [AsignaturasComponent ]
})
export class AsignaturasModule { }
