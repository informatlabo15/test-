import { Component, OnInit, Input } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Estudiante } from 'src/app/models/estudiante';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { EstudianteService } from 'src/app/_services/estudiante.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { DateformatPipe } from 'src/app/shared/pipes/dateformat.pipe';
import { CarreraService } from 'src/app/_services/carrera.service';
import { Carrera } from 'src/app/models/carrera';
import { User } from 'src/app/models/user';
import { DocenteService } from 'src/app/_services/docente.service';
import { Docente } from 'src/app/models/docente';
import { Grupo } from 'src/app/models/grupo';
import { GrupoService } from 'src/app/_services/grupo.service';
import { GrupoEstudiante } from 'src/app/models/grupoEstudiante';
import { CarreraToList } from 'src/app/models/carreraToList';
import { Matricula } from 'src/app/models/matricula';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss'],
  animations: [routerTransition()]
})
export class EstudiantesComponent implements OnInit {
  public estudiante: Estudiante;
  public tipoUsuario: number;
  public estudiantes: Estudiante[];
  public grupos: Grupo[];
  public carreras: Carrera[];
  public docente: Docente;
  public user: User;
  public login = JSON.parse(localStorage.getItem('user'));
  public carreraID: number;
  estudianteForm: FormGroup;
  date = new Date();
  isToAdd: boolean;
  isToList: boolean;
  isToUpdate: boolean;
  submitted = false;
   // Guarda el estado según la validación del formulario de usuarios
  public onValidarUser = false;
  onSave = false;
  ifHijo = false;
  ifTrabaja = false;
  ifBecado = false;
  ifEgresado = false;
  public isCollapsed = false;
  public loading = false;
  public primaryColour = '#007bff';
  public secondaryColour = '#007bff';
  public selectedPeriodo;
  public selectedEstudiantes;
  public selectedCarrera;
  public selectedCarreras;
  public selectedGrupos;
  constructor(
    private estudianteService: EstudianteService,
    private carreraService: CarreraService,
    private grupoService: GrupoService,
    private docenteService: DocenteService,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private alertify: AlertifyService,
    private dateFormat: DateformatPipe
  ) {
    this.createForm();
  }

  createForm() {
    this.estudianteForm = this.fb.group({
      id: 0,
      carnet: '',
      nombre: ['', Validators.required],
      apellidoPat: ['', Validators.required],
      apellidoMat: '',
      identificacion: '',
      fechaNacimiento: ['', Validators.required],
      estadoCivil: '',
      sexo: ['', Validators.required],
      edad: 0,
      trabaja: false,
      lugarTrabajo: '',
      telefonoTrabajo: '',
      religion: '',
      trabajoPastoral: '',
      foto: null,
      departamento: ['', Validators.required],
      municipio: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: '',
      celular: '',
      email: '',

      nombreMadre: '',
      viveConMadre: false,
      telefonoMadre: '',
      nombrePadre: '',
      viveConPadre: false,
      telefonoPadre: '',
      nombreConyuge: '',
      telefonoConyuge: '',
      hijo: false,
      nHijo: 0,

      partidaNacimientoOriginal: false,
      partidaNacimientoCopia: false,
      diplomaBachillerCopia: false,
      identificacionCopia: false,
      fotoCarnet: false,
      certificadoNotasOriginal: false,
      certificadoNotasCopia: false,

      beca: false,
      becadoPor: '',
      tipoBeca: '',
      incluyeMatricula: false,

      activo: false,
      observacion: '',
      fechaAlta: '',
      carreraID: 0,
      situacionAcademica: '',
      estudios: '',
      grupoEstudiantes: this.fb.array([]),
      matriculas: this.fb.array([]),
      user: this.fb.group({
        userName:  '',
        email: '',
        passwordDefault: '',
        password: '',
        passwordConfirm: '',
        fechaAlta: this.date,
        estado: 'true',
        activo: 'true'
      })
    });
  }

  createGrupoEstudiantes() {
    this.grupoEstudiantes.push(
      this.fb.group({
        grupoID: 0,
        anioEgreso: '',
        Egresado: false,
        activo: false
      })
    );
  }

  get f(): any {
    return this.estudianteForm.controls;
  }

  get grupoEstudiantes(): FormArray {
    return this.estudianteForm.get('grupoEstudiantes') as FormArray;
  }

  get matriculas(): FormArray {
    return this.estudianteForm.get('matriculas') as FormArray;
  }

  get u(): any {
    return this.estudianteForm.get('user') as FormArray;
 }

  nhijosVisible(e) {
    this.ifHijo = e.target.checked;
  }

  nTrabajaVisible(e) {
    this.ifTrabaja = e.target.checked;
  }
  nEgresado(e) {
    this.ifEgresado = e.target.checked;
  }

  nBecado(e) {
    this.ifBecado = e.target.checked;
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

  getEstudianteByCarrera(e) {
    this.selectedCarrera = e.target.value;
    this.getEstudiantesByCarrera(e.target.value);
  }

  getEstudianteByIngreso(periodo) {

    // this.estudianteService.getEstudiantesByCarrera_Periodo(this.selectedCarrera, periodo.target.value).subscribe(
    //   (  estudiante: Estudiante[] ) => {
    //     this.estudiantes = estudiante;
    //   }
    // );
  //  this.selectedEstudiantes = this.estudiantes.filter(estudiante => {
  //     return estudiante.periodoID === Number(periodo.target.value);
  //   });

   }


  ngOnInit() {
    const user  = JSON.parse(localStorage.getItem('user'));
    window.scrollTo(0, 0);
    this.isToList = true;
    this.tipoUsuario =  user['tipo'];
    if (this.tipoUsuario === 4) {
      this.getCarrerasByDecano();
    } else {
      this.getEstudiantes();
      this.getCarreras();
      this.getGrupos();
    }
  }

  getDocenteByUser(user: number) {
    this.docenteService.getDocenteByUser(user).subscribe(
      (  docente: Docente ) => {
        this.docente = docente;

      }
    );
  }

  getEstudiantesByCarrera(carreraId) {
    this.estudianteService.getEstudiantesByCarrera(carreraId).subscribe(
      (  estudiante: Estudiante[] ) => {
        this.estudiantes = estudiante;
        this.selectedEstudiantes = estudiante;
      }
    );
  }

  getEstudianteByGrupo(grupoId) {
      if (this.tipoUsuario === 1 || this.tipoUsuario === 3) {
      this.selectedEstudiantes = this.estudiantes.filter(estudiante => {
        if (estudiante.grupoEstudiante.filter(grupo => {
           return  grupo.grupoID === Number(grupoId.target.value);
        }).length > 0) {
          return estudiante;
        }
      });
      } else {
      this.estudianteService.getEstudiantesByGrupo(grupoId.target.value).subscribe(
        (  estudiante: Estudiante[] ) => {
          this.estudiantes = estudiante;
          this.selectedEstudiantes = estudiante;
        }
      );
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

  getGrupos() {
    this.loading = true;
    this.grupoService.getGrupos().subscribe(
      (  grupos: Grupo[] ) => {
        this.grupos = grupos;
        this.selectedGrupos = grupos;
        this.loading = false;
      }
    );
  }

  getCarrerasByDecano() {
    this.loading = true;
    const user  = JSON.parse(localStorage.getItem('user'));
    const decano = user['docente'].id;
    this.carreraService.getCarrerasByDecano(decano).subscribe(
      (  carreras: CarreraToList[] ) => {
        this.carreras = carreras;
        const grupos: Grupo[] = [];
        if (carreras.length > 0) {
          carreras.forEach(carrera => {
            if (carrera.grupos.length > 0 ) {
              carrera.grupos.forEach(grupo => {
                 grupos.push({
                  id: grupo.id,
                  activo: grupo.activo,
                  nombre: grupo.nombre,
                  codigo: grupo.codigo,
                  estado: grupo.estado,
                  periodoID: grupo.periodoID,
                  carreraID: grupo.carreraID,
                  periodo: null,
                  carrera: null
                 });
              });
            }
          });
        }
        if (grupos.length > 0 ) {
          this.grupos = grupos;
        }
        this.loading = false;
      }
    );
  }

  getCarreraByGrupo(e) {


  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.estudianteForm.valid) {
      this.estudiante = this.prepareSaveEstudiante();
      if (this.isToAdd) {
        this.estudianteService.register(this.estudiante).subscribe(
          () => {
            this.getEstudiantes();
            this.disabledViews();
            this.isToList = true;
            this.estudianteForm.reset(this.estudiante);
            this.alertify.success('Registro Agregado Correctamente');
            this.loading = false;
          },
          error => {
            this.alertify.error(error);
            this.loading = false;
          }
        );
      }
      if (this.isToUpdate) {
        this.loading = true;
        this.estudianteService.update(this.estudiante, this.estudiante.id).subscribe(
          next => {
            this.getEstudiantes();
            this.disabledViews();
            this.isToList = true;
            this.estudianteForm.reset(this.estudiante);
            this.alertify.success('Registro Modificado Correctamente');
            this.loading = false;
          },
          error => {
            this.alertify.error(error);
            this.loading = false;
            this.submitted = false;
          }
        );
      }
      // this.rebuildForm();
    } else {
      this.submitted = false;
      this.loading = false;
      this.alertify.error('Complete toda la información para poder Continuar');
    }
  }

  disabledViews(): any {
    this.isToAdd = false;
    this.isToList = false;
    this.isToUpdate = false;
  }

  getEstudiantes(): any {
    if (this.tipoUsuario === 1 || this.tipoUsuario === 3) {
      this.estudianteService.getEstudiantesToList().subscribe((estudiantes: Estudiante[]) => {
        this.estudiantes = estudiantes;
        this.selectedEstudiantes = estudiantes;
      });
    } else {

    }
  }

  prepareSaveEstudiante(): Estudiante {
    const formModel = this.estudianteForm.value;
    const grupoEstudiantesDeepCopy: GrupoEstudiante[] = formModel.grupoEstudiantes.map((grupoEstudiante: GrupoEstudiante) =>
      Object.assign({}, grupoEstudiante)
    );
    const matriculasDeepCopy: Matricula[] = formModel.matriculas.map((matriculas: Matricula) =>
      Object.assign({}, matriculas)
    );

    const saveEstudiante: Estudiante = {
      id: formModel.id as number,
      carnet: formModel.carnet as string,
      nombre: formModel.nombre as string,
      apellidoPat: formModel.apellidoPat as string,
      apellidoMat: formModel.apellidoMat as string,
      identificacion: formModel.identificacion as string,
      fechaNacimiento: formModel.fechaNacimiento as Date,
      estadoCivil: formModel.estadoCivil as string,
      sexo: formModel.sexo as string,
      edad: formModel.edad as number,

      trabaja: formModel.trabaja as boolean,
      lugarTrabajo: formModel.lugarTrabajo as string,
      telefonoTrabajo: formModel.telefonoTrabajo as string,
      religion: formModel.religion as string,
      trabajoPastoral: formModel.trabajoPastoral as string,
      foto: formModel.foto as string[],
      departamento: formModel.departamento as string,
      municipio: formModel.municipio as string,
      direccion: formModel.direccion as string,
      telefono: formModel.telefono as string,
      celular: formModel.celular as string,
      email: formModel.email as string,

      nombreMadre: formModel.nombreMadre as string,
      viveConMadre: formModel.viveConMadre as boolean,
      telefonoMadre: formModel.telefonoMadre as string,
      nombrePadre: formModel.nombrePadre as string,
      viveConPadre: formModel.viveConPadre as boolean,
      telefonoPadre: formModel.telefonoPadre as string,
      nombreConyuge: formModel.nombreConyuge as string,
      telefonoConyuge: formModel.telefonoConyuge as string,
      hijo: formModel.hijo as boolean,
      nHijo: formModel.nHijo as number,

      partidaNacimientoOriginal: formModel.partidaNacimientoOriginal as boolean,
      partidaNacimientoCopia: formModel.partidaNacimientoCopia as boolean,
      diplomaBachillerCopia: formModel.diplomaBachillerCopia as boolean,
      identificacionCopia: formModel.identificacionCopia as boolean,
      fotoCarnet: formModel.fotoCarnet as boolean,
      certificadoNotasOriginal: formModel.certificadoNotasOriginal as boolean,
      certificadoNotasCopia: formModel.certificadoNotasCopia as boolean,

      beca: formModel.beca as boolean,
      becadoPor: formModel.becadoPor as string,
      tipoBeca: formModel.tipoBeca as string,
      incluyeMatricula: formModel.incluyeMatricula as boolean,

      activo: formModel.activo as boolean,
      observacion: formModel.observacion as string,
      fechaAlta: this.date,
      fechaBaja: null,
      grupoEstudiante: grupoEstudiantesDeepCopy,
      matriculas: matriculasDeepCopy,
      estudios: formModel.estudios as string,
      situacionAcademica: formModel.situacionAcademica as string
    };
    return saveEstudiante;
  }

  goBack() {
    //     this.location.back();
    //        this.router.navigate(['/facultades']);
    this.disabledViews();
    this.isToList = true;
  }

  addEstudiante() {
    this.disabledViews();
    this.createForm();
    this.isToAdd = true;
  }

  addGrupo() {
      this.grupoEstudiantes.push(
        this.fb.group({
          grupoID: 0,
          anioEgreso: '',
          egresado: false,
          activo: false
        })
      );
  }

  removeGrupo(id: number) {
    this.grupoEstudiantes.removeAt(id);
  }

  addMatricula() {
    this.matriculas.push(
      this.fb.group({
        grupoID: 0,
        estudianteID: 0,
        nuevoIngreso: false,
        recibo: '',
        fecha: '',
        anio: ''
      })
    );
  }

  removeMatricula(id: number) {
    this.matriculas.removeAt(id);
  }
  onDeleted(estudiante: Estudiante) {
    this.alertify.confirm(
      'Desea Eliminar el Estudiante: ' + estudiante.nombre + ' ' + estudiante.apellidoMat + estudiante.apellidoPat + '?',
      () => {
        this.estudianteService.delete(estudiante.id).subscribe(
          () => {
            this.alertify.success('El Estudiante se ha Eliminado');
            this.getEstudiantes();
            this.disabledViews();
            this.isToList = true;
            this.estudianteForm.reset(estudiante);
          },
          error => {
            this.alertify.error('Error al Eliminar el Estudiante');
          }
        );
      }
    );
  }
  updateEstudiante(estudianteFromList: Estudiante) {
    
   console.log(this.estudianteForm);

  // if (estudiante.grupoID > 0 ) {
  //     const grupos = this.selectedGrupos.filter(c => {
  //       return c.id === estudiante.grupoID;
  //     });
  //     this.selectedCarreras = this.carreras.filter(carrera => {
  //     return carrera.id === grupos[0]['carreraID'];
  //     });
  //   this.estudianteForm.controls['carreraID'].setValue(this.selectedCarreras[0]['id'], {onlySelf: true});
  //   }

  this.estudianteService.getEstudiante(estudianteFromList.id).subscribe((estudiante: any) => {

 
    const grupoEstudiantes = estudiante.grupoEstudiante.map(grupoEstudiantes => this.fb.group(grupoEstudiantes));
    const grupoEstudiantesFormArray = this.fb.array(grupoEstudiantes);
    this.estudianteForm.setControl('grupoEstudiantes', grupoEstudiantesFormArray);

    const matriculas = estudiante.matriculas.map(matriculas => this.fb.group(matriculas));
    const matriculasFormArray = this.fb.array(matriculas);
    this.estudianteForm.setControl('matriculas', matriculasFormArray);

    // this.userService.getUserById(estudiante.userID).subscribe((user: User) => {
    //   this.user = user;
    //   var pnombre: string = user.userName.substr(0, 2);
    //   var papellido: string = user.userName.substr(2).toUpperCase();
    //   var fechanac = new Date(estudiante.fechaNacimiento);
    //   var fechaYear =  fechanac.getFullYear();
    //   var pass =  (pnombre + papellido + fechaYear);
    //   this.u.patchValue({
    //     userName:  user.userName,
    //     email: user.email,
    //     passwordDefault: user.verificado === false ? pass : '',
    //     fechaAlta: this.date,
    //     activo: user.activo
    //   });
    // });

    this.estudianteForm.patchValue({
      id: estudiante.id,
      carnet: estudiante.carnet,
      nombre: estudiante.nombre,
      apellidoPat: estudiante.apellidoPat,
      apellidoMat: estudiante.apellidoMat,
      identificacion: estudiante.identificacion,
      // fechaNacimiento: new Date(estudiante.fechaNacimiento).toLocaleString(),
      //       fechaNacimiento: '2015-08-09',
      fechaNacimiento: this.dateFormat.transform(new Date(estudiante.fechaNacimiento)),
      estadoCivil: estudiante.estadoCivil,
      sexo: estudiante.sexo,
      edad: estudiante.edad,
      trabaja: estudiante.trabaja,
      lugarTrabajo: estudiante.lugarTrabajo,
      telefonoTrabajo: estudiante.telefonoTrabajo,
      religion: estudiante.religion,
      trabajoPastoral: estudiante.trabajoPastoral,
      foto: estudiante.foto,
      departamento: estudiante.departamento,
      municipio: estudiante.municipio,
      direccion: estudiante.direccion,
      telefono: estudiante.telefono,
      celular: estudiante.celular,
      email: estudiante.email,

      nombreMadre: estudiante.nombreMadre,
      viveConMadre: estudiante.viveConMadre,
      telefonoMadre: estudiante.telefonoMadre,
      nombrePadre: estudiante.nombrePadre,
      viveConPadre: estudiante.viveConPadre,
      telefonoPadre: estudiante.telefonoPadre,
      nombreConyuge: estudiante.nombreConyuge,
      telefonoConyuge: estudiante.telefonoConyuge,
      hijo: estudiante.hijo,
      nHijo: estudiante.nHijo,

      partidaNacimientoOriginal: estudiante.partidaNacimientoOriginal,
      partidaNacimientoCopia: estudiante.partidaNacimientoCopia,
      diplomaBachillerCopia: estudiante.diplomaBachillerCopia,
      identificacionCopia: estudiante.identificacionCopia,
      fotoCarnet: estudiante.fotoCarnet,
      certificadoNotasOriginal: estudiante.certificadoNotasOriginal,
      certificadoNotasCopia: estudiante.certificadoNotasCopia,

      beca: estudiante.beca,
      becadoPor: estudiante.becadoPor,
      tipoBeca: estudiante.tipoBeca,
      incluyeMatricula: estudiante.incluyeMatricula,

      activo: estudiante.activo,
      observacion: estudiante.observacion,
      fechaAlta: estudiante.fechaAlta,
      situacionAcademica: estudiante.situacionAcademica,
      estudios: estudiante.estudios

    });
    this.disabledViews();
    if (estudiante.hijo) {
      this.ifHijo = true;
    }
    if (estudiante.beca) {
      this.ifBecado = true;
    }
    if (estudiante.trabaja) {
      this.ifTrabaja = true;
    }

    this.isToUpdate = true;
  });
  }

  changePassword() {
    this.onValidarUser = true;
    this.u.get('userName').setValidators([Validators.required]);
    this.u.get('password').setValidators([Validators.required]);
    this.u.get('passwordConfirm').setValidators([Validators.required]);
    this.u.updateValueAndValidity();
    this.user = this.prepareSaveUser();
    // this.user = saveUser;
   if (this.estudianteForm.get('user').valid ) {
      if (this.validate_User) {
          this.userService.existPasssword(this.user, this.user.userId).subscribe(next  => {
            this.userService.updatePasssword(this.user, this.user.userId).subscribe(next => {
                this.estudianteForm.get('user').reset(this.user);
                this.alertify.success('El acceso fue modificado correctamente');
                this.onValidarUser = false;
              },
              error => {
                this.alertify.error(error);
              }
            );
          }, error => {
            this.alertify.error(error);
          }
        );
      } else {
        this.alertify.error('Las contraseñas no coinciden');
      }
    } else {
      this.alertify.error('Complete toda la información para poder Continuar');
    }
  }

  get validate_User() {
    if (this.u.get('password').value  !== this.u.get('passwordConfirm').value) {
        return false;
    }
    return true;
  }

  
  prepareSaveUser(): User {
    const formModel = this.estudianteForm.value;
    const saveUser: User = {
      userId: this.user.userId as number,
      email: this.user.email as string,
      userName: formModel.user.userName as string,
      nombre: this.user.nombre as string,
      apellidos: this.user.apellidos as string,
      password: formModel.user.password as string,
      fechaAlta: this.user.fechaAlta as Date,
      estado: this.user.estado as boolean,
      tipo: this.user.tipo as number,
      activo: this.user.activo as boolean,
      verificado: this.user.verificado
    };
    return saveUser;
  }

}
