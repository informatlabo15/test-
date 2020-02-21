import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EvaluacionesComponent } from './evaluaciones.component';

const routes: Routes = [
    {
        path: '', component: EvaluacionesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EvaluacionesRoutingModule {
}
