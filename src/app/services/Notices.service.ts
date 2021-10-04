import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Global } from "./global";
import { Observable } from "rxjs";
import { notice } from "../models/notices";

@Injectable()
export class NoticeService {
    public url: string;
    constructor(
        private _http: HttpClient
    ) {
        this.url = Global.url;
    }

    getNotices(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type','application/json');
        
        return this._http.get(this.url + '/notice/cargar-avisos', {headers:headers});
    }

    saveNotice(noticeData: notice): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type','application/json');
        let params = JSON.stringify(noticeData);

        return this._http.post(this.url + '/notice/guardar-aviso',params, {headers});
    }

}