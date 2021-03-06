import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GruposRoutingModule } from './grupos-routing.module';
import { GruposComponent } from './grupos.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from 'angular-6-datatable';

@NgModule({
    imports: [CommonModule, GruposRoutingModule, PageHeaderModule, FormsModule, ReactiveFormsModule, DataTableModule],
    declarations: [GruposComponent]
})
export class GruposModule {}
