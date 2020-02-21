import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './report.component';
import { ActaNotasComponent } from './acta-notas/acta-notas.component';

const routes: Routes = [
  {
    path: '', component: ReportComponent,
    children: [
       {
        path: 'acta-notas', component: ActaNotasComponent
       }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
