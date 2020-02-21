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
import { PlanificacionDetalle } from 'src/app/models/planificacionDetalle';
import { Grupo } from 'src/app/models/grupo';
import { Horario } from 'src/app/models/horario';
import { Docente } from 'src/app/models/docente';
import { Salon } from 'src/app/models/salon';
import { Asignatura } from 'src/app/models/asignatura';
import { PlanificacionEstudiante } from 'src/app/models/planificacionEstudiante';
import { element } from '@angular/core/src/render3';
import { OrderByPipe } from 'src/app/shared/pipes/order-by.pipe';

@Component({
  selector: 'app-planificacion-detalle',
  templateUrl: './planificacion-detalle.component.html',
  styleUrls: ['./planificacion-detalle.component.scss'],
  animations: [routerTransition()]
})

export class PlanificacionDetalleComponent  implements OnInit {


  public planificacionDetalle: PlanificacionDetalle;
  public planificacionDetalles: PlanificacionDetalle[];
  public planificaciones: Planificacion[];
  public carreras: Carrera[];
  public grupos: Grupo[];
  public selectedGrupos;
  public horarios: Horario[];
  public docentes: Docente[];
  public salones: Salon[];
  public asignaturas: Asignatura[];
  planificacionDetalleForm: FormGroup;
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
  constructor(
    private planificacionService: PlanificacionService,
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
    this.planificacionDetalleForm = this.fb.group({
      id: 0,
      grupoID: ['', Validators.required],
      planificacionID: ['', Validators.required],
      carreraID: ['', Validators.required],
      planificacionesControls: this.fb.array([])
    });
  }


  initPlanificacionControls() {
    this.planificacionesControls.push(
    this.fb.group({
      horarioID: ['', Validators.required],
      docenteID: ['', Validators.required],
      salonID: ['', Validators.required],
      asignaturaID: ['', Validators.required],
      casoEspecial: false,
      tutoria: false,
      planificacionEstudiante: this.fb.array([ this.initPlanificacionEstudianteControls() ]),
    })
    );
  }

  initPlanificacionEstudianteControls() {
    // this.planificacionEstudiante.push(
    // this.fb.group({
    //   estudianteID: 0,
    //   nombre: '',
    //   evaluacionID: 0,
    //   valor: 0
    // })
    // );
    const arr = new FormArray([]);
        arr.push(
          this.fb.group({
            estudianteID: 0,
            nombre: '',
            evaluacionID: 0,
            valor: 0
          })
        );
    return arr;
  }

  get planificacionesControls(): FormArray {
    return this.planificacionDetalleForm.get('planificacionesControls') as FormArray;
  }

  // get planificacionEstudiante(): FormArray {
  //   let i = 0;
  //   const planificaciones = this.planificacionDetalleForm.get('planificacionesControls') as FormArray;
  //   const evaluaciones = planificaciones.controls[i].get('planificacionEstudiante');
  //   planificaciones.get('');
  //   i += 1;
  //   // console.log(i);
  //   // console.log(this.planificacionDetalleForm);
  //   return <FormArray>  evaluaciones ;
  // }


  addPlanificacion() {
    this.submitted = true;
    if (this.planificacionDetalleForm.valid) {
        this.planificacionesControls.push(
          this.fb.group({
            id: 0,
            grupoID: this.planificacionDetalleForm.get('grupoID').value,
            planificacionID: this.planificacionDetalleForm.get('planificacionID').value,
            horarioID: ['', Validators.required],
            docenteID: ['', Validators.required],
            salonID: ['', Validators.required],
            asignaturaID: ['', Validators.required],
            casoEspecial: false,
            tutoria: false,
            planificacionEstudiante:  this.initPlanificacionEstudiante()
          })
        );
    } else {
      this.alertify.error('Complete toda la información para poder Continuar');
    }
  }

  initPlanificacionEstudiante() {
    const arr = new FormArray([]);
    const grupoSelected =   this.planificacionDetalleForm.get('grupoID').value;
    if (grupoSelected > 0 ) {
      this.isPlanVisible = true;
      const grupos = this.selectedGrupos.filter(c => {
        return c.id === Number(grupoSelected);
      });
      grupos[0]['grupoEstudiantes'].forEach(element => {
        if (element['activo'] === true) {
          arr.push(
            this.fb.group({
              estudianteID: element['estudianteID'],
              nombre: element['estudiante'].nombre + ' ' + element['estudiante'].apellidoPat + ' ' + element['estudiante'].apellidoMat,
              activo: false
            })
          );
        }
      });
    }
    return arr;
  }

  getEstudiantesByGrupo() {

    const grupoSelected =   this.planificacionDetalleForm.get('grupoID').value;
    if (grupoSelected > 0 ) {
      this.planificacionService.getPlanificacionDetalleByGrupo(grupoSelected).subscribe(
        (  planificacionDetalle: PlanificacionDetalle[] ) => {
          this.planificacionDetalles = planificacionDetalle;
          if (this.planificacionDetalles.length > 0 ) {
            // const plan = planificacionDetalle.map(PlanificacionDetalle => this.fb.group(PlanificacionDetalle));
            // const planFormArray = this.fb.array(plan);
            // this.planificacionDetalleForm.setControl('planificacionesControls', planFormArray);

            const grupos = this.selectedGrupos.filter(c => {
              return c.id === Number(grupoSelected);
            });

            planificacionDetalle.forEach( plan => {

              const arr = new FormArray([]);
              plan.planificacionEstudiante.forEach(element => {
                const estudiante = grupos[0]['grupoEstudiantes'].filter( e => {
                  return e.estudianteID === Number(element['estudianteID']) ;
                });
                    arr.push(
                    this.fb.group({
                      estudianteID: element['estudianteID'],
                      nombre: estudiante[0].estudiante.nombre + ' ' +
                              estudiante[0].estudiante.apellidoPat + ' ' +
                              estudiante[0].estudiante.apellidoMat,
                      activo: element['activo']
                    })
                  );
              });
               console.log(this.orderBy.transform(arr.controls, 'value.nombre'));
              // arr.value.sort((a, b) => a.values.nombre.localeCompare(b.values.nombre));
              this.planificacionesControls.push(
                this.fb.group({
                  id: plan.id,
                  grupoID: plan.grupoID,
                  planificacionID: plan.planificacionID,
                  horarioID: plan.horarioID,
                  docenteID: plan.docenteID,
                  salonID: plan.salonID,
                  asignaturaID: plan.asignaturaID,
                  casoEspecial: plan.casoEspecial,
                  tutoria: plan.tutoria,
                  planificacionEstudiante:  arr
                })
              );
            });
          } else {
            this.planificacionDetalleForm.setControl('planificacionesControls', this.fb.array([]));
          }
        }
      );

      this.isPlanVisible = true;
    }

    // const grupoSelected =   this.planificacionDetalleForm.get('grupoID').value;
    // if (grupoSelected > 0 ) {
    //   this.isPlanVisible = true;
    //   const grupos = this.selectedGrupos.filter(c => {
    //     return c.id === Number(grupoSelected);
    //   });
    //   grupos[0]['grupoEstudiantes'].forEach(element => {
    //     this.planificacionEstudiante.push(
    //       this.fb.group({
    //         estudianteID: element['estudianteID'],
    //         nombre: element['estudiante'].nombre + ' ' + element['estudiante'].apellidoPat + ' ' + element['estudiante'].apellidoMat,
    //         evaluacionID: 0,
    //         valor: 0
    //       })
    //     );
    //   });
    // }

  }

  get pc(): FormArray {
    return this.planificacionDetalleForm.get('planificacionesControls') as FormArray;
  }

  get p(): any {
    return this.planificacionDetalleForm.controls;
  }

  removePlanificacion(id: number) {
    this.planificacionesControls.removeAt(id);
  }


  ngOnInit() {
    const user  = JSON.parse(localStorage.getItem('user'));
    window.scroll(0, 0);
    this.isToAdd = true;
    this.tipoUsuario =  user['tipo'];
    this.getPlanificaciones();
    // this.getPlanificacionDetalle();
    this.getCarreras();
    this.getDocentes();
    this.getHorarios();
    this.getSalones();
  }

  nSelectRows(e, grupo) {
    const activated = e.target.checked;
    grupo.get('planificacionEstudiante').controls.forEach(element => {
          element.get('activo').patchValue(activated);
        });

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

    this.loading = true;
    this.asignaturaService.getAsignaturasByCarrera(carrera.target.value).subscribe(
      (  asignaturas: Asignatura[] ) => {
        this.asignaturas = asignaturas;
        this.loading = false;
      }
    );
  }

  getHorarios() {
    this.loading = true;
    this.horarioService.getHorarios().subscribe(
      (  horarios: Horario[] ) => {
        this.horarios = horarios;
        this.loading = false;
      }
    );
  }

  getSalones() {
    this.loading = true;
    this.salonService.getSalones().subscribe(
      (  salones: Salon[] ) => {
        this.salones = salones;
        this.loading = false;
      }
    );
  }

  getDocentes() {
    this.loading = true;
    this.docenteService.getDocentesByStatus().subscribe(
      (  docentes: Docente[] ) => {
        this.docentes = docentes;
        this.loading = false;
      }
    );
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
        this.planificaciones = planificaciones;
      }
    );
  }

  getPlanificacionDetalle(id: number) {
    this.planificacionService.getPlanificacionDetalle(id).subscribe(
      (  planificacionDetalle: PlanificacionDetalle[] ) => {
        this.planificacionDetalles = planificacionDetalle;
      }
    );
  }

  getPlanificacionDetalleByGrupo(grupoID: number) {
    this.planificacionService.getPlanificacionDetalleByGrupo(grupoID).subscribe(
      (  planificacionDetalle: PlanificacionDetalle[] ) => {
        this.planificacionDetalles = planificacionDetalle;
      }
    );
  }

  addPlanificacionDetalle() {
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

  updatePlanificacionDetalle(planificacionDetalle: PlanificacionDetalle) {

     this.planificacionDetalleForm.patchValue({
      id: planificacionDetalle.id,
      planificacionID: planificacionDetalle.planificacionID,
      asignaturaID: planificacionDetalle.asignaturaID,
      grupoID: planificacionDetalle.grupoID,
      horarioID: planificacionDetalle.horarioID,
      docenteID: planificacionDetalle.docenteID,
      salonID: planificacionDetalle.salonID,
      casoEspecial: planificacionDetalle.casoEspecial,
      tutoria: planificacionDetalle.tutoria
    });
    this.disabledViews();
    this.isToUpdate = true;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
     if (this.planificacionDetalleForm.valid) {
        this.planificacionDetalles = this.prepareSavePlanificacion();
         if (this.isToAdd) {
          this.planificacionService.registerPlanificacionDetalle(this.planificacionDetalles).subscribe(() => {
            // this.getPlanificacionDetalle();
           this.planificacionDetalleForm.setControl('planificacionesControls', this.fb.array([]));
           this.getEstudiantesByGrupo();
           this.alertify.success('Planificación Actualizada Correctamente');
           this.loading = false;
          }, error => {
            this.alertify.error(error);
            this.loading = false;
          });
         }
         if (this.isToUpdate) {
           this.planificacionService.updatePlanificacionDetalle(this.planificacionDetalle, this.planificacionDetalle.id).subscribe(next => {
            // this.getPlanificacionDetalle();
            this.disabledViews();
            this.isToList = true;
           this.planificacionDetalleForm.reset(this.planificacionDetalle);
           this.alertify.success('Registro Modificado Correctamente');
           this.loading = false;
            }, error => {
              this.alertify.error(error);
              this.loading = false;
            });
         }
        // this.rebuildForm();
      } else {
      this.alertify.error('Complete toda la información para poder Continuar');
    }
  }

  onDeleted(planificacion: FormArray, i: number) {
    console.log(planificacion);
    this.alertify.confirm('Desea Eliminar el Planificacion: ?', () => {
      this.planificacionService.deletePlanificacionDetalle(planificacion.get('id').value).subscribe(() => {
        this.alertify.success('La Planificacion ha sido Eliminada');
        this.planificacionesControls.removeAt(i);
        // this.getEstudiantesByGrupo();
      }, error => {
        this.alertify.error('Error al Eliminar la Planificacion');
      });
    });
  }

  prepareSavePlanificacion(): PlanificacionDetalle[] {
    const formModel = this.planificacionDetalleForm.value;
    const planificacionDeepCopy: PlanificacionDetalle[] = formModel.planificacionesControls
    .map((planificacion: PlanificacionDetalle) =>
    Object.assign({}, planificacion)
  );
    const savePlanificacion: PlanificacionDetalle = {
      id: planificacionDeepCopy[0].id as number,
      asignaturaID: planificacionDeepCopy[0].asignaturaID as number,
      grupoID: planificacionDeepCopy[0].grupoID as number,
      horarioID: planificacionDeepCopy[0].horarioID as number,
      docenteID: planificacionDeepCopy[0].docenteID as number,
      planificacionID: planificacionDeepCopy[0].planificacionID as number,
      salonID: planificacionDeepCopy[0].salonID as number,
      tutoria: planificacionDeepCopy[0].tutoria as boolean,
      casoEspecial: planificacionDeepCopy[0].casoEspecial as boolean,
      planificacionEstudiante: planificacionDeepCopy[0].planificacionEstudiante
    };
      return planificacionDeepCopy;
  }



}

