import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getPokemonsAxios(limit: number) {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}/`)
  }

  getAllTypesAxios() {
    return axios.get("https://pokeapi.co/api/v2/type/");
  }

  getPokemonsByType(type: string, limit: number) {
    return axios.get(`https://pokeapi.co/api/v2/type/${type}/?limit=${limit}`);
  }

  getMoreDataAxios(name: string) {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }

}
