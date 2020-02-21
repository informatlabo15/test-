import { Component, OnInit } from '@angular/core';
import { PlanificacionService } from 'src/app/_services/planificacion.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { OrderByPipe } from 'src/app/shared/pipes/order-by.pipe';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { EvaluacionService } from 'src/app/_services/evaluacion.service';
import { Evaluacion } from 'src/app/models/evaluacion';
import { DocenteService } from 'src/app/_services/docente.service';
import { Docente } from 'src/app/models/docente';
import { PlanificacionDetalle } from 'src/app/models/planificacionDetalle';
import { PlanificacionEstudiante } from 'src/app/models/planificacionEstudiante';

@Component({
  selector: 'app-acta-notas',
  templateUrl: './acta-notas.component.html',
  styleUrls: ['./acta-notas.component.scss']
})
export class ActaNotasComponent implements OnInit {

  // public planificacionesPeriodos: Planificacion[];
  // public planificacionEvaluacion: PlanificacionEvaluacion;
  // public planificacionEvaluaciones: PlanificacionEvaluacion[];
  public planificaciones: PlanificacionDetalle[];
  public planificacionSelected: PlanificacionDetalle[];
  public planificacionEstudianteSelected: PlanificacionEstudiante[];
  public evaluaciones: Evaluacion[];
  // public carreras: Carrera[];
  // public grupos: Grupo[];
  // public selectedGrupos;
  // public horarios: Horario[];
  // public docentes: Docente[];
  public docente: Docente;
  // public salones: Salon[];
  // public asignaturas: Asignatura[];
  planificacionEvaluacionForm: FormGroup;
  public tipoUsuario: number;
  public isToAdd: boolean;
  public isToUpdate: boolean;
  public isToList: boolean;
  public loading = false;

  public isPlanVisible = false;

  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'nombre';
  public sortOrder = 'asc';
  submitted = false;

  // Devuelve las veces que el ciclo se repite 
  public indice: number;

  public fecha = new Date();

  public isAsignaturaSelected = false;
  public isPlanSelected = false;
  public subtitle = '';

  constructor(
    private planificacionService: PlanificacionService,
    private evaluacionesService: EvaluacionService,
    // private carreraService: CarreraService,
    // private grupoService: GrupoService,
    // private asignaturaService: AsignaturaService,
    // private horarioService: HorarioService,
    private docenteService: DocenteService,
    // private salonService: SalonService,
    private fb: FormBuilder,
    // public router: Router,
    // private route: ActivatedRoute,
    private alertify: AlertifyService,
    // private location: Location,
    // private dateFormat: DateformatPipe,
    private orderBy: OrderByPipe

  ) { 
    this.createForm();
    this.indice = 0;
  }

  ngOnInit() {
    const user  = JSON.parse(localStorage.getItem('user'));
     window.scroll(0, 0);
     this.isToAdd = true;
     this.tipoUsuario =  user['tipo'];
     this.getEvaluaciones();
     if ( this.tipoUsuario === 5  || this.tipoUsuario === 4  || this.tipoUsuario === 3 ) {
      this.getPlanificacionEvaluacionByDocente();
    } else {
     // this.getPlanificaciones();
     // this.getCarreras();
    }
  }

  createForm() {
    this.planificacionEvaluacionForm = this.fb.group({
      planificacionID: '',
      carreraID: '',
      grupoID:'',
      planificacionDetalleID: '',
      estudiantesControls: this.fb.array([]),
      evaluacionID: ''
    });
  }

  getEvaluaciones() {
    this.loading = true;
    this.evaluacionesService.getEvaluaciones().subscribe(
      (  evaluaciones: Evaluacion[] ) => {
        this.evaluaciones = evaluaciones;
        this.loading = false;
      }
    );
  }

  get estudiantesControls(): FormArray {
    return this.planificacionEvaluacionForm.get('estudiantesControls') as FormArray;
  }

  get p(): any {
    return this.planificacionEvaluacionForm.controls;
  }

  getPlanificacionEvaluacionByDocente() {
    const user  = JSON.parse(localStorage.getItem('user'));
    if (this.tipoUsuario === 5  || this.tipoUsuario === 4 || this.tipoUsuario === 3 ){
      this.docenteService.getDocenteDetailByUser(user['userId']).subscribe(
        (docente: Docente ) => {
          this.docente = docente;
          if (docente !== undefined) {
            this.planificacionService.getPlanificacionDetalleByDocente(docente.id).subscribe(
              (  planificacionDetalle: PlanificacionDetalle[] ) => {
                  this.planificaciones = planificacionDetalle;
              }
            );
          }
        }
      );
    }
  }
  getPlanificacionDocenteByPlanificacion(id) {
    var  planificaciones  = this.planificaciones.filter(c => {
        return c.id === Number(id.target.value);
      });


      this.planificacionSelected = planificaciones;
      this.submitted = true;

      if(Number(this.planificacionEvaluacionForm.get('evaluacionID').value) === 0){
          this.subtitle = 'Acta de Notas Cuatrimestral';
          this.planificacionEstudianteSelected = this.planificacionSelected[0]['planificacionEstudiante'].filter( e => {
            return e.activo === true;
          });
      } else { 
        this.planificacionEstudianteSelected = this.planificacionSelected[0]['planificacionEstudiante'].filter( (e) => {
          if (e.activo === true && e['estudiante'].estudianteEvaluaciones.filter( (evaluacion ) => {
              return evaluacion.evaluacion.acumulado !== true && evaluacion.valor > 0;
          }).length > 0) {
              return e;
          }
        });
        this.subtitle =  'Acta de Notas de ' +  this.planificacionEvaluacionForm.get('evaluacionID').value;
      }
  }

  
  fillEstudianteEvaluacion(planificacionSelected: PlanificacionDetalle) {
    const arr = new FormArray([]);
    this.planificacionSelected[0] = planificacionSelected; 
    this.planificacionSelected[0]['planificacionEstudiante'].forEach(estudiante => {
      const arrEvaluaciones = new FormArray([]);
        if (estudiante['activo'] === true) {
          if (estudiante['estudiante'].estudianteEvaluaciones.length > 0) {
            estudiante['estudiante'].estudianteEvaluaciones.forEach(evaluacion => {
              // const evalNombre: Evaluacion[] = this.evaluaciones.filter( ev => {
              //   return ev.id === Number(evaluacion['evaluacionID']);
              // });
              arrEvaluaciones.push(
                this.fb.group({
                  id:  evaluacion['id'],
                  // evalNombre: evalNombre[0].nombre,
                  estudianteID: evaluacion['estudianteID'],
                  evaluacionID: evaluacion['evaluacionID'],
                  planificacionDetalleID: evaluacion['planificacionDetalleID'],
                  valor: evaluacion['valor']
                })
              );
            });
          }
          arr.push(
            this.fb.group({
              estudianteID: estudiante['estudianteID'],
              planificacionDetalleID: estudiante['planificacionDetalleID'],
              nombre: estudiante['estudiante'].nombreCompleto,
              evaluacionEstudiante: arrEvaluaciones
            })
          );
      }
    });
    this.planificacionEvaluacionForm.setControl('estudiantesControls', this.fb.array([]));
    this.orderBy.transform(arr.controls, 'value.nombre').forEach(element => {
      this.estudiantesControls.push(
        element
      );
    });
  }

// Calcula Sumatoria del acumulado y examen 
  getTotal(estudianteID) {
    if( this.planificacionSelected[0]){
      const estudiante= this.planificacionSelected[0].planificacionEstudiante.filter( e => {
        return e.estudianteID === Number(estudianteID);
      });
      if (estudiante[0]['estudiante'].estudianteEvaluaciones.length > 0) {
        var acum = 0;
        estudiante[0]['estudiante'].estudianteEvaluaciones.forEach(evaluacion => {
         if (evaluacion.evaluacion.acumulado === true ){
            acum =  acum + evaluacion.valor;
         }
      });
      return acum;
      }
    }
  }

  onSubmit() {
    window.print();
  }

    
    Unidades(num) {

      switch (num) {
          case 1: return 'UN';
          case 2: return 'DOS';
          case 3: return 'TRES';
          case 4: return 'CUATRO';
          case 5: return 'CINCO';
          case 6: return 'SEIS';
          case 7: return 'SIETE';
          case 8: return 'OCHO';
          case 9: return 'NUEVE';
      }

      return '';
  }
  // Unidades()

  Decenas(num) {

      const decena = Math.floor(num / 10);
      const unidad = num - (decena * 10);

      switch (decena) {
          case 1:
              switch (unidad) {
                  case 0: return 'DIEZ';
                  case 1: return 'ONCE';
                  case 2: return 'DOCE';
                  case 3: return 'TRECE';
                  case 4: return 'CATORCE';
                  case 5: return 'QUINCE';
                  default: return 'DIECI' + this.Unidades(unidad);
              }
          case 2:
              switch (unidad) {
                  case 0: return 'VEINTE';
                  default: return 'VEINTI' + this.Unidades(unidad);
              }
          case 3: return this.DecenasY('TREINTA', unidad);
          case 4: return this.DecenasY('CUARENTA', unidad);
          case 5: return this.DecenasY('CINCUENTA', unidad);
          case 6: return this.DecenasY('SESENTA', unidad);
          case 7: return this.DecenasY('SETENTA', unidad);
          case 8: return this.DecenasY('OCHENTA', unidad);
          case 9: return this.DecenasY('NOVENTA', unidad);
          case 0: return this.Unidades(unidad);
      }
  }// Unidades()

  DecenasY(strSin, numUnidades) {
      if (numUnidades > 0) {
          return strSin + ' Y ' + this.Unidades(numUnidades);
      }
      return strSin;
  }// DecenasY()

  Centenas(num) {
      const centenas = Math.floor(num / 100);
      const decenas = num - (centenas * 100);

      switch (centenas) {
          case 1:
              if (decenas > 0) {
                  return 'CIENTO ' + this.Decenas(decenas);
              }
              return 'CIEN';
          case 2: return 'DOSCIENTOS ' + this.Decenas(decenas);
          case 3: return 'TRESCIENTOS ' + this.Decenas(decenas);
          case 4: return 'CUATROCIENTOS ' + this.Decenas(decenas);
          case 5: return 'QUINIENTOS ' + this.Decenas(decenas);
          case 6: return 'SEISCIENTOS ' + this.Decenas(decenas);
          case 7: return 'SETECIENTOS ' + this.Decenas(decenas);
          case 8: return 'OCHOCIENTOS ' + this.Decenas(decenas);
          case 9: return 'NOVECIENTOS ' + this.Decenas(decenas);
      }

      return this.Decenas(decenas);
  }// Centenas()

  Seccion(num, divisor, strSingular, strPlural) {
      const cientos = Math.floor(num / divisor);
      const resto = num - (cientos * divisor);

      let letras = '';

      if (cientos > 0) {
          if (cientos > 1) {
              letras = this.Centenas(cientos) + ' ' + strPlural;
          } else {
              letras = strSingular;
          }
      }
      if (resto > 0) {
          letras += '';
      }
      return letras;
  }// Seccion()

  Miles(num) {
      const divisor = 1000;
      const cientos = Math.floor(num / divisor);
      const resto = num - (cientos * divisor);

      const strMiles = this.Seccion(num, divisor, 'UN MIL', 'MIL');
      const strCentenas = this.Centenas(resto);

      if (strMiles === '') {
          return strCentenas;
      }
      return strMiles + ' ' + strCentenas;
  }// Miles()

  Millones(num) {
      const divisor = 1000000;
      const cientos = Math.floor(num / divisor);
      const resto = num - (cientos * divisor);

      const strMillones = this.Seccion(num, divisor, 'UN MILLON DE', 'MILLONES DE');
      const strMiles = this.Miles(resto);

      if (strMillones === '') {
          return strMiles;
      }

      return strMillones + ' ' + strMiles;
  }// Millones()

  numeroALetras(num, currency) {
      currency = currency || {};
      const data = {
          numero: num,
          enteros: Math.floor(num),
          centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
          letrasCentavos: '',
          letrasMonedaPlural: currency.plural || '', // 'PESOS', 'Dólares', 'Bolívares', 'etcs'
          letrasMonedaSingular: currency.singular || '', // 'PESO', 'Dólar', 'Bolivar', 'etc'
          letrasMonedaCentavoPlural: currency.centPlural || '',
          letrasMonedaCentavoSingular: currency.centSingular || ''
      };

      if (data.centavos > 0) {
          let centavos = '';
          if (data.centavos === 1) {
              centavos = this.Millones(data.centavos) + ' ' + data.letrasMonedaCentavoSingular;
          } else {
              centavos =  this.Millones(data.centavos) + ' ' + data.letrasMonedaCentavoPlural;
          }
          data.letrasCentavos = 'CON ' + centavos;
      }

      if (data.enteros === 0) {
          return 'CERO ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
      }
      if (data.enteros === 1) {
          return this.Millones(data.enteros) + ' ' + data.letrasMonedaSingular + ' ' + data.letrasCentavos;
      } else {
          return this.Millones(data.enteros) + ' ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
      }
  }

  
}
