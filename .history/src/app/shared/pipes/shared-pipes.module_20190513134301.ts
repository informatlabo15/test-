import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateformatPipe } from './dateformat.pipe';
import { FilterPipe } from './filter.pipe';
import { ActivatedPipe } from './activated.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';
import { FilterAsignaturaPipe } from './filter-asignatura.pipe';
import { TimeformatPipe } from './timeformat.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [DateformatPipe, FilterPipe, ActivatedPipe, SafeHtmlPipe, FilterAsignaturaPipe, TimeformatPipe],
    exports: [
        DateformatPipe, FilterPipe, TimeformatPipe, ActivatedPipe, SafeHtmlPipe, FilterAsignaturaPipe
    ]
})
export class SharedPipesModule { }
