import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EvaluacionesRoutingModule } from './evaluaciones-routing.module';
import { EvaluacionesComponent } from './evaluaciones.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from 'angular-6-datatable';

@NgModule({
  imports: [CommonModule, EvaluacionesRoutingModule, PageHeaderModule, FormsModule, ReactiveFormsModule, DataTableModule],
  declarations: [EvaluacionesComponent]
})
export class EvaluacionesModule {}
