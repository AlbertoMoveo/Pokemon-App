import { Router, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { PokemonListComponent } from "./components/pokemon-list/pokemon-list.component";
import { authGuard } from "./auth.guard";

export const routes: Routes = [
    {path: 'login', component: AuthComponent},
    {path: 'pokemons', component: PokemonListComponent, canActivate: [authGuard]},
    {path: '', redirectTo: 'pokemons', pathMatch: 'full'},
    {path: '**', redirectTo: 'pokemons', pathMatch: 'full'}
]