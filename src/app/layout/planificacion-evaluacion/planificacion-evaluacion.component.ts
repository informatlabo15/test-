import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AlertifyService } from '../../_services/alertify.service';
import { CarreraService } from 'src/app/_services/carrera.service';
import { GrupoService } from 'src/app/_services/grupo.service';
import { HorarioService } from 'src/app/_services/horario.service';
import { DocenteService } from 'src/app/_services/docente.service';
import { SalonService } from 'src/app/_services/salon.service';
import { AsignaturaService } from 'src/app/_services/asignatura.service';
import { PlanificacionService } from '../../_services/planificacion.service';
import { Planificacion } from '../../models/planificacion';
import { Carrera } from 'src/app/models/carrera';
import { DateformatPipe } from 'src/app/shared/pipes/dateformat.pipe';
import { PlanificacionEvaluacion } from 'src/app/models/planificacionEvaluacion';
import { Grupo } from 'src/app/models/grupo';
import { Horario } from 'src/app/models/horario';
import { Docente } from 'src/app/models/docente';
import { Salon } from 'src/app/models/salon';
import { Asignatura } from 'src/app/models/asignatura';
import { PlanificacionEstudiante } from 'src/app/models/planificacionEstudiante';
import { PlanificacionDetalle } from 'src/app/models/planificacionDetalle';
import { OrderByPipe } from 'src/app/shared/pipes/order-by.pipe';
import { EvaluacionService } from 'src/app/_services/evaluacion.service';
import { Evaluacion } from 'src/app/models/evaluacion';
import { PlanificacionEvaluacionModule } from './planificacion-evaluacion.module';

@Component({
  selector: 'app-planificacion-evaluacion',
  templateUrl: './planificacion-evaluacion.component.html',
  styleUrls: ['./planificacion-evaluacion.component.scss'],
  animations: [routerTransition()]
})

export class PlanificacionEvaluacionComponent  implements OnInit {

  public planificacionesPeriodos: Planificacion[];
  public planificacionEvaluacion: PlanificacionEvaluacion;
  public planificacionEvaluaciones: PlanificacionEvaluacion[];
  public planificaciones: PlanificacionDetalle[];
  public planificacionSelected: PlanificacionDetalle[];
  public evaluaciones: Evaluacion[];
  public carreras: Carrera[];
  public grupos: Grupo[];
  public selectedGrupos;
  public horarios: Horario[];
  public docentes: Docente[];
  public docente: Docente;
  public salones: Salon[];
  public asignaturas: Asignatura[];
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

  public isAsignaturaSelected = false;
  public isPlanSelected = false;

  constructor(
    private planificacionService: PlanificacionService,
    private evaluacionesService: EvaluacionService,
    private carreraService: CarreraService,
    private grupoService: GrupoService,
    // private asignaturaService: AsignaturaService,
    // private horarioService: HorarioService,
    private docenteService: DocenteService,
    // private salonService: SalonService,
    private fb: FormBuilder,
    public router: Router,
    // private route: ActivatedRoute,
    private alertify: AlertifyService,
    // private location: Location,
    // private dateFormat: DateformatPipe,
    private orderBy: OrderByPipe
  ) {
      this.createForm();
    }

  createForm() {
    this.planificacionEvaluacionForm = this.fb.group({
      planificacionID: '',
      carreraID: '',
      grupoID: '',
      planificacionDetalleID: ['', Validators.required],
      estudiantesControls: this.fb.array([])
    });
  }


  get estudiantesControls(): FormArray {
    return this.planificacionEvaluacionForm.get('estudiantesControls') as FormArray;
  }

  get evaluacionesControls(): FormArray {
    return this.planificacionEvaluacionForm.get('evaluacionesControls') as FormArray;
  }

  get pe(): FormArray {
     return this.planificacionEvaluacionForm.get('evaluacionesControls') as FormArray;
  }

  get p(): any {
    return this.planificacionEvaluacionForm.controls;
  }

  removePlanificacion(id: number) {
    this.evaluacionesControls.removeAt(id);
  }


  ngOnInit() {
     const user  = JSON.parse(localStorage.getItem('user'));
     window.scroll(0, 0);
     this.isToAdd = true;
     this.tipoUsuario =  user['tipo'];
     if ( this.tipoUsuario === 5 ) {
      this.getPlanificacionEvaluacionByDocente();
    } else  if ( this.tipoUsuario === 4 ) {
       this.getPlanificaciones();
       this.getCarrerasByDecano();
    } else {
      this.getPlanificaciones();
      this.getCarreras();
    }

    this.getEvaluaciones();
    // // this.getPlanificacionEvaluacion();
    // this.getCarreras();
    // this.getDocentes();
    // this.getHorarios();
    // this.getSalones();
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

  nSelectRows(e, grupo) {
    // const activated = e.target.checked;
    // grupo.get('planificacionEstudiante').controls.forEach(element => {
    //       element.get('activo').patchValue(activated);
    //     });

  }

  getCarrerasByDecano(): any {
    this.loading = true;
    const user  = JSON.parse(localStorage.getItem('user'));
    const decano = user['docente'].id;
    this.carreraService.getCarrerasByDecano(decano).subscribe(
      (  carreras: Carrera[] ) => {
        this.carreras = carreras;
        this.loading = false;
      }
    );
  }

  getGruposByCarrera(e) {

    this.grupoService.getGruposByCarrera(e.target.value).subscribe(
      (  grupos: Grupo[] ) => {
        this.grupos = grupos;
        this.selectedGrupos = grupos;
        this.loading = false;
      }
    );
  }

  getAsignaturasByCarrera(carrera) {

    // this.loading = true;
    // this.asignaturaService.getAsignaturasByCarrera(carrera.target.value).subscribe(
    //   (  asignaturas: Asignatura[] ) => {
    //     this.asignaturas = asignaturas;
    //     this.loading = false;
    //   }
    // );
  }

  getHorarios() {
    // this.loading = true;
    // this.horarioService.getHorarios().subscribe(
    //   (  horarios: Horario[] ) => {
    //     this.horarios = horarios;
    //     this.loading = false;
    //   }
    // );
  }

  getSalones() {
    // this.loading = true;
    // this.salonService.getSalones().subscribe(
    //   (  salones: Salon[] ) => {
    //     this.salones = salones;
    //     this.loading = false;
    //   }
    // );
  }

  getDocentes() {
    // this.loading = true;
    // this.docenteService.getDocentesByStatus().subscribe(
    //   (  docentes: Docente[] ) => {
    //     this.docentes = docentes;
    //     this.loading = false;
    //   }
    // );
  }

  getCarreras() {
    this.loading = true;
    this.carreraService.getCarreras().subscribe(
      (  carreras: Carrera[] ) => {
        this.carreras = carreras;
        this.loading = false;
      }
    );
  }

  getPlanificaciones() {
    this.planificacionService.getPlanificaciones().subscribe(
      (  planificaciones: Planificacion[] ) => {
        this.planificacionesPeriodos = planificaciones;
      }
    );
  }

  getPlanificacionesByPlanificacion_Grupo(){
    // const arr = new FormArray([]);
    this.planificacionService.getPlanificacionesByPlanificacion_Grupo(this.p.planificacionID.value, this.p.grupoID.value).subscribe(
      (  planificaciones: PlanificacionDetalle[] ) => {
        this.planificaciones = planificaciones;
        this.planificacionSelected = planificaciones;
        this.submitted = true;
      }
    );
  }

  getPlanificacionEvaluacion(id: number) {
    // this.planificacionService.getPlanificacionEvaluacion(id).subscribe(
    //   (  planificacionEvaluacion: PlanificacionEvaluacion[] ) => {
    //     this.planificacionEvaluaciones = planificacionEvaluacion;
    //   }
    // );
  }



  getPlanificacionDocenteByPlanificacion(id) {
    if (Number(id.target.value > 0)) {
      var  planificaciones = planificaciones = this.planificaciones.filter(c => {
          return c.id === Number(id.target.value);
        });
      this.planificacionSelected = planificaciones;
      this.submitted = true;
      this.fillEstudianteEvaluacion(this.planificacionSelected[0]);
    }
  }

  addEvaluacionEstudianteById(e) {
    const evalNombre: Evaluacion[] = this.evaluaciones.filter( ev => {
      return ev.id === Number(e.target.value);
    });
    let flag = false;
    var planificacionDetalleID = this.planificacionEvaluacionForm.get('planificacionDetalleID').value;
    this.estudiantesControls.controls.forEach((evaluaciones) => {
      const arrEvaluaciones = <FormArray> evaluaciones.get('evaluacionEstudiante');
      arrEvaluaciones.controls.forEach(evaluacion => {
          if ((evaluacion.get('evaluacionID').value === Number(e.target.value)) &&
           (evaluacion.get('planificacionDetalleID').value === Number(planificacionDetalleID))){
            this.alertify.error('Esta Evaluación ya Existe para esta Planificación. Por favor seleccione otra Evaluación');
            flag = true;
            return;
          }
      });
    });
    if (!flag){
      this.estudiantesControls.controls.forEach((estudiante) => {
        const arrEstudiante = <FormArray>estudiante.get('evaluacionEstudiante');
        arrEstudiante.push(
          this.fb.group({
            evalNombre: evalNombre[0].nombre,
            estudianteID: estudiante.get('estudianteID').value,
            evaluacionID:  Number(e.target.value),
            planificacionDetalleID: estudiante.get('planificacionDetalleID').value,
            valor: 0,
            id: 0
          })
        );
      });
    }
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

  refreshPlanificacionEvaluacionByDocente() {
    const user  = JSON.parse(localStorage.getItem('user'));
    if (this.tipoUsuario === 5 ){
      this.docenteService.getDocenteDetailByUser(user['userId']).subscribe(
        (docente: Docente ) => {
          this.docente = docente;
          if (docente !== undefined) {
            this.planificacionService.getPlanificacionDetalleByDocente(docente.id).subscribe(
              (  planificacionDetalle: PlanificacionDetalle[] ) => {
                  this.planificaciones = planificacionDetalle;
                  const planificacionDetalleID = this.planificacionEvaluacionForm.get('planificacionDetalleID').value;
                  const planificaciones = this.planificaciones.filter(c => {
                      return c.id === Number(planificacionDetalleID);
                  });
                  this.planificacionSelected = planificaciones;
                  this.submitted = true;
                  this.fillEstudianteEvaluacion(this.planificacionSelected[0]);
              }
            );
          }
        }
      );
    }
  }

  refreshPlanificacionEvaluacionByPlanificacion_Grupo() {
    if (this.tipoUsuario === 4  || this.tipoUsuario === 3  || this.tipoUsuario === 2 || this.tipoUsuario === 1 ){
        this.planificacionService.getPlanificacionesByPlanificacion_Grupo(this.p.planificacionID.value, this.p.grupoID.value).subscribe(
          (  planificacionDetalle: PlanificacionDetalle[] ) => {
              this.planificaciones = planificacionDetalle;
             this.planificacionSelected = planificacionDetalle;
              this.submitted = true;
              this.fillEstudianteEvaluacion(this.planificacionSelected[0]);
          }
        );
    }
  }

  fillEstudianteEvaluacion(planificacionSelected: PlanificacionDetalle) {
    const arr = new FormArray([]);
    this.planificacionSelected[0] = planificacionSelected;

    const arrEvalEncontradas =  [];
    this.planificacionSelected[0]['planificacionEstudiante'].forEach(estudiante => {
      // Encontramos las evaluaciones que tiene actualmente asignadas los estudiantes en la tabla de 'EstudianteEvaluacion'
      this.evaluaciones.forEach(evalu => {
        if (estudiante['estudiante'].estudianteEvaluaciones.length > 0) {
          const evalSelected = estudiante['estudiante'].estudianteEvaluaciones.filter( ev => {
            return ev.evaluacionID === Number(evalu.id);
          });
          if (evalSelected.length  > 0 ) {
            const arrEvalEncontradas_siExiste = arrEvalEncontradas.filter( e => {
              return e.id === Number(evalu.id);
            });
            if ( arrEvalEncontradas_siExiste.length === 0 ){
              arrEvalEncontradas.push(
                { id: Number(evalu.id), nombre: evalu.nombre}
              );
            }
          }
        }
      });
    });

    this.planificacionSelected[0]['planificacionEstudiante'].forEach(estudiante => {
      const arrEvaluaciones = new FormArray([]);
        if (estudiante['activo'] === true) {
          if (arrEvalEncontradas.length > 0 ) {
            arrEvalEncontradas.forEach(evalu => {
              // Start Si el estudiante tiene evaluaciones agregadas
              if (estudiante['estudiante'].estudianteEvaluaciones.length > 0) {
                const evalSelected = estudiante['estudiante'].estudianteEvaluaciones.filter( ev => {
                    return ev.evaluacionID === Number(evalu.id);
                  });
                  if (evalSelected.length  > 0 ) {
                    arrEvaluaciones.push(
                      this.fb.group({
                        id:  evalSelected[0]['id'],
                        evalNombre: evalu.nombre,
                        estudianteID: evalSelected[0]['estudianteID'],
                        evaluacionID: evalSelected[0]['evaluacionID'],
                        planificacionDetalleID: evalSelected[0]['planificacionDetalleID'],
                        valor: evalSelected[0]['valor']
                      })
                    );
                  }
              }else
              {
                arrEvaluaciones.push(
                  this.fb.group({
                    id:  0,
                    evalNombre: evalu.nombre,
                    estudianteID: estudiante['estudianteID'],
                    evaluacionID: evalu.id,
                    planificacionDetalleID: estudiante['planificacionDetalleID'],
                    valor: 0
                  })
                );
              } // End Si el estudiante tiene evaluaciones agregadas
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

  addPlanificacionEvaluacion() {
    this.disabledViews();
    this.createForm();
    this.isToAdd = true;
  }

  disabledViews() {
    this.isToAdd = false;
    this.isToList = false;
    this.isToUpdate = false;
  }

  goBack() {
//     this.location.back();
//        this.router.navigate(['/planificaciones']);
    // this.disabledViews();
    // this.isToList = true;
  }

  onSubmit() {
     this.submitted = true;
     this.loading = true;
     this.planificacionEvaluaciones = this.prepareSaveEvaluaciones();
      if (this.planificacionEvaluacionForm.valid) {
          if (this.isToAdd) {
           this.planificacionService.registerPlanificacionEvaluacion(
             this.planificacionEvaluaciones).subscribe(() => {
            this.planificacionEvaluacionForm.setControl('estudiantesControls', this.fb.array([]));
           this.alertify.success('Planificación Actualizada Correctamente');
           this.loading = false;
           if (this.tipoUsuario === 4  || this.tipoUsuario === 3  || this.tipoUsuario === 2 || this.tipoUsuario === 1 ){
            this.refreshPlanificacionEvaluacionByPlanificacion_Grupo();
           }else if ( this.tipoUsuario === 5){
            this.refreshPlanificacionEvaluacionByDocente();
           }
          }, error => {
            this.alertify.error(error);
            this.loading = false;
          });
         }
      } else {
        this.alertify.error('Complete toda la información para poder Continuar');
    }
  }

  onDeletedEvaluacion( planificacion: FormArray, i: number) {
    this.alertify.confirm('Desea Eliminar la Evaluación: ?', () => {
        this.planificacionService.deletePlanificacionEvaluacion(planificacion.get('planificacionDetalleID').value,
         planificacion.get('evaluacionID').value).subscribe(() => {
            this.estudiantesControls.controls.forEach((estudiante) => {
              const arrEstudiante = <FormArray>estudiante.get('evaluacionEstudiante');
              arrEstudiante.removeAt(i);
            });
            this.planificacionEvaluacionForm.setControl('estudiantesControls', this.fb.array([]));
            if (this.tipoUsuario === 4  || this.tipoUsuario === 3  || this.tipoUsuario === 2 || this.tipoUsuario === 1 ){
              this.refreshPlanificacionEvaluacionByPlanificacion_Grupo();
             }else if ( this.tipoUsuario === 5){
              this.refreshPlanificacionEvaluacionByDocente();
             }
            this.alertify.success('La Evaluación ha sido Eliminada');
        }, error => {
          this.alertify.error('Error al Eliminar la Evaluación');
        });
    });
  }

   prepareSaveEvaluaciones(): PlanificacionEvaluacion[] {
    const arr = new FormArray([]);
    this.estudiantesControls.controls.forEach((evaluaciones) => {
      const arrEvaluaciones = <FormArray> evaluaciones.get('evaluacionEstudiante');
      arrEvaluaciones.controls.forEach(evaluacion => {
         arr.push(
            this.fb.group({
              id:  evaluacion.get('id').value,
              estudianteID: evaluacion.get('estudianteID').value,
              evaluacionID: evaluacion.get('evaluacionID').value,
              planificacionDetalleID: evaluacion.get('planificacionDetalleID').value,
              valor: evaluacion.get('valor').value
            })
          );
      });
    });
    const formModel = arr.value;
    const evaluacionesDeepCopy: PlanificacionEvaluacion[] = formModel
       .map((evaluacion: PlanificacionEvaluacion) =>
       Object.assign({}, evaluacion)
     );
     return evaluacionesDeepCopy;
  }



}

