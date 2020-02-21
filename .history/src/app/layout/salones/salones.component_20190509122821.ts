import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AlertifyService } from '../../_services/alertify.service';
import { CarreraService } from 'src/app/_services/carrera.service';
import { SalonService } from '../../_services/salon.service';
import { Salon } from '../../models/salon';
import { Carrera } from 'src/app/models/carrera';

@Component({
  selector: 'app-salones',
  templateUrl: './salones.component.html',
  styleUrls: ['./salones.component.scss'],
  animations: [routerTransition()]
})

export class SalonesComponent implements OnInit {

  public salon: Salon;
  public salones: Salon[];
  public carreras: Carrera[];
  salonForm: FormGroup;
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
    private salonService: SalonService,
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
    this.salonForm = this.fb.group({
      id: 0,
      nombre: ['', Validators.required],
      ubicacion: '',
      observacion: '',
      estado: true
    });
  }

  get s(): any {
    return this.salonForm.controls;
  }

  ngOnInit() {
    const user  = JSON.parse(localStorage.getItem('user'));
    window.scroll(0, 0);
    this.isToList = true;
    this.tipoUsuario =  user['tipo'];
    this.getSalones();
  }

  getSalones() {
    this.salonService.getSalones().subscribe(
      (  salones: Salon[] ) => {
        this.salones = salones;
      }
    );
  }

  addSalon() {
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
//        this.router.navigate(['/salones']);
    this.disabledViews();
    this.isToList = true;
  }

  updateSalon(salon: Salon) {

     this.salonForm.patchValue({
      id: salon.id,
      nombre: salon.nombre,
      ubicacion: salon.ubicacion,
      observacion: salon.observacion,
      estado: salon.estado
    });
    this.disabledViews();
    this.isToUpdate = true;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
     if (this.salonForm.valid) {
        this.salon = this.prepareSaveSalon();
         if (this.isToAdd) {
          this.salonService.register(this.salon).subscribe(() => {
            this.getSalones();
            this.disabledViews();
            this.isToList = true;
            this.salonForm.reset(this.salon);
           this.alertify.success('Registro Agregado Correctamente');
           this.loading = false;
          }, error => {
            this.alertify.error(error);
            this.loading = false;
          });
         }
         if (this.isToUpdate) {
           this.salonService.update(this.salon, this.salon.id).subscribe(next => {
            this.getSalones();
            this.disabledViews();
            this.isToList = true;
           this.salonForm.reset(this.salon);
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

  onDeleted(salon: Salon) {
    this.alertify.confirm('Desea Eliminar el Salon: ' + salon.nombre + '?', () => {
      this.salonService.delete(salon.id).subscribe(() => {
        this.alertify.success('El Salon ha sido Eliminada');
        this.salonForm.reset();
        this.getSalones();
        this.disabledViews();
        this.isToList = true;
        this.salonForm.reset();
      }, error => {
        this.alertify.error('Error al Eliminar el Salon');
      });
    });
  }

  prepareSaveSalon(): Salon {
    const formModel = this.salonForm.value;

    const saveSalon: Salon = {
      id: formModel.id as number,
      nombre: formModel.nombre as string,
      codigo: formModel.codigo as string,
      estado: formModel.estado as boolean,
      activo: formModel.activo as boolean,
      carreraID: formModel.carreraID as number,
      periodoID: formModel.periodoID as number
    };
      return saveSalon;
  }



}
