import { GrupoEstudiante } from './grupoEstudiante';
import { Matricula } from './matricula';

export class Estudiante {
        id: number;
        carnet: string;
        nombre: string;
        apellidoPat: string;
        apellidoMat: string;
        fechaNacimiento: Date;
        identificacion: string;
        estadoCivil: string;
        sexo: string;
        edad: number;
        trabaja: boolean;
        lugarTrabajo: string;
        telefonoTrabajo: string;
        religion: string;
        trabajoPastoral: string;
        foto: any[];
        departamento: string;
        municipio: string;
        direccion: string;
        telefono: string;
        celular: string;
        email: string;
        nombreMadre: string;
        viveConMadre: boolean;
        telefonoMadre: string;
        nombrePadre: string;
        viveConPadre: boolean;
        telefonoPadre: string;
        nombreConyuge: string;
        telefonoConyuge: string;
        hijo: boolean;
        nHijo: number;
        partidaNacimientoOriginal: boolean;
        partidaNacimientoCopia: boolean;
        diplomaBachillerCopia: boolean;
        identificacionCopia: boolean;
        fotoCarnet: boolean;
        certificadoNotasOriginal: boolean;
        certificadoNotasCopia: boolean;
        // nRecibo: number;
        beca: boolean;
        becadoPor: string;
        tipoBeca: string;
        incluyeMatricula: boolean;
        activo: boolean;
        observacion: string;
        fechaAlta: Date;
        fechaBaja: Date;
        estudios: string;
        situacionAcademica: string;

        grupoEstudiante: GrupoEstudiante[];
        matriculas: Matricula[];

        // carreraID: number;
        // periodoID: number;
}
