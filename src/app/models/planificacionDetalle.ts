import { PlanificacionEstudiante } from './planificacionEstudiante';

export class PlanificacionDetalle {
    id: number;
    asignaturaID: number;
    grupoID: number;
    horarioID: number;
    docenteID: number;
    salonID: number;
    casoEspecial: boolean;
    tutoria: boolean;
    planificacionID: number;
    planificacionEstudiante: PlanificacionEstudiante[];
}
