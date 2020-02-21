import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HorariosRoutingModule } from './horarios-routing.module';
import { HorariosComponent } from './horarios.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from 'angular-6-datatable';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
    imports: [CommonModule, HorariosRoutingModule, PageHeaderModule, FormsModule, ReactiveFormsModule, DataTableModule,  NgxLoadingModule],
    declarations: [HorariosComponent]
})
export class HorariosModule {}
