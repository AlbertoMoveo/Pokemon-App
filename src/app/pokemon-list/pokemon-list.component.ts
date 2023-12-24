import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../service/data.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { IPokemon } from './pokemon';
import { AxiosResponse } from 'axios';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, MatProgressSpinnerModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent implements OnInit {
  pokemons: IPokemon[] = [];
  page = 1;
  totalPokemons: number = 200;
  detailedPokemon: IPokemon = null;
  filteredPokemons: IPokemon[] = [];
  totalFilteredPokemons: number;
  types: string[] = [];
  isLoading: boolean = true;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {
    this.dataService.getPokemonsAxios(this.totalPokemons)
      .then(async (pokemonData: AxiosResponse<any, any>) => {
        const results: IPokemon[] = pokemonData.data.results;
        for (const result of results) {
          const rawPokemonResponse = await this.dataService.getMoreDataAxios(result.name);
          const rawPokemon = rawPokemonResponse.data;
          const pokemon: IPokemon = {
            name: result.name,
            image: rawPokemon.sprites && rawPokemon.sprites.front_default,
            type: rawPokemon.types && rawPokemon.types[0]?.type.name,
            height: rawPokemon.height,
            health: rawPokemon.stats && rawPokemon.stats[0]?.base_stat,
            attack: rawPokemon.stats && rawPokemon.stats[1]?.base_stat,
            showDetails: false
          };
          this.pokemons.push(pokemon);
        }
        this.filteredPokemons = [...this.pokemons];
        this.getTypes();
        this.resetFilter();
        this.isLoading = false;
      });
  }

  // Filtering functions
  filterPokemonsByName(filterText: string) {
    this.resetFilter();
    if (filterText) {
      this.filteredPokemons = this.pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(filterText.toLowerCase()));
      this.totalFilteredPokemons = this.filteredPokemons.length;
    }
  }

  filterPokemonsByType(filterType: string) {
    this.resetFilter();
    if (filterType) {
      this.filteredPokemons = this.pokemons.filter(pokemon =>
        pokemon.type === filterType);
      this.totalFilteredPokemons = this.filteredPokemons.length;
    }
  }

  resetFilter(): void {
    this.page = 1;
    this.filteredPokemons = [...this.pokemons];
    this.totalFilteredPokemons = this.totalPokemons;
    this.getPagePokemons();
  }

  getTypes(): void {
    this.pokemons.forEach(pokemon => {
      const type = pokemon.type;
      if (!this.types.includes(type)) {
        this.types.push(type)
      }
    })
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
    return this.filteredPokemons.slice(startI, endI);
  }

}
