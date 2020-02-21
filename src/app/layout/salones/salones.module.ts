import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SalonesRoutingModule } from './salones-routing.module';
import { SalonesComponent } from './salones.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from 'angular-6-datatable';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
    imports: [CommonModule, SalonesRoutingModule, PageHeaderModule, FormsModule, ReactiveFormsModule, DataTableModule,  NgxLoadingModule],
    declarations: [SalonesComponent]
})
export class SalonesModule {}
