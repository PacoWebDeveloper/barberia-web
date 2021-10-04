import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Reservation } from "../models/reservations";
import { Global } from "./global";

@Injectable()
export class ReservationService {
    public url: string;
    constructor(
        private _http: HttpClient
    ) {
        this.url = Global.url;
    }

    getAllReservations(month: number): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type','application/json');
        let params = JSON.stringify(month);

        return this._http.get(this.url + '/reservation/todas-las-citas/' + params, {headers: headers});
    }

    getReservations(id: string): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');    
        
        return this._http.get(this.url + '/reservation/proxima-cita/' + id, { headers: headers });        
    }

    saveReservation(reservation: Reservation): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');    
        let params = JSON.stringify(reservation);

        return this._http.post(this.url + '/reservation/reservar', params, {headers: headers});
    }

    loadAvailableSchedules(month: number): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        
        return this._http.get(this.url + '/reservation/cargar-horarios/' + month,{headers});
    }

    refreshReservation(reservationData: Object): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');        
        let params = JSON.stringify(reservationData);  
        
        return this._http.put(this.url + '/reservation/actualizar/' + params, {headers});
    }

    deleteReservation(id: string): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');        
        
        return this._http.delete(this.url + '/reservation/eliminar/' + id, {headers});
    }
}