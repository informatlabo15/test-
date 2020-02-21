import { Component, OnInit } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  animations: [routerTransition()]
})
export class ChangePasswordComponent implements OnInit {

  public user: User;
  userForm:  FormGroup;
  public loading = false;
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
       this.user = JSON.parse(localStorage.getItem('user'));
    }

    get u(): any {
      return this.userForm.controls;
    }

  createForm() {
    this.userForm = this.fb.group({
      userId: 0,
      email: '',
      password: ['', Validators.required],
      verificado: 'true'
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.valid) {
      this.user = this.prepareSaveUser();
        this.userService.existPasssword(this.user, this.user.userId).subscribe(next  => {
          this.userService.updatePasssword(this.user, this.user.userId).subscribe(next => {
              this.userForm.reset(this.user);
              this.alertify.success('Su información se actualizo correctamente');
              this.router.navigate(['/dashboard']);
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
      this.alertify.error('Complete toda la información para poder Continuar');
    }
  }

   prepareSaveUser(): User {
    const formModel = this.userForm.value;
    const saveUser: User = {
      userId: this.user.userId as number,
      email: formModel.email  as string,
      userName: formModel.userName as string,
      nombre: formModel.nombre as string,
      apellidos: formModel.apellidos as string,
      password: formModel.password as string,
      fechaAlta: this.user.fechaAlta as Date,
      estado: this.user.estado as boolean,
      tipo: this.user.tipo as number,
      activo: this.user.activo as boolean,
      verificado: true
    };
    return saveUser;
  }

}
