import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../_models/Game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  baseURL = 'http://localhost:5000/api/games';
  tokenHeader: HttpHeaders;

constructor(private http: HttpClient) {
  this.tokenHeader = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('token')}`});
}

  getGameById(id: number): Observable<Game> {
    return this.http.get<Game>('${this.baseURL}/${id}');
  }

 

  postGame(game: Game) {
    return this.http.post(this.baseURL, game, { headers: this.tokenHeader });
  }

  putGame(game: Game) {
    return this.http.put(`${this.baseURL}`, game);
  }

  deleteGame(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  getAllGame(): Observable<Game[]> {
    return this.http.get<Game[]>(this.baseURL, { headers: this.tokenHeader });
  }

  


}
