import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
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
import { element } from '@angular/core/src/render3';
import { PlanificacionDetalle } from 'src/app/models/planificacionDetalle';
import { OrderByPipe } from 'src/app/shared/pipes/order-by.pipe';
import { EvaluacionService } from 'src/app/_services/evaluacion.service';
import { Evaluacion } from 'src/app/models/evaluacion';

@Component({
  selector: 'app-planificacion-evaluacion',
  templateUrl: './planificacion-evaluacion.component.html',
  styleUrls: ['./planificacion-evaluacion.component.scss'],
  animations: [routerTransition()]
})

export class PlanificacionEvaluacionComponent  implements OnInit {


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

  constructor(
    private planificacionService: PlanificacionService,
    private evaluacionesService: EvaluacionService,
    private carreraService: CarreraService,
    private grupoService: GrupoService,
    private asignaturaService: AsignaturaService,
    private horarioService: HorarioService,
    private docenteService: DocenteService,
    private salonService: SalonService,
    private fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private location: Location,
    private dateFormat: DateformatPipe,
    private orderBy: OrderByPipe
  ) {
      this.createForm();
    }

  createForm() {
    this.planificacionEvaluacionForm = this.fb.group({
      planificacionDetalleID: ['', Validators.required],
      asignaturaID: ['', Validators.required],
      estudiantesControls: this.fb.array([])
    });
  }


  initEvaluacionesControls() {
    this.evaluacionesControls.push(
    this.fb.group({
      estudianteID: ['', Validators.required],
      evaluacionID: ['', Validators.required],
      planificacionDetalleID: ['', Validators.required],
      valor: [0, Validators.required]
    })
    );
  }

  get estudiantesControls(): FormArray {
    return this.planificacionEvaluacionForm.get('estudiantesControls') as FormArray;
  }

  get evaluacionesControls(): FormArray {
    return this.planificacionEvaluacionForm.get('evaluacionesControls') as FormArray;
  }

  addPlanificacion() {
    // this.submitted = true;
    // if (this.planificacionEvaluacionForm.valid) {
    //     this.evaluacionesControls.push(
    //       this.fb.group({
    //         id: 0,
    //         planificacionDetalleID: this.planificacionEvaluacionForm.get('planificacionDetalle').value,
    //         estudianteID: ['', Validators.required],
    //         evaluacionID: ['', Validators.required],
    //         valor: [0, Validators.required],
    //       })
    //     );
    // } else {
    //   this.alertify.error('Complete toda la información para poder Continuar');
    // }
  }

  initPlanificacionEstudiante() {
    // const arr = new FormArray([]);
    // const grupoSelected =   this.planificacionEvaluacionForm.get('grupoID').value;
    // if (grupoSelected > 0 ) {
    //   this.isPlanVisible = true;
    //   const grupos = this.selectedGrupos.filter(c => {
    //     return c.id === Number(grupoSelected);
    //   });
    //   grupos[0]['grupoEstudiantes'].forEach(element => {
    //     if (element['activo'] === true) {
    //       arr.push(
    //         this.fb.group({
    //           estudianteID: element['estudianteID'],
    //           nombre: element['estudiante'].nombre + ' ' + element['estudiante'].apellidoPat + ' ' + element['estudiante'].apellidoMat,
    //           activo: false
    //         })
    //       );
    //     }
    //   });
    // }
    // return arr;
  }

  getEstudiantesByGrupo() {

    // const grupoSelected =   this.planificacionEvaluacionForm.get('grupoID').value;
    // if (grupoSelected > 0 ) {
    //   this.planificacionService.getPlanificacionEvaluacionByGrupo(grupoSelected).subscribe(
    //     (  planificacionEvaluacion: PlanificacionEvaluacion[] ) => {
    //       this.planificacionEvaluaciones = planificacionEvaluacion;
    //       if (this.planificacionEvaluaciones.length > 0 ) {
    //         // const plan = planificacionEvaluacion.map(PlanificacionEvaluacion => this.fb.group(PlanificacionEvaluacion));
    //         // const planFormArray = this.fb.array(plan);
    //         // this.planificacionEvaluacionForm.setControl('evaluacionesControls', planFormArray);

    //         const grupos = this.selectedGrupos.filter(c => {
    //           return c.id === Number(grupoSelected);
    //         });

    //         planificacionEvaluacion.forEach( plan => {

    //           const arr = new FormArray([]);
    //           plan.planificacionEstudiante.forEach(element => {
    //             const estudiante = grupos[0]['grupoEstudiantes'].filter( e => {
    //               return e.estudianteID === Number(element['estudianteID']) ;
    //             });
    //                 arr.push(
    //                 this.fb.group({
    //                   estudianteID: element['estudianteID'],
    //                   nombre: estudiante[0].estudiante.nombre + ' ' +
    //                           estudiante[0].estudiante.apellidoPat + ' ' +
    //                           estudiante[0].estudiante.apellidoMat,
    //                   activo: element['activo']
    //                 })
    //               );
    //           });
    //           this.evaluacionesControls.push(
    //             this.fb.group({
    //               id: plan.id,
    //               grupoID: plan.grupoID,
    //               planificacionID: plan.planificacionID,
    //               horarioID: plan.horarioID,
    //               docenteID: plan.docenteID,
    //               salonID: plan.salonID,
    //               asignaturaID: plan.asignaturaID,
    //               casoEspecial: plan.casoEspecial,
    //               tutoria: plan.tutoria,
    //               planificacionEstudiante:  arr
    //             })
    //           );
    //         });
    //       } else {
    //         this.planificacionEvaluacionForm.setControl('evaluacionesControls', this.fb.array([]));
    //       }
    //     }
    //   );

    //   this.isPlanVisible = true;
    // }

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
     this.getPlanificacionEvaluacionByDocente();
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

  getGruposByCarrera(e) {

    // this.grupoService.getGruposByCarrera(e.target.value).subscribe(
    //   (  grupos: Grupo[] ) => {
    //     this.grupos = grupos;
    //     this.selectedGrupos = grupos;
    //     this.loading = false;
    //   }
    // );
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
    // this.loading = true;
    // this.carreraService.getCarreras().subscribe(
    //   (  carreras: Carrera[] ) => {
    //     this.carreras = carreras;
    //     this.loading = false;
    //   }
    // );
  }

  getPlanificaciones() {
    // this.planificacionService.getPlanificaciones().subscribe(
    //   (  planificaciones: Planificacion[] ) => {
    //     this.planificaciones = planificaciones;
    //   }
    // );
  }

  getPlanificacionEvaluacion(id: number) {
    // this.planificacionService.getPlanificacionEvaluacion(id).subscribe(
    //   (  planificacionEvaluacion: PlanificacionEvaluacion[] ) => {
    //     this.planificacionEvaluaciones = planificacionEvaluacion;
    //   }
    // );
  }

  getPlanificacionEstudianteById(id) {
    const arr = new FormArray([]);
    const arrEvaluaciones = new FormArray([]);
    const planificaciones = this.planificaciones.filter(c => {
      return c.id === Number(id.target.value);
    });
    this.planificacionSelected = planificaciones;
    this.submitted = true;
    planificaciones[0]['planificacionEstudiante'].forEach(element => {
        if (element['activo'] === true) {
          if (element['estudiante'].estudianteEvaluaciones.length > 0) {

          } else {

          }
          arr.push(
            this.fb.group({
              estudianteID: element['estudianteID'],
              nombre: element['estudiante'].nombre + ' ' + element['estudiante'].apellidoPat + ' ' + element['estudiante'].apellidoMat,
              planificacionEstudiante: this.initPlanificacionEstudiante()
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

  addEvaluacionEstudianteById(e) {

  }

  initEstudianteControls() {

  }

  getPlanificacionEvaluacionByDocente() {
    const user  = JSON.parse(localStorage.getItem('user'));
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
    this.disabledViews();
    this.isToList = true;
  }

  updatePlanificacionEvaluacion(planificacionEvaluacion: PlanificacionEvaluacion) {

    //  this.planificacionEvaluacionForm.patchValue({
    //   id: planificacionEvaluacion.id,
    //   planificacionID: planificacionEvaluacion.planificacionID,
    //   asignaturaID: planificacionEvaluacion.asignaturaID,
    //   grupoID: planificacionEvaluacion.grupoID,
    //   horarioID: planificacionEvaluacion.horarioID,
    //   docenteID: planificacionEvaluacion.docenteID,
    //   salonID: planificacionEvaluacion.salonID,
    //   casoEspecial: planificacionEvaluacion.casoEspecial,
    //   tutoria: planificacionEvaluacion.tutoria
    // });
    // this.disabledViews();
    // this.isToUpdate = true;
  }

  onSubmit() {
    // this.submitted = true;
    // this.loading = true;
    //  if (this.planificacionEvaluacionForm.valid) {
    //     this.planificacionEvaluaciones = this.prepareSavePlanificacion();
    //      if (this.isToAdd) {
    //       this.planificacionService.registerPlanificacionEvaluacion(this.planificacionEvaluaciones).subscribe(() => {
    //         // this.getPlanificacionEvaluacion();
    //        this.planificacionEvaluacionForm.setControl('evaluacionesControls', this.fb.array([]));
    //        this.getEstudiantesByGrupo();
    //        this.alertify.success('Planificación Actualizada Correctamente');
    //        this.loading = false;
    //       }, error => {
    //         this.alertify.error(error);
    //         this.loading = false;
    //       });
    //      }
    //      if (this.isToUpdate) {
    //        this.planificacionService.updatePlanificacionEvaluacion(this.planificacionEvaluacion, this.planificacionEvaluacion.id).subscribe(next => {
    //         // this.getPlanificacionEvaluacion();
    //         this.disabledViews();
    //         this.isToList = true;
    //        this.planificacionEvaluacionForm.reset(this.planificacionEvaluacion);
    //        this.alertify.success('Registro Modificado Correctamente');
    //        this.loading = false;
    //         }, error => {
    //           this.alertify.error(error);
    //           this.loading = false;
    //         });
    //      }
    //     // this.rebuildForm();
    //   } else {
    //   this.alertify.error('Complete toda la información para poder Continuar');
    // }
  }

  onDeleted(planificacion: FormArray, i: number) {
    // console.log(planificacion);
    // this.alertify.confirm('Desea Eliminar el Planificacion: ?', () => {
    //   this.planificacionService.deletePlanificacionEvaluacion(planificacion.get('id').value).subscribe(() => {
    //     this.alertify.success('La Planificacion ha sido Eliminada');
    //     this.evaluacionesControls.removeAt(i);
    //     // this.getEstudiantesByGrupo();
    //   }, error => {
    //     this.alertify.error('Error al Eliminar la Planificacion');
    //   });
    // });
  }

  // prepareSavePlanificacion(): PlanificacionEvaluacion[] {
  //   const formModel = this.planificacionEvaluacionForm.value;
  //   const planificacionDeepCopy: PlanificacionEvaluacion[] = formModel.evaluacionesControls
  //   .map((planificacion: PlanificacionEvaluacion) =>
  //   Object.assign({}, planificacion)
  // );
  //   const savePlanificacion: PlanificacionEvaluacion = {
  //     id: planificacionDeepCopy[0].id as number,
  //     asignaturaID: planificacionDeepCopy[0].asignaturaID as number,
  //     grupoID: planificacionDeepCopy[0].grupoID as number,
  //     horarioID: planificacionDeepCopy[0].horarioID as number,
  //     docenteID: planificacionDeepCopy[0].docenteID as number,
  //     planificacionID: planificacionDeepCopy[0].planificacionID as number,
  //     salonID: planificacionDeepCopy[0].salonID as number,
  //     tutoria: planificacionDeepCopy[0].tutoria as boolean,
  //     casoEspecial: planificacionDeepCopy[0].casoEspecial as boolean,
  //     planificacionEstudiante: planificacionDeepCopy[0].planificacionEstudiante
  //   };
  //     return planificacionDeepCopy;
  // }



}

