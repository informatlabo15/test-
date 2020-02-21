import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    public user: User;
    constructor(
        public router: Router
    ) {
        this.sliders.push(
            {
                imagePath: 'assets/images/slider1.jpg',
                label: 'Universidad Juan Pablo II',
                text:
                    'Bienvenidos a su Gestión Universitaria en Línea'
            }
        );
    }

    ngOnInit() {
        window.scroll(0, 0);
        this.user = JSON.parse(localStorage.getItem('user'));
        // si el acceso es de un docente cargar el formulario de evaluaciones
        if (this.user.tipo === 5) {
            this.router.navigate(['/evaluacion-docente']);
        }
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
