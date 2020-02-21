import { Periodo } from "./Periodo";
import { Carrera } from "./carrera";

export class Grupo {
    id: number;
    activo: boolean;
    nombre: string;
    codigo: string;
    estado: boolean;
    periodoID: number;
    carreraID: number;
    periodo: Periodo;
    carrera: Carrera;
}
