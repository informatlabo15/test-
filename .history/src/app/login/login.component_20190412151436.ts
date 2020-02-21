import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
  model: any = {};
  public loading = false;
  public primaryColour = '#007bff';
  public secondaryColour = '#007bff';

  constructor(public authService: AuthService, private alertify: AlertifyService, public router: Router) {}

  ngOnInit() {}

  login() {

    // this.alertify.success('Bienvenido');
   // localStorage.setItem('token', 'fgsdgsgfadsshsdfgsdfgsdfnjdhsdfdsafgtukgfbvseter');
   this.loading = true;
    this.authService.login(this.model).subscribe(
      next => {
        this.loading = false;
        this.alertify.message('Bienvenido');
        this.router.navigate(['/dashboard']);
        //             localStorage.setItem('token', "fgsdgsgfadsshsdfgsdfgsdfnjdhsdfdsafgtukgfbvseter");
        //          this.router.navigate(['/dashboard']);
        //           console.log('Welcome');
      },
      error => {
        this.loading = false;
        this.alertify.error(error);
      },
      () => {
        // //             if (this.authService.currentUser.tipo === 1) {
        // //              this.router.navigate(['/layoutForAdmin']);
        // //             }
        // //             if (this.authService.currentUser.tipo === 2 ) {
        // //                 this.router.navigate(['/layoutForDocente']);
        // //             }
        // //             if (this.authService.currentUser.tipo === 3 ) {
        // //                 this.router.navigate(['/layoutForEstudiante']);
        // //             }
        //           this.router.navigate(['/dashboard']);
      }
    );

  }
  logout() {
    this.authService.userToken = null;
    localStorage.removeItem('token');
    console.log('logget out');
  }

  onLoggedin() {
    localStorage.setItem('isLoggedin', 'true');
  }
}
