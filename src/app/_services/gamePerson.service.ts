import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../_models/Game';
import { GamePerson } from '../_models/GamePerson';
import { GamePersonResponseView } from '../_models/GamePersonResponseView';

@Injectable({
  providedIn: 'root'
})
export class GamePersonService {
  baseURL = 'http://localhost:5000/api/gamepersonalloans';
  baseUrlDf  = 'http://localhost:5000'
  tokenHeader: HttpHeaders;

constructor(private http: HttpClient) {
  this.tokenHeader = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('token')}`});
}

  getGamePersonById(id: number): Observable<GamePersonResponseView> {
    return this.http.get<GamePersonResponseView>('${this.baseURL}/${id}');
  }

 

  postGamePerson(game: GamePerson) {
    return this.http.post(this.baseURL, game, { headers: this.tokenHeader });
  }

  putGamePerson(game: GamePerson) {
    return this.http.put(`${this.baseURL}`, game, { headers: this.tokenHeader });
  }

  deleteGamePerson(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`, { headers: this.tokenHeader });
  }

  getAllGame(): Observable<GamePersonResponseView[]> {
    return this.http.get<GamePersonResponseView[]>(this.baseURL, { headers: this.tokenHeader });
  }

  getSelectAllAsyncIsStatusIsActive(): Observable<GamePersonResponseView[]> {
    return this.http.get<GamePersonResponseView[]>(`${this.baseUrlDf}/statusisactive`, { headers: this.tokenHeader });
  }


}
