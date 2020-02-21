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
import { EvaluacionService } from '../../_services/evaluacion.service';
import { Evaluacion } from '../../models/evaluacion';
import { Carrera } from 'src/app/models/carrera';
import { DateformatPipe } from 'src/app/shared/pipes/dateformat.pipe';
import { EvaluacionEvaluacion } from 'src/app/models/evaluacionEvaluacion';
import { Grupo } from 'src/app/models/grupo';
import { Horario } from 'src/app/models/horario';
import { Docente } from 'src/app/models/docente';
import { Salon } from 'src/app/models/salon';
import { Asignatura } from 'src/app/models/asignatura';
import { EvaluacionEstudiante } from 'src/app/models/evaluacionEstudiante';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-evaluacion-evaluacion',
  templateUrl: './evaluacion-evaluacion.component.html',
  styleUrls: ['./evaluacion-evaluacion.component.scss'],
  animations: [routerTransition()]
})

export class EvaluacionEvaluacionComponent  implements OnInit {


  public evaluacionEvaluacion: EvaluacionEvaluacion;
  public evaluacionEvaluaciones: EvaluacionEvaluacion[];
  public evaluaciones: Evaluacion[];
  public carreras: Carrera[];
  public grupos: Grupo[];
  public selectedGrupos;
  public horarios: Horario[];
  public docentes: Docente[];
  public salones: Salon[];
  public asignaturas: Asignatura[];
  evaluacionEvaluacionForm: FormGroup;
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
    private evaluacionService: EvaluacionService,
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
    private dateFormat: DateformatPipe
  ) {
      this.createForm();
    }

  createForm() {
    this.evaluacionEvaluacionForm = this.fb.group({
      planificacionEvaluacion:  ['', Validators.required],
      evaluacionesControls: this.fb.array([])
    });
  }


  initEvaluacionesControls() {
    this.evaluacionesControls.push(
    this.fb.group({
      estudianteID: ['', Validators.required],
      evaluacionID: ['', Validators.required],
      evaluacionDetalleID: ['', Validators.required],
      valor: [0, Validators.required]
    })
    );
  }

  get evaluacionesControls(): FormArray {
    return this.evaluacionEvaluacionForm.get('evaluacionesControls') as FormArray;
  }

  addEvaluacion() {
    this.submitted = true;
    if (this.evaluacionEvaluacionForm.valid) {
        this.evaluacionesControls.push(
          this.fb.group({
            id: 0,
            grupoID: this.evaluacionEvaluacionForm.get('grupoID').value,
            evaluacionID: this.evaluacionEvaluacionForm.get('evaluacionID').value,
            horarioID: ['', Validators.required],
            docenteID: ['', Validators.required],
            salonID: ['', Validators.required],
            asignaturaID: ['', Validators.required],
            casoEspecial: false,
            tutoria: false,
          })
        );
    } else {
      this.alertify.error('Complete toda la información para poder Continuar');
    }
  }

  initEvaluacionEstudiante() {
    const arr = new FormArray([]);
    const grupoSelected =   this.evaluacionEvaluacionForm.get('grupoID').value;
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

    const grupoSelected =   this.evaluacionEvaluacionForm.get('grupoID').value;
    if (grupoSelected > 0 ) {
      this.evaluacionService.getEvaluacionEvaluacionByGrupo(grupoSelected).subscribe(
        (  evaluacionEvaluacion: EvaluacionEvaluacion[] ) => {
          this.evaluacionEvaluaciones = evaluacionEvaluacion;
          if (this.evaluacionEvaluaciones.length > 0 ) {
            // const plan = evaluacionEvaluacion.map(EvaluacionEvaluacion => this.fb.group(EvaluacionEvaluacion));
            // const planFormArray = this.fb.array(plan);
            // this.evaluacionEvaluacionForm.setControl('evaluacionesControls', planFormArray);

            const grupos = this.selectedGrupos.filter(c => {
              return c.id === Number(grupoSelected);
            });

            evaluacionEvaluacion.forEach( plan => {

              const arr = new FormArray([]);
              plan.evaluacionEstudiante.forEach(element => {
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
              this.evaluacionesControls.push(
                this.fb.group({
                  id: plan.id,
                  grupoID: plan.grupoID,
                  evaluacionID: plan.evaluacionID,
                  horarioID: plan.horarioID,
                  docenteID: plan.docenteID,
                  salonID: plan.salonID,
                  asignaturaID: plan.asignaturaID,
                  casoEspecial: plan.casoEspecial,
                  tutoria: plan.tutoria,
                  evaluacionEstudiante:  arr
                })
              );
            });
          } else {
            this.evaluacionEvaluacionForm.setControl('evaluacionesControls', this.fb.array([]));
          }
        }
      );

      this.isPlanVisible = true;
    }

    // const grupoSelected =   this.evaluacionEvaluacionForm.get('grupoID').value;
    // if (grupoSelected > 0 ) {
    //   this.isPlanVisible = true;
    //   const grupos = this.selectedGrupos.filter(c => {
    //     return c.id === Number(grupoSelected);
    //   });
    //   grupos[0]['grupoEstudiantes'].forEach(element => {
    //     this.evaluacionEstudiante.push(
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
    return this.evaluacionEvaluacionForm.get('evaluacionesControls') as FormArray;
  }

  get p(): any {
    return this.evaluacionEvaluacionForm.controls;
  }

  removeEvaluacion(id: number) {
    this.evaluacionesControls.removeAt(id);
  }


  ngOnInit() {
    const user  = JSON.parse(localStorage.getItem('user'));
    window.scroll(0, 0);
    this.isToAdd = true;
    this.tipoUsuario =  user['tipo'];
    this.getEvaluaciones();
    // this.getEvaluacionEvaluacion();
    this.getCarreras();
    this.getDocentes();
    this.getHorarios();
    this.getSalones();
  }

  nSelectRows(e, grupo) {
    const activated = e.target.checked;
    grupo.get('evaluacionEstudiante').controls.forEach(element => {
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

  getEvaluaciones() {
    this.evaluacionService.getEvaluaciones().subscribe(
      (  evaluaciones: Evaluacion[] ) => {
        this.evaluaciones = evaluaciones;
      }
    );
  }

  getEvaluacionEvaluacion(id: number) {
    this.evaluacionService.getEvaluacionEvaluacion(id).subscribe(
      (  evaluacionEvaluacion: EvaluacionEvaluacion[] ) => {
        this.evaluacionEvaluaciones = evaluacionEvaluacion;
      }
    );
  }

  getEvaluacionEvaluacionByGrupo(grupoID: number) {
    this.evaluacionService.getEvaluacionEvaluacionByGrupo(grupoID).subscribe(
      (  evaluacionEvaluacion: EvaluacionEvaluacion[] ) => {
        this.evaluacionEvaluaciones = evaluacionEvaluacion;
      }
    );
  }

  addEvaluacionEvaluacion() {
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
//        this.router.navigate(['/evaluaciones']);
    this.disabledViews();
    this.isToList = true;
  }

  updateEvaluacionEvaluacion(evaluacionEvaluacion: EvaluacionEvaluacion) {

     this.evaluacionEvaluacionForm.patchValue({
      id: evaluacionEvaluacion.id,
      evaluacionID: evaluacionEvaluacion.evaluacionID,
      asignaturaID: evaluacionEvaluacion.asignaturaID,
      grupoID: evaluacionEvaluacion.grupoID,
      horarioID: evaluacionEvaluacion.horarioID,
      docenteID: evaluacionEvaluacion.docenteID,
      salonID: evaluacionEvaluacion.salonID,
      casoEspecial: evaluacionEvaluacion.casoEspecial,
      tutoria: evaluacionEvaluacion.tutoria
    });
    this.disabledViews();
    this.isToUpdate = true;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
     if (this.evaluacionEvaluacionForm.valid) {
        this.evaluacionEvaluaciones = this.prepareSaveEvaluacion();
         if (this.isToAdd) {
          this.evaluacionService.registerEvaluacionEvaluacion(this.evaluacionEvaluaciones).subscribe(() => {
            // this.getEvaluacionEvaluacion();
           this.evaluacionEvaluacionForm.setControl('evaluacionesControls', this.fb.array([]));
           this.getEstudiantesByGrupo();
           this.alertify.success('Planificación Actualizada Correctamente');
           this.loading = false;
          }, error => {
            this.alertify.error(error);
            this.loading = false;
          });
         }
         if (this.isToUpdate) {
           this.evaluacionService.updateEvaluacionEvaluacion(this.evaluacionEvaluacion, this.evaluacionEvaluacion.id).subscribe(next => {
            // this.getEvaluacionEvaluacion();
            this.disabledViews();
            this.isToList = true;
           this.evaluacionEvaluacionForm.reset(this.evaluacionEvaluacion);
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

  onDeleted(evaluacion: FormArray, i: number) {
    console.log(evaluacion);
    this.alertify.confirm('Desea Eliminar el Evaluacion: ?', () => {
      this.evaluacionService.deleteEvaluacionEvaluacion(evaluacion.get('id').value).subscribe(() => {
        this.alertify.success('La Evaluacion ha sido Eliminada');
        this.evaluacionesControls.removeAt(i);
        // this.getEstudiantesByGrupo();
      }, error => {
        this.alertify.error('Error al Eliminar la Evaluacion');
      });
    });
  }

  prepareSaveEvaluacion(): EvaluacionEvaluacion[] {
    const formModel = this.evaluacionEvaluacionForm.value;
    const evaluacionDeepCopy: EvaluacionEvaluacion[] = formModel.evaluacionesControls
    .map((evaluacion: EvaluacionEvaluacion) =>
    Object.assign({}, evaluacion)
  );
    const saveEvaluacion: EvaluacionEvaluacion = {
      id: evaluacionDeepCopy[0].id as number,
      asignaturaID: evaluacionDeepCopy[0].asignaturaID as number,
      grupoID: evaluacionDeepCopy[0].grupoID as number,
      horarioID: evaluacionDeepCopy[0].horarioID as number,
      docenteID: evaluacionDeepCopy[0].docenteID as number,
      evaluacionID: evaluacionDeepCopy[0].evaluacionID as number,
      salonID: evaluacionDeepCopy[0].salonID as number,
      tutoria: evaluacionDeepCopy[0].tutoria as boolean,
      casoEspecial: evaluacionDeepCopy[0].casoEspecial as boolean,
      evaluacionEstudiante: evaluacionDeepCopy[0].evaluacionEstudiante
    };
      return evaluacionDeepCopy;
  }



}

