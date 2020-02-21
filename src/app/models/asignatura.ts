export class Asignatura {
    id: number;
    nombre: string;
    codigo: string;
    prerequisito: boolean;
    asignaturaID: number;
    creditos: number;
    presenciales: number;
    autoestudio: number;
    anio: number;
    area: number;
    cuatrimestre: number;
    turno: number;
    modalidad: number;
    total: number;
    carreraID: number;
    asignaturaRequisito: Asignatura;
}
