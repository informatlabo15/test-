import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanificacionDetalleComponent } from './planificacion-detalle.component';

const routes: Routes = [
    {
        path: '', component: PlanificacionDetalleComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlanificacionesDetalleRoutingModule {
}
