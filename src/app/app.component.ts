import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "./header/header.component";
import { PokemonListComponent } from "./pokemon-list/pokemon-list.component";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, HeaderComponent, PokemonListComponent]
})
export class AppComponent {
  title = 'pokemon-app';
}
