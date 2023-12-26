import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { IPokemon } from './pokemon';
import { AxiosResponse } from 'axios';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, MatProgressSpinnerModule, FormsModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent implements OnInit {
  pokemons: IPokemon[] = [];
  page = 1;
  totalPokemons: number = 100;
  detailedPokemon: IPokemon = null;
  types: string[] = [];
  type: string = null;
  isLoading: boolean = true;
  filterText: string = '';
  filterType: string = '';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getTypes();
    this.getPokemonsByType();
  }

  getTypes() {
    this.dataService.getAllTypesAxios().then(async (typesData) => {
      for (const type of typesData.data['results']) {
        this.types.push(type.name);
      }
    });
  }

  async getMoreData(pokemonName: string): Promise<IPokemon> {
    const rawPokemonResponse = await this.dataService.getMoreDataAxios(pokemonName);
    const rawPokemon = rawPokemonResponse.data;
    return {
      name: pokemonName,
      image: rawPokemon.sprites && rawPokemon.sprites.front_default,
      type: rawPokemon.types && rawPokemon.types[0]?.type.name,
      height: rawPokemon.height,
      health: rawPokemon.stats && rawPokemon.stats[0]?.base_stat,
      attack: rawPokemon.stats && rawPokemon.stats[1]?.base_stat,
      showDetails: false
    };
  }
  
  async getPokemonsByType() {
    this.clearPokemons();
    this.isLoading = true;
    if (!this.type) {
      return this.getPokemons();
    }
    const pokemonData: AxiosResponse<any, any> = await this.dataService.getPokemonsByType(this.type, this.totalPokemons);
    const results: any[] = pokemonData.data.pokemon;
    for (const result of results) {
      const pokemon = await this.getMoreData(result.pokemon.name);
      this.pokemons.push(pokemon);
    }
    this.totalPokemons = this.pokemons.length;
    this.resetFilter();
    this.isLoading = false;
  }
  
  getPokemons() {
    this.dataService.getPokemonsAxios(this.totalPokemons)
      .then(async (pokemonData: AxiosResponse<any, any>) => {
        const results: IPokemon[] = pokemonData.data.results;
        for (const result of results) {
          const pokemon = await this.getMoreData(result.name);
          this.pokemons.push(pokemon);
        }
        this.resetFilter();
        this.isLoading = false;
      });
  }  

  // Filtering functions
  filterPokemonsByName(filterText: string) {
    this.resetFilter();
    if (filterText) {
      this.pokemons = this.pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(filterText.toLowerCase()));
      this.totalPokemons = this.pokemons.length;
    }
  }

  filterPokemonsByType(filterType: string) {
    if (filterType) {
      this.type = filterType;
      this.getPokemonsByType();
    }
  }

  goHome(): void {
    this.clearPokemons();
    this.filterText = '';
    this.filterType = '';
    this.page = 1;
    this.type = null;
    this.getPokemonsByType();
  }

  resetFilter(): void {
    this.page = 1;
    this.getPagePokemons();
  }

  // Details on click
  toggleDetails(pokemon: IPokemon): void {
    if (this.detailedPokemon) {
      this.detailedPokemon.showDetails = false;
    }
    if (this.detailedPokemon === pokemon) {
      this.detailedPokemon = null;
    } else {
      this.detailedPokemon = pokemon;
      this.detailedPokemon.showDetails = true;
    }
  }

  // Pages function
  getPagePokemons(): IPokemon[] {
    const startI = (this.page - 1) * 10;
    const endI = startI + 10;
    return this.pokemons.slice(startI, endI);
  }

  clearPokemons(){
    this.pokemons = [];
  }

}
