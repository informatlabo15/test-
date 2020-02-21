import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AsignaturasComponent } from './asignaturas.component';

const routes: Routes = [
    {
        path: '', component: AsignaturasComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export  class AsignaturasRoutingModule {

}
