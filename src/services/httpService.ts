import { Injectable } from "@angular/core";
import {HttpClient, HttpClientModule, HttpParams} from '@angular/common/http'

@Injectable({providedIn: 'root'})
export class HttpService{

    constructor(private http:HttpClient){}

    getData(){
        return this.http.get('http://localhost:3000/api')
    }
}