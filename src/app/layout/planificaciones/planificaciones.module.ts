import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlanificacionesRoutingModule } from './planificaciones-routing.module';
import { PlanificacionesComponent } from './planificaciones.component';
import { PageHeaderModule } from '../../shared';
import { DataTableModule } from 'angular-6-datatable';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  imports: [
    CommonModule,
    PlanificacionesRoutingModule,
    PageHeaderModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    NgxLoadingModule
  ],
  declarations: [PlanificacionesComponent]
})
export class PlanificacionesModule {}
