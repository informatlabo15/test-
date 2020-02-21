import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanificacionEvaluacionComponent } from './planificacion-evaluacion.component';

const routes: Routes = [
    {
        path: '', component: PlanificacionEvaluacionComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlanificacionEvaluacionRoutingModule {
}
