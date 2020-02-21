import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FacultadesRoutingModule } from './facultades-routing.module';
import { FacultadesComponent } from './facultades.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from 'angular-6-datatable';

@NgModule({
    imports: [CommonModule, FacultadesRoutingModule, PageHeaderModule, FormsModule, ReactiveFormsModule, DataTableModule],
    declarations: [FacultadesComponent]
})
export class FacultadesModule {}
