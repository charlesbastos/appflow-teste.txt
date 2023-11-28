import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TheMovieDBService {

    private chave = "d436605395d7db07381137d9dbfbde5d";
    private caminhoPadrao = "https://api.themoviedb.org/3";
    
  constructor(public http:HttpClient) { }

  public getPopularMovies(page=1, language="en-US"){
    let filmes = `${this.caminhoPadrao}/movie/popular?api_key=${this.chave}&language=${language}&page=${page}`; 
    //let filmes = "https://api.themoviedb.org/3/movie/popular?api_key=d436605395d7db07381137d9dbfbde5d&language=pt-BR&page=1";
    return this.http.get(filmes);

  }

}
