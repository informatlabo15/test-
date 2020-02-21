import { Asignatura } from './asignatura';
import { Grupo } from './grupo';

export class CarreraToList {
    id: number;
    nombre: string;
    codigo: string;
    facultadID: number;
    decano: number;
    estado: boolean;
    grupos: Grupo[];
    //  asignatura: Asignatura[];
  }
