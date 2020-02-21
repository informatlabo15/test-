import { Component, OnInit, NgModule } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormsModule, FormGroup, FormBuilder, FormArray, Validators, FormControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AlertifyService } from '../../_services/alertify.service';
import { map, startWith } from 'rxjs/operators';

import { CarreraService } from '../../_services/carrera.service';
import { FacultadService } from '../../_services/facultad.service';
import { Carrera } from '../../models/carrera';
import { Facultad } from '../../models/facultad';
import { Docente } from 'src/app/models/docente';
import { DocenteService } from 'src/app/_services/docente.service';
import { Asignatura } from 'src/app/models/asignatura';
import { AsignaturaService } from 'src/app/_services/asignatura.service';


@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.scss'],
   animations: [routerTransition()]
})

export class CarrerasComponent implements OnInit {

  // Form Carrera
  public carrera: Carrera;
  public selectedCarreraID: number;
  public carreras: Carrera[];
  public facultades: Facultad[];
  public docentes: Docente[];
  public selectedDocente: Docente;
  carreraForm: FormGroup;

  public isToAdd: boolean;
  public isToUpdate: boolean;
  public isToList: boolean;
  submitted = false;
  public asignaturaSubmitted = false;
  public loading = false;
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'nombre';
  public sortOrder = 'asc';
  public primaryColour = '#007bff';
  public secondaryColour = '#007bff';
  public tipoUsuario: number;
  public user;

  // Form Asignatura
  public asignatura: Asignatura;
  public asignaturas: Asignatura[];
  // public selectedAsignatura: Asignatura;
  asignaturaForm: FormGroup;
  public addingAsignatura = false;
  public tienePrerequisito = false;
  public isToAdd_Asignatura = false;
  public isToUpdate_Asignatura = false;
  public isToList_Asignatura = false;

  constructor(
    private carreraService: CarreraService,
    private asignaturaService: AsignaturaService,
    private facultadService: FacultadService,
    private  docenteService: DocenteService,
    private fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private location: Location
  ) {
      this.createForm();
      this.createFormAsignatura();
    }

  createFormAsignatura() {
    this.asignaturaForm = this.fb.group({
      id: 0,
      nombre: ['', Validators.required],
      codigo: '',
      prerequisito: false,
      asignaturaID: 0,
      creditos: 0,
      presenciales: 0,
      autoestudio: 0,
      anio:  [0, Validators.required],
      area: [0, Validators.required],
      cuatrimestre: [0, Validators.required],
      turno: [0, Validators.required],
      modalidad: [0, Validators.required],
      total: 0,
      carreraID: [0, Validators.required]
    });
    this.asignaturaForm.controls['turno'].setValue('1', {onlySelf: true});
    this.asignaturaForm.controls['modalidad'].setValue('1', {onlySelf: true});

  }
  createForm() {
    this.carreraForm = this.fb.group({
      id: 0,
      nombre: ['', Validators.required],
      codigo: '',
      facultadID: [0, Validators.required],
      decano: 0,
      estado: false
    });
    // Dafault value Faculta ComboBox
     this.carreraForm.controls['facultadID'].setValue('', {onlySelf: true});
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.isToList = true;
    this.getFacultades();
    this.user  = JSON.parse(localStorage.getItem('user'));
    this.tipoUsuario =  this.user['tipo'];
    if ( this.tipoUsuario === 4) {
      this.getCarrerasByDecano();
      this.getDocentesByDecano();
    } else {
      this.getCarreras();
      this.getDocentes();
    }
  }
  getDocentesByDecano(): any {
    this.loading = true;
    const decano = this.user['docente'].id;
    this.docenteService.getDocenteByDecano(decano).subscribe(
      (  docentes: Docente ) => {
        this.selectedDocente = docentes;
        this.loading = false;
      }
    );
  }
  getCarrerasByDecano(): any {
    this.loading = true;
    const decano = this.user['docente'].id;
    this.carreraService.getCarrerasByDecano(decano).subscribe(
      (  carreras: Carrera[] ) => {
        this.carreras = carreras;
        this.loading = false;
      }
    );
  }

 get f(): any {
    return this.carreraForm.controls;
  }
  get a(): any {
    return this.asignaturaForm.controls;
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

  getDocentes() {
    this.loading = true;
    this.docenteService.getDocentes().subscribe(
      (  docentes: Docente[] ) => {
        this.docentes = docentes;
        this.loading = false;
      }
    );
  }


  getFacultades() {
    this.facultadService.getFacultades().subscribe((facultades: Facultad[]) => {
      this.facultades = facultades;
    });

  }

// Opcion ejecutada cuando se le da click al boton agregar asignatura
  addAsignatura() {
    this.disabledViewAsignaturas();
    this.isToAdd_Asignatura = true;
    this.createFormAsignatura();
   }

// Opcion ejecutada cuando se le da click al boton agregar carrera
  addCarrera() {
    this.disabledViews();
    this.createForm();
    this.isToAdd = true;
  }

  // Oculta las vista de carreras
  disabledViews() {
    this.isToAdd = false;
    this.isToList = false;
    this.isToUpdate = false;
  }

 // Oculta las vista de Asignaturas
  disabledViewAsignaturas() {
    this.isToAdd_Asignatura = false;
    this.isToList_Asignatura = false;
    this.isToUpdate_Asignatura = false;
  }

  // Muesta las vista de Listas de  Asignaturas
  showListAsignatura() {
    this.disabledViewAsignaturas();
    this.isToList_Asignatura = true;
  }


  goBack() {
//     this.location.back();
//        this.router.navigate(['/carreras']);
    this.disabledViews();
    this.isToList = true;
  }

    goBackAsignatura() {
      this.disabledViewAsignaturas();
      this.isToList_Asignatura = true;
    }

  updateCarrera(carrera: Carrera) {
     this.carreraForm.patchValue({
      id: carrera.id,
      nombre: carrera.nombre,
      codigo: carrera.codigo,
      decano: carrera.decano,
      facultadID: carrera.facultadID,
      estado: carrera.estado
    });
    this.selectedCarreraID = carrera.id;
    this.getAsignaturasByCarrera(this.selectedCarreraID);
    this.disabledViews();
    this.isToUpdate = true;
    this.isToList_Asignatura = true;
  }

  updateAsignatura(asignatura) {
    this.asignaturaForm.patchValue({
        id: asignatura.id,
        nombre: asignatura.nombre,
        codigo: asignatura.codigo,
        prerequisito: asignatura.prerequisito,
        asignaturaID: asignatura.asignaturaID,
        creditos: asignatura.creditos,
        presenciales: asignatura.presenciales,
        autoestudio: asignatura.autoestudio,
        anio: asignatura.anio,
        area: asignatura.area,
        cuatrimestre: asignatura.cuatrimestre,
        turno: asignatura.turno,
        modalidad: asignatura.modalidad,
        total: asignatura.total,
        carreraID: this.selectedCarreraID
    });
    this.disabledViewAsignaturas();
    this.isToUpdate_Asignatura = true;
  }

  onSubmit() {
    this.submitted = true;
     if (this.carreraForm.valid) {
        this.carrera = this.prepareSaveCarrera();
         if (this.isToAdd) {
          this.carreraService.register(this.carrera).subscribe(() => {
            this.getCarreras();
            this.disabledViews();
            this.isToList = true;
            this.carreraForm.reset(this.carrera);
           this.alertify.success('Carrera Agregada Correctamente');
          }, error => {
            this.alertify.error(error);
          });
         }
         if (this.isToUpdate) {
           this.carreraService.update(this.carrera, this.carrera.id).subscribe(next => {
            this.getCarreras();
            this.disabledViews();
            this.isToList = true;
           this.carreraForm.reset(this.carrera);
           this.alertify.success('Carrera Actualizada Correctamente');
            }, error => {
              this.alertify.error(error);
            });
         }
        // this.rebuildForm();
      } else {
      this.alertify.error('Complete toda la información para poder Continuar');
    }
  }

  onDeleted(carrera: Carrera) {
    this.alertify.confirm('Desea Eliminar la Carrera: ' + carrera.nombre + '?', () => {
      this.carreraService.delete(carrera.id).subscribe(() => {
        this.alertify.success('La Carrera ha sido Eliminada');
        this.carreraForm.reset();
        this.getCarreras();
        this.disabledViews();
        this.isToList = true;
        this.carreraForm.reset();
      }, error => {
        this.alertify.error('Error al Eliminar la Carrera');
      });
    });
  }

  prepareSaveCarrera(): Carrera {
    const formModel = this.carreraForm.value;

    const saveCarrera: Carrera = {
      id: formModel.id as number,
      nombre: formModel.nombre as string,
      codigo: formModel.codigo as string,
      estado: formModel.estado as boolean,
      decano: formModel.decano as number,
      facultadID: formModel.facultadID as number
    };
      return saveCarrera;
  }

  removeAsignatura(asignatura: Asignatura) {
    this.alertify.confirm('Desea Eliminar la Asignatura: ' + asignatura.nombre + '?', () => {
      this.asignaturaService.delete(asignatura.id).subscribe(() => {
        this.alertify.success('La Asignatura ha sido Eliminada');
        this.asignaturaForm.reset();
        this.getAsignaturasByCarrera(this.selectedCarreraID);
        this.disabledViewAsignaturas();
        this.isToList_Asignatura = true;
      }, error => {
        this.alertify.error('Error al Eliminar la Asignatura');
      });
    });
  }

  saveAsignatura() {
    this.asignaturaSubmitted = true;
    const form = this.asignaturaForm.value;
    const flag = false;
    if (this.asignaturaForm.valid) {
      if (!flag) {
        const formModel = this.asignaturaForm.value;
        const saveAsignatura: Asignatura = {
          id: formModel.id as number,
          nombre: formModel.nombre as string,
          codigo: formModel.codigo as string,
          prerequisito: formModel.prerequisito as boolean,
          asignaturaID: formModel.asignaturaID as number,
          creditos: formModel.creditos as number,
          presenciales: formModel.presenciales as number,
          autoestudio: formModel.autoestudio as number,
          anio: formModel.anio as number,
          area: formModel.area as number,
          cuatrimestre: formModel.cuatrimestre as number,
          turno: formModel.turno as number,
          modalidad:  formModel.modalidad as number,
          total:  formModel.total as number,
          carreraID: this.selectedCarreraID

        };
        this.asignatura = saveAsignatura;
        if (this.isToAdd_Asignatura) {
          this.asignaturaService.register(this.asignatura).subscribe(() => {
            this.getAsignaturasByCarrera(this.selectedCarreraID);
            this.disabledViewAsignaturas();
            this.isToList_Asignatura = true;
            this.asignaturaForm.reset(this.asignatura);
           this.alertify.success('Asignatura Agregada Correctamente');
          }, error => {
            this.alertify.error(error);
          });
         }
         if (this.isToUpdate_Asignatura) {
           this.asignaturaService.update(this.asignatura, this.asignatura.id).subscribe(next => {
            this.getAsignaturasByCarrera(this.selectedCarreraID);
            this.disabledViewAsignaturas();
            this.isToList_Asignatura = true;
           this.asignaturaForm.reset(this.asignatura);
           this.alertify.success('Asignatura Actualizada Correctamente');
            }, error => {
              this.alertify.error(error);
            });
         }
        this.asignaturaForm.patchValue({
          id: 0,
          nombre: '',
          codigo: '',
          prerequisito: '',
          asignaturaID: 0,
          creditos: 0,
          presenciales: 0,
          autoestudio: 0,
          anio: 0,
          area: this.asignaturaForm.controls['area'].setValue('', {onlySelf: true}),
          cuatrimestre: 0,
          turno: 0,
          modalidad:  0,
          total:  0,
          carreraID:  0
        });

      } else {
        this.alertify.error('No puede agregar una Asignatura con código duplicado');
      }
    } else {
      this.alertify.error('Complete la información de la Asignatura');
    }
  }
  nTienePrerequisito(e) {
    this.tienePrerequisito = e.target.checked;
  }

  getAsignaturas() {
    this.loading = true;
    this.asignaturaService.getAsignaturas().subscribe(
      (  asignaturas: Asignatura[] ) => {
        this.asignaturas = asignaturas;
        this.loading = false;
      }
    );
  }
  getAsignaturasByCarrera(carrera) {
    this.loading = true;
    this.asignaturaService.getAsignaturasByCarrera(carrera).subscribe(
      (  asignaturas: Asignatura[] ) => {
        this.asignaturas = asignaturas;
        this.loading = false;
      }
    );
  }


}
