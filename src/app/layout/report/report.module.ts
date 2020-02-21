import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { HeaderReportComponent } from './header-report/header-report.component';
import { ActaNotasComponent } from './acta-notas/acta-notas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from 'angular-6-datatable';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [ ReportComponent, HeaderReportComponent, ActaNotasComponent ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    NgxLoadingModule
  ]
})
export class ReportModule { }
