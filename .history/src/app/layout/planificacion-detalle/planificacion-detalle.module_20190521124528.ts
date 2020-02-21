import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlanificacionesDetalleRoutingModule } from './planificacion-detalle-routing.module';
import { PlanificacionDetalleComponent } from './planificacion-detalle.component';
import { PageHeaderModule } from '../../shared';
import { DataTableModule } from 'angular-6-datatable';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
    imports: [CommonModule, PlanificacionesDetalleRoutingModule,
    PageHeaderModule, FormsModule, ReactiveFormsModule, DataTableModule,  NgxLoadingModule],
    declarations: [PlanificacionDetalleComponent]
})
export class PlanificacionDetalleModule {}
