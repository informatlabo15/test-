import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AlertifyService } from '../../_services/alertify.service';
import { CarreraService } from 'src/app/_services/carrera.service';
import { PlanificacionService } from '../../_services/planificacion.service';
import { Planificacion } from '../../models/planificacion';
import { Carrera } from 'src/app/models/carrera';

@Component({
  selector: 'app-planificaciones',
  templateUrl: './planificaciones.component.html',
  styleUrls: ['./planificaciones.component.scss'],
  animations: [routerTransition()]
})

export class PlanificacionesComponent implements OnInit {


  public planificacion: Planificacion;
  public planificaciones: Planificacion[];
  public carreras: Carrera[];
  planificacionForm: FormGroup;
  public tipoUsuario: number;
  public isToAdd: boolean;
  public isToUpdate: boolean;
  public isToList: boolean;
  public loading = false;

  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'nombre';
  public sortOrder = 'asc';
  submitted = false;
  constructor(
    private planificacionService: PlanificacionService,
    private carreraService: CarreraService,
    private fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private location: Location
  ) {
      this.createForm();
    }

  createForm() {
    this.planificacionForm = this.fb.group({
      id: 0,
      nombre: ['', Validators.required],
      estado: true,
      subPeriodoID: ['', Validators.required],
      periodoID: ['', Validators.required]
    });
  }

  get g(): any {
    return this.planificacionForm.controls;
  }

  ngOnInit() {
    const user  = JSON.parse(localStorage.getItem('user'));
    window.scroll(0, 0);
    this.isToList = true;
    this.tipoUsuario =  user['tipo'];
    this.getPlanificaciones();
    if (this.tipoUsuario === 3 || this.tipoUsuario === 4) {
      this.getCarrerasByDecano();
    } else {
      this.getCarreras();
    }
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
  getCarrerasByDecano() {
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

  getPlanificaciones() {
    this.planificacionService.getPlanificaciones().subscribe(
      (  planificaciones: Planificacion[] ) => {
        this.planificaciones = planificaciones;
      }
    );
  }

  addPlanificacion() {
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

  updatePlanificacion(planificacion: Planificacion) {

     this.planificacionForm.patchValue({
      id: planificacion.id,
      nombre: planificacion.nombre,
      codigo: planificacion.codigo,
      carreraID: planificacion.carreraID,
      periodo: planificacion.periodoID,
      activo: planificacion.activo
    });
    this.disabledViews();
    this.isToUpdate = true;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
     if (this.planificacionForm.valid) {
        this.planificacion = this.prepareSavePlanificacion();
         if (this.isToAdd) {
          this.planificacionService.register(this.planificacion).subscribe(() => {
            this.getPlanificaciones();
            this.disabledViews();
            this.isToList = true;
            this.planificacionForm.reset(this.planificacion);
           this.alertify.success('Registro Agregado Correctamente');
           this.loading = false;
          }, error => {
            this.alertify.error(error);
            this.loading = false;
          });
         }
         if (this.isToUpdate) {
           this.planificacionService.update(this.planificacion, this.planificacion.id).subscribe(next => {
            this.getPlanificaciones();
            this.disabledViews();
            this.isToList = true;
           this.planificacionForm.reset(this.planificacion);
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

  onDeleted(planificacion: Planificacion) {
    this.alertify.confirm('Desea Eliminar el Planificacion: ' + planificacion.nombre + '?', () => {
      this.planificacionService.delete(planificacion.id).subscribe(() => {
        this.alertify.success('El Planificacion ha sido Eliminada');
        this.planificacionForm.reset();
        this.getPlanificaciones();
        this.disabledViews();
        this.isToList = true;
        this.planificacionForm.reset();
      }, error => {
        this.alertify.error('Error al Eliminar el Planificacion');
      });
    });
  }

  prepareSavePlanificacion(): Planificacion {
    const formModel = this.planificacionForm.value;

    const savePlanificacion: Planificacion = {
      id: formModel.id as number,
      nombre: formModel.nombre as string,
      codigo: formModel.codigo as string,
      estado: formModel.estado as boolean,
      activo: formModel.activo as boolean,
      carreraID: formModel.carreraID as number,
      periodoID: formModel.periodoID as number
    };
      return savePlanificacion;
  }



}
