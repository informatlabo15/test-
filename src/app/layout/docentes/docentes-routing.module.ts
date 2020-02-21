import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocentesComponent } from './docentes.component';

const routes: Routes = [
    {
        path: '', component: DocentesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DocentesRoutingModule {

}
