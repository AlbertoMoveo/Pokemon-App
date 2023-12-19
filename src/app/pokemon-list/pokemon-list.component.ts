import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../service/data.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  page = 1;
  totalPokemons: number;

  // Filter
  filteredPokemons: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getPokemons();
}

  getPokemons(){
    this.dataService.getPokemons(10, this.page * 10 - 10)
    .subscribe((data: any) => {
      this.totalPokemons = data.count;
      data.results.forEach(result => {
        this.dataService.getMoreData(result.name).subscribe((uniqData: any) => {
          // Traking if pokemon is clicked (to show all details)
          uniqData.showDetails = false;
          this.pokemons.push(uniqData);
          console.log(this.pokemons);
        });
    });
    this.filteredPokemons = this.pokemons;
  });
  }

  // Filtering function
  filterPokemons(filterText: string) {
    if (!filterText){
      this.filteredPokemons = [ ...this.pokemons ];
    } else {
      this.filteredPokemons = this.pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(filterText.toLowerCase()));
    }
  }

  // Details on click
  toggleDetails(pokemon: any): void {
    pokemon.showDetails = !pokemon.showDetails;
  }

}
