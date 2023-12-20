import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../service/data.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { IPokemon } from './pokemon';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent implements OnInit {
  pokemons: IPokemon[] = [];
  page = 1;
  totalPokemons: number;
  detailedPokemon: IPokemon = null;

  // Search
  filteredPokemons: IPokemon[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {
    this.dataService.getPokemons(100)
    .subscribe((pokemonData: any) => {
      const results: IPokemon[] = pokemonData.results;
      this.totalPokemons = pokemonData.count;
  
      results.forEach(result => {
        this.dataService.getMoreData(result.name).subscribe((rawPokemon: any) => {
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
        });
      });
  
      this.filteredPokemons = this.pokemons;
    });  
  }

  // Filtering functions
  filterPokemonsByName(filterText: string) {
    if (!filterText) {
      this.filteredPokemons = [...this.pokemons];
    } else {
      this.filteredPokemons = this.pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(filterText.toLowerCase()));
    }
  }

  filterPokemonsByType(filterText: string) {
    if (!filterText) {
      this.filteredPokemons = [...this.pokemons];
    } else {
      this.filteredPokemons = this.pokemons.filter(pokemon =>
        pokemon.type.toLowerCase().includes(filterText.toLowerCase()));
    }
  }

  // Details on click
  toggleDetails(pokemon: IPokemon): void {
    if (this.detailedPokemon){
      this.detailedPokemon.showDetails = false;
    }
    if (this.detailedPokemon === pokemon){
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
