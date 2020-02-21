import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlanificacionEvaluacionRoutingModule } from './planificacion-evaluacion-routing.module';
import { PlanificacionEvaluacionComponent } from './planificacion-evaluacion.component';
import { PageHeaderModule } from '../../shared';
import { DataTableModule } from 'angular-6-datatable';
import { NgxLoadingModule } from 'ngx-loading';
import { NgbTabsetModule, NgbAccordionModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    PlanificacionEvaluacionRoutingModule,
    PageHeaderModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    NgxLoadingModule,
    NgbTabsetModule,
    NgbAccordionModule
  ],
  declarations: [PlanificacionEvaluacionComponent]
})
export class PlanificacionEvaluacionModule {}
