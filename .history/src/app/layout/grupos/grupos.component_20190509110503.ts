import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AlertifyService } from '../../_services/alertify.service';
import { CarreraService } from 'src/app/_services/carrera.service';
import { GrupoService } from '../../_services/grupo.service';
import { Grupo } from '../../models/grupo';
import { Carrera } from 'src/app/models/carrera';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss'],
  animations: [routerTransition()]
})

export class GruposComponent implements OnInit {


  public grupo: Grupo;
  public grupos: Grupo[];
  public carreras: Carrera[];
  grupoForm: FormGroup;
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
    private grupoService: GrupoService,
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
    this.grupoForm = this.fb.group({
      id: 0,
      nombre: ['', Validators.required],
      codigo: '',
      estado: true,
      activo: true,
      carreraID: ['', Validators.required],
      periodoID: [0, Validators.required]
    });
  }

  get g(): any {
    return this.grupoForm.controls;
  }

  ngOnInit() {
    const user  = JSON.parse(localStorage.getItem('user'));
    window.scroll(0, 0);
    this.isToList = true;
    this.tipoUsuario =  user['tipo'];
    this.getGrupos();
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

  getGrupos() {
    this.grupoService.getGrupos().subscribe(
      (  grupos: Grupo[] ) => {
        this.grupos = grupos;
      }
    );
  }

  addGrupo() {
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
//        this.router.navigate(['/grupos']);
    this.disabledViews();
    this.isToList = true;
  }

  updateGrupo(grupo: Grupo) {

     this.grupoForm.patchValue({
      id: grupo.id,
      nombre: grupo.nombre,
      codigo: grupo.codigo,
      carreraID: grupo.carreraID,
      periodo: grupo.periodoID,
      activo: grupo.activo
    });
    this.disabledViews();
    this.isToUpdate = true;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
     if (this.grupoForm.valid) {
        this.grupo = this.prepareSaveGrupo();
         if (this.isToAdd) {
          this.grupoService.register(this.grupo).subscribe(() => {
            this.getGrupos();
            this.disabledViews();
            this.isToList = true;
            this.grupoForm.reset(this.grupo);
           this.alertify.success('Registro Agregado Correctamente');
          }, error => {
            this.alertify.error(error);
            this.loading = false;
          });
         }
         if (this.isToUpdate) {
           this.grupoService.update(this.grupo, this.grupo.id).subscribe(next => {
            this.getGrupos();
            this.disabledViews();
            this.isToList = true;
           this.grupoForm.reset(this.grupo);
           this.alertify.success('Registro Modificado Correctamente');
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

  onDeleted(grupo: Grupo) {
    this.alertify.confirm('Desea Eliminar el Grupo: ' + grupo.nombre + '?', () => {
      this.grupoService.delete(grupo.id).subscribe(() => {
        this.alertify.success('El Grupo ha sido Eliminada');
        this.grupoForm.reset();
        this.getGrupos();
        this.disabledViews();
        this.isToList = true;
        this.grupoForm.reset();
      }, error => {
        this.alertify.error('Error al Eliminar el Grupo');
      });
    });
  }

  prepareSaveGrupo(): Grupo {
    const formModel = this.grupoForm.value;

    const saveGrupo: Grupo = {
      id: formModel.id as number,
      nombre: formModel.nombre as string,
      codigo: formModel.codigo as string,
      estado: formModel.estado as boolean,
      activo: formModel.activo as boolean,
      carreraID: formModel.carreraID as number,
      periodoID: formModel.periodoID as number
    };
      return saveGrupo;
  }



}
