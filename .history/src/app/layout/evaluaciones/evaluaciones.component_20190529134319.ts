import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AlertifyService } from '../../_services/alertify.service';

import { EvaluacionService } from '../../_services/evaluacion.service';
import { Evaluacion } from '../../models/evaluacion';

@Component({
  selector: 'app-evaluaciones',
  templateUrl: './evaluaciones.component.html',
  styleUrls: ['./evaluaciones.component.scss'],
  animations: [routerTransition()]
})
export class EvaluacionesComponent implements OnInit {

  public evaluacion: Evaluacion;
  public evaluaciones: Evaluacion[];
  evaluacionForm: FormGroup;
  public isToAdd: boolean;
  public isToUpdate: boolean;
  public isToList: boolean;
   loading = false;
  submitted = false;

  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'nombre';
  public sortOrder = 'asc';

  constructor(
    private evaluacionService: EvaluacionService,
    private fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private location: Location

  ) {
      this.createForm();
    }

  createForm() {
    this.evaluacionForm = this.fb.group({
      id: 1,
      nombre: ['', Validators.required],
      tipoEvaluacion: 0,
      valor: 0,
      valorAsignador: 0
    });
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.isToList = true;
    this.getEvaluaciones();
  }

  getEvaluaciones() {
    this.loading = true;
    this.evaluacionService.getEvaluaciones().subscribe(
      (  evaluaciones: Evaluacion[] ) => {
        this.evaluaciones = evaluaciones;
        this.loading = false;
      }
    );
  }

  addEvaluacion() {
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

  updateEvaluacion(evaluacion: Evaluacion) {
     this.evaluacionForm.patchValue({
      id: evaluacion.id,
      nombre: evaluacion.nombre,
      tipoEvaluacion: evaluacion.tipoEvaluacion,
      valor: evaluacion.valor,
      valorAsignado: evaluacion.valorAsignado
    });
    this.disabledViews();
    this.isToUpdate = true;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
     if (this.evaluacionForm.valid) {
        this.evaluacion = this.prepareSaveEvaluacion();
         if (this.isToAdd) {
          this.evaluacionService.register(this.evaluacion).subscribe(() => {
            this.getEvaluaciones();
            this.disabledViews();
            this.isToList = true;
            this.evaluacionForm.reset(this.evaluacion);
            this.loading = false;
           this.alertify.success('Registro Agregado Correctamente');
          }, error => {
            this.alertify.error(error);
          });
         }
         if (this.isToUpdate) {
           this.evaluacionService.update(this.evaluacion, this.evaluacion.id).subscribe(next => {
            this.getEvaluaciones();
            this.disabledViews();
            this.isToList = true;
            this.loading = false;
           this.evaluacionForm.reset(this.evaluacion);
           this.alertify.success('Registro Modificado Correctamente');
            }, error => {
              this.alertify.error(error);
            });
         }
        // this.rebuildForm();
      } else {
      this.alertify.error('Complete toda la información para poder Continuar');
    }
  }

  onDeleted(evaluacion: Evaluacion) {
    this.alertify.confirm('Desea Eliminar la Evaluacion: ' + evaluacion.nombre + '?', () => {
      this.evaluacionService.delete(evaluacion.id).subscribe(() => {
        this.alertify.success('La Evaluacion ha sido Eliminada');
        this.evaluacionForm.reset();
        this.getEvaluaciones();
        this.disabledViews();
        this.isToList = true;
        this.evaluacionForm.reset();
      }, error => {
        this.alertify.error('Error al Eliminar la Evaluacion');
      });
    });
  }

  prepareSaveEvaluacion(): Evaluacion {
    const formModel = this.evaluacionForm.value;

    const saveEvaluacion: Evaluacion = {
      id: formModel.id as number,
      nombre: formModel.nombre as string,
      tipoEvaluacion: 0,
      valor: formModel.valor as number,
      valorAsignado: 0
    };
      return saveEvaluacion;
  }


}
