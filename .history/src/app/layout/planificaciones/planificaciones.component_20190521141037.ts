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
import { DateformatPipe } from 'src/app/shared/pipes/dateformat.pipe';

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
    private location: Location,
    private dateFormat: DateformatPipe
  ) {
      this.createForm();
    }

  createForm() {
    this.planificacionForm = this.fb.group({
      id: 0,
      nombre: ['', Validators.required],
      estado: true,
      activo: false,
      subPeriodoID: ['', Validators.required],
      periodoID: ['', Validators.required],
      fechaInicio: '',
      fechaFin: ''
    });
  }

  get p(): any {
    return this.planificacionForm.controls;
  }

  ngOnInit() {
    const user  = JSON.parse(localStorage.getItem('user'));
    window.scroll(0, 0);
    this.isToList = true;
    this.tipoUsuario =  user['tipo'];
    // this.getPlanificaciones();

  }




}
