export interface IPokemon {
    name: string;
    image: string;
    type: string;
    height: number;
    health: number;
    attack: number;
    showDetails: boolean;
}

export interface IPokemonAllResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: IName[];
}

export interface IPokemonByTypeResponse {
    damageRelations:     DamageRelations;
    gameIndices:         GameIndex[];
    generation:          Generation;
    id:                  number;
    moveDamageClass:     Generation;
    moves:               Generation[];
    name:                string;
    names:               IName[];
    pastDamageRelations: any[];
    pokemon:             IPokemonThin[];
}

export interface DamageRelations {
    doubleDamageFrom: Generation[];
    doubleDamageTo:   Generation[];
    halfDamageFrom:   Generation[];
    halfDamageTo:     Generation[];
    noDamageFrom:     any[];
    noDamageTo:       any[];
}

export interface Generation {
    name: string;
    url:  string;
}

export interface GameIndex {
    gameIndex:  number;
    generation: Generation;
}

export interface IName {
    language: Generation;
    name:     string;
}

export interface IPokemonThin {
    pokemon: Generation;
    slot:    number;
}