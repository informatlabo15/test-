import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacultadesComponent } from './facultades.component';

const routes: Routes = [
    {
        path: '', component: FacultadesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FacultadesRoutingModule {
}
