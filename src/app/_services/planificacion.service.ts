import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Planificacion } from '../models/planificacion';
import { PlanificacionDetalle } from '../models/planificacionDetalle';
import { EstudianteEvaluacion } from '../models/estudianteEvaluacion';
import { PlanificacionEvaluacion } from '../models/planificacionEvaluacion';

@Injectable({
  providedIn: 'root'
})
export class PlanificacionService {

headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

  baseUrl =  environment.apiUrl +  'Planificacion/';
  constructor(private http: HttpClient) { }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register' , model );
  }
  getPlanificaciones(): Observable<Planificacion[]> {
    return this.http.get<Planificacion[]>(this.baseUrl );
  }
  getPlanificacionActiva(): Observable<Planificacion> {
    return this.http.get<Planificacion>(this.baseUrl + 'GetPlanificacionActiva' );
  }
  getPlanificacionesByCarrera(id): Observable<Planificacion[]> {
    return this.http.get<Planificacion[]>(this.baseUrl + 'GetPlanificacionesByCarrera'  + '?=' + id);
  }
  
  getPlanificacion(id): Observable<Planificacion> {
    return this.http.get<Planificacion>(this.baseUrl + 'GetPlanificacion/' + id);
  }
  update(planificacion: Planificacion, id: number) {
    return this.http.put(this.baseUrl +  id, planificacion );
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl  + id);
  }

  getPlanificacionDetalle(id: number): Observable<PlanificacionDetalle[]> {
    return this.http.get<PlanificacionDetalle[]>(this.baseUrl + 'GetPlanificacionDetalle/'  + id);
  }

  getPlanificacionDetalleByGrupo(grupoID: number): Observable<PlanificacionDetalle[]> {
    return this.http.get<PlanificacionDetalle[]>(this.baseUrl + 'GetPlanificacionDetalleByGrupo'  + '?='  + grupoID);
  }

  GetPlanificacionDetalleByGrupoAndPlanificacion(grupoID: number, planificacion: number): Observable<PlanificacionDetalle[]> {
    return this.http.get<PlanificacionDetalle[]>(this.baseUrl   + grupoID + '/' + planificacion );
  }

  getPlanificacionDetalleByDocente(docenteID: number): Observable<PlanificacionDetalle[]> {
    return this.http.get<PlanificacionDetalle[]>(this.baseUrl + 'GetPlanificacionDetalleByDocente'  + '?='  + docenteID);
  }

  getPlanificacionesByPlanificacionID(id): Observable<PlanificacionDetalle[]> {
    return this.http.get<PlanificacionDetalle[]>(this.baseUrl + 'GetPlanificacionesDetalleByPlanificacion'  + '?=' + id);
  }

  getPlanificacionesByPlanificacion_Grupo(planificacion:number , grupo:number): Observable<PlanificacionDetalle[]> {
    return this.http.get<PlanificacionDetalle[]>(this.baseUrl + 'GetPlanificacionesDetalleByPlanificacion_Grupo/'  + grupo + '/' + planificacion);
  }

  registerPlanificacionDetalle(model: any) {
    return this.http.post(this.baseUrl + 'RegisterPlanificacionDetalle/' , model );
  }
  updatePlanificacionDetalle(planificacionDetalle: PlanificacionDetalle, id: number) {
    return this.http.put(this.baseUrl +  id,  planificacionDetalle );
  }

  deletePlanificacionDetalle(id: number) {
    return this.http.delete(this.baseUrl + 'deletePlanificacionDetalle/'  + id);
  }
  registerPlanificacionEvaluacion(model: any) {
    return this.http.post(this.baseUrl + 'RegisterPlanificacionEvaluacion/' , model );
  }

  registerEstudianteEvaluacionesByPlanfificacion(evaluaciones: any, id: number) {
    return this.http.post(this.baseUrl + 'RegisterPlanificacionEvaluacion/' + id ,  evaluaciones );
  }

  deletePlanificacionEvaluacion(id: number, evaluacion: number) {
    return this.http.delete(this.baseUrl + 'deletePlanificacionEvaluacion/'  + id + '/' + evaluacion);
  }

}
