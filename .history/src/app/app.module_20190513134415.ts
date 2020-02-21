import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard, SharedPipesModule  } from './shared';
// import { EmprendedurismoComponent } from './emprendedurismo/emprendedurismo.component';
// import { SafeHtmlPipe } from './shared/pipes/safe-html.pipe';
// import { FilterPipe } from './shared/pipes/filter.pipe';
import { JwtModule } from '@auth0/angular-jwt';
import {DataTableModule} from 'angular-6-datatable';
import { AlertifyService } from './_services/alertify.service';
import { AuthService } from './_services/auth.service';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { DateformatPipe } from './shared/pipes/dateformat.pipe';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { EmprendedurismoComponent } from './emprendedurismo/emprendedurismo.component';
import { TimeformatPipe } from './shared/pipes/timeformat.pipe';

export function tokenGetter() {
    return localStorage.getItem('token');
  }
// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {
    /* for development
    return new TranslateHttpLoader(
        http,
        '/start-angular/SB-Admin-BS4-Angular-6/master/dist/assets/i18n/',
        '.json'
    ); */
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
          JwtModule.forRoot({
          config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['ucajupmatagalpa.com', 'localhost:5000' ],
            blacklistedRoutes: ['ucajupmatagalpa.com/api/auth']
          }
        }),
        NgxLoadingModule.forRoot({
            animationType: ngxLoadingAnimationTypes.chasingDots,
        }),
        SharedPipesModule,
        DataTableModule,
        AppRoutingModule
    ],
    declarations: [AppComponent, EmprendedurismoComponent],  // , SafeHtmlPipe
    providers: [AuthGuard, AuthService, AlertifyService, ErrorInterceptorProvider, DateformatPipe, TimeformatPipe],
    bootstrap: [AppComponent]
})
export class AppModule {}
