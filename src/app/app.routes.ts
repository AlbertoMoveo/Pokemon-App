import { Router, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { PokemonListComponent } from "./components/pokemon-list/pokemon-list.component";
import { authGuard } from "./guards/auth.guard";
import { MapComponent } from "./components/map/map.component";

export const routes: Routes = [
    {path: 'login', component: AuthComponent},
    {path: 'pokemons', component: PokemonListComponent, canActivate: [authGuard]},
    {path: 'map', component: MapComponent, canActivate: [authGuard]},
    {path: '', redirectTo: 'pokemons', pathMatch: 'full'},
    {path: '**', redirectTo: 'pokemons', pathMatch: 'full'}
]