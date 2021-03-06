import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post<any>(apiUrl + '/login', data, httpOptions);
  }

  getData(query): Observable<any> {
    return this.http.get<any>(apiUrl + '/accounts', { ...httpOptions, params: query });
  }

  remove(id): Observable<any> {
    return this.http.delete<any>(apiUrl + '/accounts/' + id, httpOptions)
  }

  update(data): Observable<any> {
    console.log('update data');
    return this.http.put<any>(apiUrl + '/accounts/' + data._id, data, httpOptions)
  }

  add(data): Observable<any> {
    console.log('add data');
    return this.http.post<any>(apiUrl + '/accounts/', data, httpOptions)
  }
}
