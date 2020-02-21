import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AlertifyService } from '../../_services/alertify.service';
import { CarreraService } from 'src/app/_services/carrera.service';
import { HorarioService } from '../../_services/horario.service';
import { Horario } from '../../models/horario';
import { Carrera } from 'src/app/models/carrera';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.scss'],
  animations: [routerTransition()]
})

export class HorariosComponent implements OnInit {

  public horario: Horario;
  public horarios: Horario[];
  public carreras: Carrera[];
  horarioForm: FormGroup;
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
    private horarioService: HorarioService,
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
    this.horarioForm = this.fb.group({
      id: 0,
      nombre: ['', Validators.required],
      horaEntrada: '',
      horaSalida: '',
      estado: true
    });
  }

  get s(): any {
    return this.horarioForm.controls;
  }

  ngOnInit() {
    const user  = JSON.parse(localStorage.getItem('user'));
    window.scroll(0, 0);
    this.isToList = true;
    this.tipoUsuario =  user['tipo'];
    this.getHorarios();
  }

  getHorarios() {
    this.horarioService.getHorarios().subscribe(
      (  horarios: Horario[] ) => {
        this.horarios = horarios;
      }
    );
  }

  addHorario() {
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
//        this.router.navigate(['/horarios']);
    this.disabledViews();
    this.isToList = true;
  }

  updateHorario(horario: Horario) {

     this.horarioForm.patchValue({
      id: horario.id,
      nombre: horario.nombre,
      ubicacion: horario.ubicacion,
      observacion: horario.observacion,
      estado: horario.estado
    });
    this.disabledViews();
    this.isToUpdate = true;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
     if (this.horarioForm.valid) {
        this.horario = this.prepareSaveHorario();
         if (this.isToAdd) {
          this.horarioService.register(this.horario).subscribe(() => {
            this.getHorarios();
            this.disabledViews();
            this.isToList = true;
            this.horarioForm.reset(this.horario);
           this.alertify.success('Registro Agregado Correctamente');
           this.loading = false;
          }, error => {
            this.alertify.error(error);
            this.loading = false;
          });
         }
         if (this.isToUpdate) {
           this.horarioService.update(this.horario, this.horario.id).subscribe(next => {
            this.getHorarios();
            this.disabledViews();
            this.isToList = true;
           this.horarioForm.reset(this.horario);
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

  onDeleted(horario: Horario) {
    this.alertify.confirm('Desea Eliminar el Horario: ' + horario.nombre + '?', () => {
      this.horarioService.delete(horario.id).subscribe(() => {
        this.alertify.success('El Horario ha sido Eliminada');
        this.horarioForm.reset();
        this.getHorarios();
        this.disabledViews();
        this.isToList = true;
        this.horarioForm.reset();
      }, error => {
        this.alertify.error('Error al Eliminar el Horario');
      });
    });
  }

  prepareSaveHorario(): Horario {
    const formModel = this.horarioForm.value;

    const saveHorario: Horario = {
      id: formModel.id as number,
      nombre: formModel.nombre as string,
      ubicacion: formModel.ubicacion as string,
      estado: formModel.estado as boolean,
      observacion: formModel.observacion as string
    };
      return saveHorario;
  }



}
