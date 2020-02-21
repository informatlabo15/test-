import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalonesComponent } from './salones.component';

const routes: Routes = [
    {
        path: '', component: SalonesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SalonesRoutingModule {
}
