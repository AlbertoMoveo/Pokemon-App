import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { IPokemon } from './pokemon';
import { AxiosResponse } from 'axios';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, ActivatedRoute } from '@angular/router';

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
  recentSearches: string[] = [];
  filterType: string = '';

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getTypes();
    this.getPokemonsByType();
    this.loadRecentSearches();
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
    const promises = results.map(result=>this.getMoreData(result.pokemon.name));
    const arr = await Promise.all(promises);
    this.pokemons.push(...arr);
    this.totalPokemons = this.pokemons.length;
    this.resetPages();
    this.isLoading = false;
  }
  
  getPokemons() {
    this.dataService.getPokemonsAxios(this.totalPokemons)
      .then(async (pokemonData: AxiosResponse<any, any>) => {
        const results: IPokemon[] = pokemonData.data.results;
        const promises = results.map(result=>this.getMoreData(result.name));
        const arr = await Promise.all(promises);
        this.pokemons.push(...arr);
        this.resetPages();
        this.isLoading = false;
      });
  }  

  filterPokemonsByName(filterText: string) {
    this.resetPages();
    if (filterText) {
      this.addToRecentSearches(filterText);
      this.pokemons = this.pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(filterText.toLowerCase()));
      this.totalPokemons = this.pokemons.length;
    } else {
      this.getPokemons();
    }
  }

  addToRecentSearches(searchText: string) {
    const index = this.recentSearches.indexOf(searchText);
    if (index !== -1) {
      this.recentSearches.splice(index, 1);
    }
    if(this.recentSearches.length >= 5) {
      this.recentSearches.pop();
    }
    this.recentSearches.unshift(searchText);
    localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));
  }

  loadRecentSearches() {
    const recentSearches = localStorage.getItem('recentSearches');
    this.recentSearches = recentSearches ? JSON.parse(recentSearches) : [];
  }

  searchRecent(searchText: string) {
    this.filterText = searchText;
    this.filterPokemonsByName(searchText);
  }  

  filterPokemonsByType(filterType: string) {
    if (filterType) {
      this.type = filterType;
      this.getPokemonsByType();
    } else {
      this.getPokemons();
    }
  }

  resetSearch(): void {
    this.recentSearches = [];
    localStorage.removeItem('recentSearches');
  }

  resetFilters(): void {
    this.clearPokemons();
    this.filterText = '';
    this.filterType = '';
    this.page = 1;
    this.type = null;
    this.getPokemons();
  }

  resetPages(): void {
    this.page = 1;
    this.getPagePokemons();
  }

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

  getPagePokemons(): IPokemon[] {
    const startI = (this.page - 1) * 10;
    const endI = startI + 10;
    return this.pokemons.slice(startI, endI);
  }

  clearPokemons(){
    this.pokemons = [];
  }

}
