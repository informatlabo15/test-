import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AlertifyService } from '../../_services/alertify.service';

import { FacultadService } from '../../_services/facultad.service';
import { Facultad } from '../../models/facultad';

@Component({
  selector: 'app-facultades',
  templateUrl: './facultades.component.html',
  styleUrls: ['./facultades.component.scss'],
   animations: [routerTransition()]
})
export class FacultadesComponent implements OnInit {

  public facultad: Facultad;
  public facultades: Facultad[];
  facultadForm: FormGroup;
  public isToAdd: boolean;
  public isToUpdate: boolean;
  public isToList: boolean;


  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'nombre';
  public sortOrder = 'asc';

  constructor(
    private facultadService: FacultadService,
    private fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private location: Location
  ) {
      this.createForm();
    }

  createForm() {
    this.facultadForm = this.fb.group({
      id: 1,
      nombre: ['', Validators.required],
      descripcion: '',
      estado: true,
      coordinador: 1
    });
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.isToList = true;
    this.getFacultades();
  }

  getFacultades() {
    this.facultadService.getFacultades().subscribe(
      (  facultades: Facultad[] ) => {
        this.facultades = facultades;
      }
    );
  }

  addFacultad() {
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
//        this.router.navigate(['/facultades']);
    this.disabledViews();
    this.isToList = true;
  }

  updateFacultad(facultad: Facultad) {
     this.facultadForm.patchValue({
      id: facultad.id,
      nombre: facultad.nombre,
      descripcion: facultad.descripcion,
      coordinador: facultad.coordinador,
      estado: facultad.estado
    });
    this.disabledViews();
    this.isToUpdate = true;
  }

  onSubmit() {
     if (this.facultadForm.valid) {
        this.facultad = this.prepareSaveFacultad();
         if (this.isToAdd) {
          this.facultadService.register(this.facultad).subscribe(() => {
            this.getFacultades();
            this.disabledViews();
            this.isToList = true;
            this.facultadForm.reset(this.facultad);
           this.alertify.success('Registro Agregado Correctamente');
          }, error => {
            this.alertify.error(error);
          });
         }
         if (this.isToUpdate) {
           this.facultadService.update(this.facultad, this.facultad.id).subscribe(next => {
            this.getFacultades();
            this.disabledViews();
            this.isToList = true;
           this.facultadForm.reset(this.facultad);
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

  onDeleted(facultad: Facultad) {
    this.alertify.confirm('Desea Eliminar la Facultad: ' + facultad.nombre + '?', () => {
      this.facultadService.delete(facultad.id).subscribe(() => {
        this.alertify.success('La Facultad ha sido Eliminada');
        this.facultadForm.reset();
        this.getFacultades();
        this.disabledViews();
        this.isToList = true;
        this.facultadForm.reset();
      }, error => {
        this.alertify.error('Error al Eliminar la Facultad');
      });
    });
  }

  prepareSaveFacultad(): Facultad {
    const formModel = this.facultadForm.value;

    const saveFacultad: Facultad = {
      id: formModel.id as number,
      nombre: formModel.nombre as string,
      descripcion: formModel.descripcion as string,
      estado: formModel.estado as boolean,
      coordinador: formModel.coordinador as number
    };
      return saveFacultad;
  }



}
