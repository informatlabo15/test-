import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emprendedurismo',
  templateUrl: './emprendedurismo.component.html',
  styleUrls: ['./emprendedurismo.component.scss']
})
export class EmprendedurismoComponent implements OnInit {
public emprendedurismo: Array<any> = [];
  constructor() { }

  ngOnInit() {
      this.emprendedurismo.push({
        mainTitle: 'Emprendimiento <br class="d.block d-md-none"> e Innovacion',
        subTitle: 'Aprender, Emprender y Prosperar',
        url: '/assets/images/emprendedurismo/background-header.jpeg',
        alt: 'Mas de un siglo Formando y Evangelizando',
        // tslint:disable-next-line:max-line-length
        description: [
        {
            title: '',
            text: `
                <p> 
                    La asignatura de Aprender, Emprender y Prosperar impartida en el Colegio Diocesano San Luis Gonzaga de Matagalpa (CSL),
                    está orientada al conocimiento a través del estudio, el ejercicio y la experiencia; fortaleciendo ideas de nuestros
                    estudiantes en emprendimientos planificados,  funcionales y creativos de la genialidad humana; logrando estudiantes
                    emprendedores constructores de ideas y sueños que mejoran progresivamente su nivel académico y aspecto social y económico.
                </p>
                <p> 
                    El centro educativo San Luis Gonzaga  en alianza con el Instituto Nicaragüense de Desarrollo (INDE), brinda a los estudiantes
                    espacios de intercambio de conocimientos y experiencias en diferentes congresos a nivel departamental y nacional, donde se dan
                    cita diferentes pequeñas y grandes empresas que ofertan sus servicios y productos  dentro y fuera del país. INDE está formado
                    por empresarios y profesionales que inspiran e impulsan iniciativas innovadoras y responsables, para contribuir al desarrollo
                    local y nacional. 
                </p>    
               `,
              url1: '/assets/images/emprendedurismo/description1-url1.jpeg',
              alt1: 'Capacitación del uso  innovador de redes sociales en la educación secundaria ',
              url2: '/assets/images/emprendedurismo/description1-url2.jpeg',
              alt2: 'Capacitación del uso  innovador de redes sociales en la educación secundaria ',
              information: `
                 <p>
                    Capacitación del uso  innovador de redes sociales en la educación secundaria brindada a docentes
                    y estudiantes en el  Colegio San Luis (a la izquierda), delegación de estudiantes
                    de 10mo y 11mo grado en el 4to Congreso  de Jóvenes Emprendedores en el hotel Crowne Plaza Managua
                    (a la derecha); ambas actividades impulsadas por el INDE </p>
              `
        },
        {
            title: '',
            text: `
                <p> 
                  Anualmente el Colegio San Luis Gonzaga realiza una Feria de Emprendedurismo y la innovación entre el mes de Octubre
                  y Noviembre donde los estudiantes que durante todo el año han venido estructurando su plan de negocios en la
                  asignatura de AEP exponen y venden sus productos o servicios a toda la comunidad educativa y público que nos
                  visita contando con la cobertura de varios medios de comunicación , también se cuenta con la participación
                  de empresas invitadas de exalumnos que han logrado establecerse sus negocios  a nivel local para compartir 
                  sus experiencias; cabe destacar que todas las empresas participan por obtener mención dentro de las tres mejores
                  y más rentables ideas de emprendimiento e innovación seleccionadas por un jurado calificador de Docentes de la 
                  Universidad de  ciencias Comerciales (UCC) y de docentes del CSL , al igual que todo el público que nos
                  visita está sujeto a premios de las empresas participantes.
                </p>
               `,
              url1: '/assets/images/emprendedurismo/description2-url1.jpeg',
              alt1: 'Feria de Emprendedurismo y la innovación ',
              url2: '',
              alt2: '',
              information: `
                 <p>
                       Premiación al 1er lugar del a empresa La Villeda de Mis Sueños en la  
                      2da Feria de Emprendimiento e innovación en el auditorio del Colegio San Luis
                    </p>
              `
        },
          {
            title: '¿Por qué innovar?',
            text: `
                <p> 
                    La innovación es un cambio que introduce novedades,y que se refiere a modificar elementos ya
                    existentes con el fin de mejorarlos o renovarlos para el beneficio de la sociedad, la innovación
                    permite desarrollar la competitividad, mejora la capacidad de decisiones, permite un
                    crecimiento personal y el buen uso
                    de las tecnologías .
                </p>
                <p> 
                    El colegio Diocesano San Luis Gonzaga pretende que todos los bachilleres egresados de sus salones
                    de clase logren insertarse en el mercado laboral con el desarrollo de sus propias ideas de planes de
                    negocios conformando pequeñas empresas que sean generadores de empleos a nivel local para que no
                    dependan la oferta laboral que en muchas ocasiones es muy limitada,generando sus propios ingresos para
                    lo cual la innovación es el punto de partida.
                </p>  
                <p> 
                    La innovación se traduce como el motor de crecimiento y sostenibilidad más poderoso que tiene una sociedad, es la
                    forma más efectiva de mejorar las condiciones socioeconómicas de la población; las innovaciones pueden
                    ser productos, servicios o procesos que generan valor económico y benefician a todos e integra conocimientos de
                    ciencias, mercado, logística y ventas.
                </p>
               `,
              url1: '/assets/images/emprendedurismo/description3-url1.jpeg',
              alt1: 'Cobertura de medios locales en la 2da edición de feria de emprendimiento e innovación',
              url2: '/assets/images/emprendedurismo/description3-url2.jpeg',
              alt2: 'Cobertura de medios locales en la 2da edición de feria de emprendimiento e innovación',
              information: `
                 <p>
                    Cobertura de medios locales en la 2da edición de feria de
                    emprendimiento e innovación, auditorio Colegio San Luis Gonzaga (arriba), grupo
                    estudiantil de 10mo grado ganador del segundo lugar con la empresa MAKKA
                    (abajo)
                 </p>
              `
        }]
    });
    window.scrollTo(0, 0);
  }

}
