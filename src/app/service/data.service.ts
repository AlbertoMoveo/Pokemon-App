import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  // Get Pokemons
  getPokemons(limit: number) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}/`);
  }

  // Get Pokemon Details
  getMoreData(name: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }

  testFunction() {
    const a = 3;
    const b = 4;
    const c = 5;
    console.log("TRY");
    return a+b+c;
  }
}
 