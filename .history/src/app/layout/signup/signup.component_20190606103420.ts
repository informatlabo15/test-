import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
  public user: User;
  public users: User[];
  userForm: FormGroup;
  date = new Date();
  public isToAdd: boolean;
  public isToUpdate: boolean;
  public isToList: boolean;
  public loading = false;
  public primaryColour = '#007bff';
  public secondaryColour = '#007bff';
  public tipoAccesos: any[];
  submitted = false;
    constructor(
      private userService: UserService,
      private fb: FormBuilder,
      public router: Router,
      private alertify: AlertifyService,
    ) {
        this.createForm();
    }

    ngOnInit() {
       window.scroll(0, 0);
      this.isToList = true;
      this.getUsers();
    }

    getUsers() {
      this.loading = true;
      this.userService.getUsers().subscribe(
        (  users: User[] ) => {
          this.users = users;
          this.loading  = false;
        }
      );
    }

    get u(): any {
      return this.userForm.controls;
    }


  addUser() {
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
    this.disabledViews();
    this.isToList = true;
  }

  createForm() {
    this.userForm = this.fb.group({
      userId: 0,
      userName:  ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: '',
      password: ['', Validators.required],
      fechaAlta: this.date,
      estado: 'true',
      tipo: 0,
      activo: 'true'
    });
     this.tipoAccesos = [
      { value: 1, nombre: 'Administrador'},
      { value: 3, nombre: 'Coordinador Area' },
      { value: 4, nombre: 'Coordinador Carrera' },
      { value: 5, nombre: 'Docente' },
      { value: 6, nombre: 'Estudiante' }
    ];
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.valid) {
      this.user = this.prepareSaveUser();
      if (this.isToAdd) {
        this.userService.register(this.user).subscribe(() => {
            this.getUsers();
            this.disabledViews();
            this.isToList = true;
            this.userForm.reset(this.user);
            this.alertify.success('Registro Agregado Correctamente');
          },
          error => {
            this.alertify.error(error);
          }
        );
      }
      if (this.isToUpdate) {
        this.userService.update(this.user, this.user.userId).subscribe(
          next => {
            this.getUsers();
            this.disabledViews();
            this.isToList = true;
            this.userForm.reset(this.user);
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

  updateUser(user: User) {
    this.userForm.patchValue({
      userId: user.userId,
      userName:  user.userName,
      nombre: user.nombre,
      apellidos: user.apellidos,
      email: user.email,
      password: user.password,
      fechaAlta: user.fechaAlta,
      estado: user.estado,
      tipo: user.tipo,
      activo: user.activo,
      verificado: user.verificado
   });
   this.disabledViews();
   this.isToUpdate = true;
 }

 onDeleted(user: User) {
  this.alertify.confirm('Desea Eliminar el Usuario: ' + user.userName + '?', () => {
    this.userService.delete(user.userId).subscribe(() => {
      this.alertify.success('El Usuario ha sido Eliminado');
      this.userForm.reset();
      this.getUsers();
      this.disabledViews();
      this.isToList = true;
      this.userForm.reset();
    }, error => {
      this.alertify.error('Error al Eliminar el Usuario');
    });
  });
}

  prepareSaveUser(): User {
    const formModel = this.userForm.value;
    const saveUser: User = {
     userId: formModel.userId as number,
     userName: formModel.userName as string,
      nombre: formModel.nombre as string,
      apellidos: formModel.apellidos as string,
      email: formModel.email  as string,
      password: formModel.password as string,
      fechaAlta: formModel.fechaAlta as Date,
      estado: formModel.estado as boolean,
      tipo: formModel.tipo as number,
      activo: formModel.activo as boolean
    };
    return saveUser;
  }
}
