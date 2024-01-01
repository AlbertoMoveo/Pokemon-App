import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios, { AxiosResponse } from 'axios';
import { IPokemonAllResponse, IPokemonByTypeResponse } from '../../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getPokemonsAxios(limit: number): Promise<AxiosResponse<IPokemonAllResponse>> {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}/`)
  }

  getAllTypesAxios(): Promise<AxiosResponse<IPokemonAllResponse>> {
    return axios.get("https://pokeapi.co/api/v2/type/");
  }

  getPokemonsByType(type: string, limit: number): Promise<AxiosResponse<IPokemonByTypeResponse>> {
    return axios.get(`https://pokeapi.co/api/v2/type/${type}/?limit=${limit}`);
  }

  getMoreDataAxios(name: string) {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }

}
