import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlanificacionDetalleRoutingModule } from './planificacion-detalle-routing.module';
import { PlanificacionDetalleComponent } from './planificacion-detalle.component';
import { PageHeaderModule } from '../../shared';
import { DataTableModule } from 'angular-6-datatable';
import { NgxLoadingModule } from 'ngx-loading';
import { NgbTabsetModule, NgbAccordionModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    PlanificacionDetalleRoutingModule,
    PageHeaderModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    NgxLoadingModule,
    NgbTabsetModule,
    NgbAccordionModule
  ],
  declarations: [PlanificacionDetalleComponent]
})
export class PlanificacionDetalleModule {}
