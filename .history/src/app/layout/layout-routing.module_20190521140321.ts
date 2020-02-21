import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'facultades', loadChildren: './facultades/facultades.module#FacultadesModule' },
            { path: 'docentes', loadChildren: './docentes/docentes.module#DocentesModule' },
            { path: 'estudiantes', loadChildren: './estudiantes/estudiantes.module#EstudiantesModule' },
            { path: 'carreras', loadChildren: './carreras/carreras.module#CarrerasModule' },
            { path: 'asignaturas', loadChildren: './asignaturas/asignaturas.module#AsignaturasModule' },
            { path: 'grupos', loadChildren: './grupos/grupos.module#GruposModule' },
            { path: 'salones', loadChildren: './salones/salones.module#SalonesModule' },
            { path: 'horarios', loadChildren: './horarios/horarios.module#HorariosModule' },
            // { path: 'planificaciones', loadChildren: './planificaciones/planificaciones.module#PlanificacionesModule' },
            // {
            //     path: 'planificacion_coordinador',
            //     loadChildren: './planificacion-detalle/planificacion-detalle.module#PlanificacionDetalleModule'
            // },
            { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
