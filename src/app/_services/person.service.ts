import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../_models/Person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  baseURL = 'http://localhost:5000/api/person';
  tokenHeader: HttpHeaders;

constructor(private http: HttpClient) {
  this.tokenHeader = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('token')}`});
}

  getPersonById(id: number): Observable<Person> {
    return this.http.get<Person>('${this.baseURL}/${id}');
  }

  getAllPerson(): Observable<Person[]> {
    return this.http.get<Person[]>(this.baseURL, { headers: this.tokenHeader });
  }

  postPerson(person: Person) {
    return this.http.post(this.baseURL, person, { headers: this.tokenHeader });
  }

  putPerson(person: Person) {
    return this.http.put(`${this.baseURL}`, person, { headers: this.tokenHeader });
  }

  deletePerson(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`, { headers: this.tokenHeader });
  }

}
