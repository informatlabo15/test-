import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EstudiantesRoutingModule } from './estudiantes-routing.module';
import { EstudiantesComponent } from './estudiantes.component';
import { PageHeaderModule, SharedPipesModule } from './../../shared';
import { DataTableModule } from 'angular-6-datatable';
import {NgxMaskModule} from 'ngx-mask';
import { NgbTabsetModule, NgbAccordionModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
    imports: [
      CommonModule,
      EstudiantesRoutingModule,
      PageHeaderModule,
      FormsModule,
      ReactiveFormsModule,
      DataTableModule,
      NgxMaskModule.forRoot(),
      NgbTabsetModule,
      NgbDatepickerModule,
      NgbAccordionModule,
      SharedPipesModule,
      NgxLoadingModule

    ],
    declarations: [EstudiantesComponent]
})
export class EstudiantesModule {}
