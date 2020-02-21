import { DocenteDocumentos } from './docenteDocumentos';
import { DocenteReferencias } from './docenteReferencias';
import { DocenteEstudios } from './docenteEstudios';

export class Docente {
    id: number;
    codigo: string;
    nombre: string;
    apellido: string;
    identificacion: string;
    fechaNacimiento: Date;
    estadoCivil: string;
    sexo: string;
    edad: number;
    puesto: string;
    foto: any[];
    departamento: string;
    municipio: string;
    direccion: string;
    telefono: string;
    celular: string;
    email: string;
    hijo: boolean;
    nHijo: number;
    estado: boolean;
    facultadID: number;
    userID: number;
    docenteReferencias: DocenteReferencias[];
    docenteDocumentos: DocenteDocumentos[];
    docenteEstudios: DocenteEstudios[];
}
