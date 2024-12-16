import { Injectable } from '@angular/core';
import {Http, Headers,URLSearchParams,RequestOptions} from '@angular/http';
import {Observable, Subject} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';

export interface Record {
  date: Date;
  _id: string;
  name: string;
  user_id: string;
  amount: number;
  mandatory:boolean;
  isIncome: boolean;
  isExpense: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class DataService {
  user_id: any;
  RecordData: Record[] = [];
  constructor(private http:Http, private authService: AuthService) {

   }

   updateRecordData(record){
    this.RecordData.push(record);

   }

  getRecord() {
    let headers = new Headers();
    this.loadUser_id();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get("http://localhost:3000/record/"+this.user_id, {headers: headers})
    .pipe(map(res => res.json()));
  }

  getlastWeek() {
    let headers = new Headers();
    this.loadUser_id();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('lastweek', "lastweek");
    headers.append('Content-Type','application/json');
    return this.http.get("http://localhost:3000/record/"+this.user_id, {headers: headers})
    .pipe(map(res => res.json()));
  }

  getOne(id){
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type','application/json');
    let params = new URLSearchParams();
    params.append("id", id);
    let request_options = new RequestOptions({ headers: headers, search: params});
    return this.http.get("http://localhost:3000/record/one/"+id, request_options)
    .pipe(map(res => res.json()));

  }

  addRecord(record){
    let headers = new Headers();
    this.loadUser_id();
    headers.append('Content-Type','application/json');
    return this.http.post("http://localhost:3000/record/"+record._id,record,{headers: headers})
    .pipe(map(res => res.json()));
  }

  deleteRecord(record) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type','application/json');
    let params = new URLSearchParams();
    params.append("id", record._id);
    let request_options = new RequestOptions({ headers: headers, search: params});
    return this.http.delete("http://localhost:3000/record/"+record._id, request_options)
    .pipe(map(res => res.json()));
  }

  editRecord(record){
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type','application/json');
    return this.http.put("http://localhost:3000/record/"+record.id, record, {headers: headers})
    .pipe(map(res => res.json()));
  }


  loadUser_id(){
    const user_id = JSON.parse(localStorage.getItem("user")).id;
    this.user_id = user_id;
  }
}
