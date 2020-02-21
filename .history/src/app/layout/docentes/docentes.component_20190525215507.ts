import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Docente } from 'src/app/models/docente';
import { DocenteDocumentos } from 'src/app/models/docenteDocumentos';
import { DocenteReferencias } from 'src/app/models/docenteReferencias';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DocenteService } from 'src/app/_services/docente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DateformatPipe } from 'src/app/shared/pipes/dateformat.pipe';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { DocenteEstudios } from 'src/app/models/docenteEstudios';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styleUrls: ['./docentes.component.scss'],
  animations: [routerTransition()]
})
export class DocentesComponent implements OnInit {
  public docente: Docente;
  public docentes: Docente[];
  public users: User[];
  public docenteDocumento: DocenteDocumentos[];
  public docenteReferencia: DocenteReferencias[];
  public docenteEstudio: DocenteEstudios[];
  public documents: any[];
  docenteForm: FormGroup;
  date = new Date();
  isToAdd: boolean;
  isToList: boolean;
  isToUpdate: boolean;
  submitted = false;
  isHijo = false;
  public loading = false;
  public primaryColour = '#007bff';
  public secondaryColour = '#007bff';
  public addingReferencia = false;

  constructor(
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
    this.docenteForm = this.fb.group({
      id: 0,
      codigo: '',
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      identificacion: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      estadoCivil: '',
      sexo: ['', Validators.required],
      edad: '',
      puesto: '',
      foto: null,
      departamento: ['', Validators.required],
      municipio: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: '',
      celular: '',
      email: ['', Validators.email],
      hijo: false,
      nHijo: 0,
      estado: false,
      userID: null,
      docenteReferencias: this.fb.array([]),
      docenteDocumentos: this.fb.array([]),
      docenteEstudios: this.fb.array([]),
      referencia: this.fb.group({
        nombre: [''],
        telefono: [''],
        lugarTrabajo: [''],
        puesto: [''],
        tipo: 0
      })
    });
    this.documents = [
      { descripcion: 'Cédula' },
      { descripcion: 'Certificado de Salud' },
      { descripcion: 'Record de Policía' },
      { descripcion: 'Cartas de Recomendación' },
      { descripcion: 'Títulos' },
      { descripcion: 'Hoja de Vida' },
      { descripcion: 'Ficha de Solicitud de Empleo' },
      { descripcion: 'Foto Tamaño Carnet' }
    ];
  }

  get f() {
    return this.docenteForm.controls;
  }
  nhijosVisible(e) {
    this.isHijo = e.target.checked;
  }
  ngOnInit() {
    this.isToList = true;
    // this.createDocenteReferencia();
    this.getDocentes();
    this.getUsers();
    this.createDocenteDocumento();
    window.scrollTo(0, 0);
  }

  getUsers() {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.docenteForm.valid) {
      this.docente = this.prepareSaveDocente();
      if (this.isToAdd) {
        this.docenteService.register(this.docente).subscribe(
          () => {
            this.getDocentes();
            this.disabledViews();
            this.isToList = true;
            this.docenteForm.reset(this.docente);
            this.alertify.success('Registro Agregado Correctamente');
          },
          error => {
            this.alertify.error(error);
          }
        );
      }
      if (this.isToUpdate) {
        this.docenteService.update(this.docente, this.docente.id).subscribe(
          next => {
            this.getDocentes();
            this.disabledViews();
            this.isToList = true;
            this.docenteForm.reset(this.docente);
            this.alertify.success('Registro Modificado Correctamente');
          },
          error => {
            this.alertify.error(error);
          }
        );
      }
      // this.rebuildForm();
    } else {
      this.alertify.error('Complete toda la información para poder Continuar');
    }
  }

  get docenteDocumentos(): FormArray {
    return this.docenteForm.get('docenteDocumentos') as FormArray;
  }
  get docenteReferencias(): FormArray {
    return this.docenteForm.get('docenteReferencias') as FormArray;
  }
  get docenteEstudios(): FormArray {
    return this.docenteForm.get('docenteEstudios') as FormArray;
  }

  createDocenteReferencia() {
    this.docenteReferencias.push(
      this.fb.group({
        nombre: '',
        telefono: '',
        lugarTrabajo: '',
        puesto: '',
        tipo: 0
      })
    );
  }
  addEstudio() {
    this.docenteEstudios.push(
      this.fb.group({
        descripcion: '',
        fecha: ''
      })
    );
  }

  showReferenciaForm(value: boolean) {
    this.addingReferencia = value;
  }

  addReferencia() {
    const form = this.docenteForm.value;
    let flag = false;
    if (this.docenteForm.get('referencia.nombre').value !== '') {
      form.docenteReferencias.forEach(element => {
        if (element.nombre === this.docenteForm.get('referencia.nombre').value) {
          flag = true;
        }
      });
      if (!flag) {
        this.docenteReferencias.push(
          this.fb.group({
            nombre: this.docenteForm.get('referencia.nombre').value,
            telefono: this.docenteForm.get('referencia.telefono').value,
            lugarTrabajo: this.docenteForm.get('referencia.lugarTrabajo').value,
            puesto: this.docenteForm.get('referencia.puesto').value,
            tipo: this.docenteForm.get('referencia.tipo').value
          })
        );
        this.docenteForm.patchValue({
          referencia: {
            nombre: '',
            telefono: '',
            lugarTrabajo: '',
            puesto: '',
            tipo: 0
          }
        });
        this.addingReferencia = false;
      } else {
        this.alertify.error('No puede agregar una referencia duplicada');
      }
    } else {
      this.alertify.error('Complete la información de la Referencia');
    }
  }

  removeReference(id: number) {
    this.docenteReferencias.removeAt(id);
  }

  removeEstudio(id: number) {
    this.docenteEstudios.removeAt(id);
  }
  createDocenteDocumento() {
    this.documents.forEach(document => {
      this.docenteDocumentos.push(
        this.fb.group({
          descripcion: document.descripcion,
          entregado: false,
          test: false
        })
      );
    });
  }

  disabledViews(): any {
    this.isToAdd = false;
    this.isToList = false;
    this.isToUpdate = false;
  }
  getDocentes(): any {
    this.loading = true;
    this.docenteService.getDocentes().subscribe((docentes: Docente[]) => {
      this.docentes = docentes;
      this.loading = false;
    });
  }
  prepareSaveDocente(): Docente {
    const formModel = this.docenteForm.value;
    const docenteDocumentosDeepCopy: DocenteDocumentos[] = formModel.docenteDocumentos.map((docenteDocumento: DocenteDocumentos) =>
      Object.assign({}, docenteDocumento)
    );
    const docenteReferenciasDeepCopy: DocenteReferencias[] = formModel.docenteReferencias.map((docenteReferencia: DocenteReferencias) =>
      Object.assign({}, docenteReferencia)
    );
    const docenteEstudiosDeepCopy: DocenteEstudios[] = formModel.docenteEstudios.map((docenteEstudio: DocenteEstudios) =>
      Object.assign({}, docenteEstudio)
    );
    const saveDocente: Docente = {
      id: formModel.id as number,
      codigo: formModel.codigo as string,
      nombre: formModel.nombre as string,
      apellido: formModel.apellido as string,
      identificacion: formModel.identificacion as string,
      fechaNacimiento: formModel.fechaNacimiento as Date,
      estadoCivil: formModel.estadoCivil as string,
      sexo: formModel.sexo as string,
      edad: this.CalcularEdad(formModel.fechaNacimiento),
      puesto: formModel.puesto as string,
      foto: formModel.foto as string[],
      departamento: formModel.departamento as string,
      municipio: formModel.municipio as string,
      direccion: formModel.direccion as string,
      telefono: formModel.telefono as string,
      celular: formModel.celular as string,
      email: formModel.email as string,
      hijo: formModel.hijo as boolean,
      nHijo: formModel.nHijo as number,
      estado: formModel.estado as boolean,
      facultadID: null,
      userID: formModel.userID as number,
      docenteDocumentos: docenteDocumentosDeepCopy,
      docenteReferencias: docenteReferenciasDeepCopy,
      docenteEstudios: docenteEstudiosDeepCopy
    };
    return saveDocente;
  }

  CalcularEdad(fechaNacimiento: Date): number {
    const today: Date = new Date();
    const birthDate: Date = new Date(fechaNacimiento);
    let age: number = today.getFullYear() - birthDate.getFullYear();
    const month: number = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  goBack() {
    //     this.location.back();
    //        this.router.navigate(['/facultades']);
    this.disabledViews();
    this.isToList = true;
  }

  addDocente() {
    this.disabledViews();
    this.createForm();
    this.createDocenteDocumento();
    this.isToAdd = true;
  }
  onDeleted(docente: Docente) {
    this.alertify.confirm('Desea Eliminar el Docente: ' + docente.nombre + ' ' + docente.apellido + '?', () => {
      this.docenteService.delete(docente.id).subscribe(
        () => {
          this.alertify.success('El Docente se ha Eliminado');
          this.getDocentes();
          this.disabledViews();
          this.isToList = true;
          this.docenteForm.reset(docente);
        },
        error => {
          this.alertify.error('Error al Eliminar el Docente');
        }
      );
    });
  }
  updateReferencia(ref) {
    this.docenteForm.patchValue({
      referencia: {
        nombre: ref.value.nombre,
        telefono: ref.value.telefono,
        lugarTrabajo: ref.value.lugarTrabajo,
        puesto: ref.value.puesto,
        tipo: ref.value.tipo
      }
    });
  }

  updateDocente(docente: Docente) {
    const docenteReferencias = docente.docenteReferencias.map(docenteReferencias => this.fb.group(docenteReferencias));
    const docenteRefereciaFormArray = this.fb.array(docenteReferencias);
    this.docenteForm.setControl('docenteReferencias', docenteRefereciaFormArray);

    if (docente.docenteDocumentos.length > 0) {
      const docenteDocumentos = docente.docenteDocumentos.map(docenteDocumentos => this.fb.group(docenteDocumentos));
      const docenteDocumentoFormArray = this.fb.array(docenteDocumentos);
      this.docenteForm.setControl('docenteDocumentos', docenteDocumentoFormArray);
    } else {
      this.docenteForm.setControl('docenteDocumentos', this.fb.array([]));
      this.createDocenteDocumento();
    }

    const docenteEstudios = docente.docenteEstudios.map(docenteEstudios => this.fb.group(docenteEstudios));
    const docenteEstudiosFormArray = this.fb.array(docenteEstudios);
    this.docenteForm.setControl('docenteEstudios', docenteEstudiosFormArray);

    this.docenteForm.patchValue({
      id: docente.id,
      codigo: docente.codigo,
      nombre: docente.nombre,
      apellido: docente.apellido,
      identificacion: docente.identificacion,
      fechaNacimiento: this.dateFormat.transform(new Date(docente.fechaNacimiento)),
      estadoCivil: docente.estadoCivil,
      sexo: docente.sexo,
      edad: docente.edad,
      puesto: docente.puesto,
      foto: null,
      departamento: docente.departamento,
      municipio: docente.municipio,
      direccion: docente.direccion,
      telefono: docente.telefono,
      celular: docente.celular,
      email: docente.email,
      hijo: docente.hijo,
      nHijo: docente.nHijo,
      estado: docente.estado,
      userID: docente.userID
    });
    this.disabledViews();
    this.isToUpdate = true;
  }
}
