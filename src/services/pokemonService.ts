import { gql } from "@apollo/client";

// Consulta para obtener la lista de los primeros 20 Pokémon
export const GET_POKEMON_LIST = gql`
  query GetPokemonList {
    pokemon_v2_pokemon(limit: 1025) {
      id
      name
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`;

// Consulta para obtener detalles de un Pokémon
export const GET_POKEMON_DETAILS = gql`
  query GetPokemonDetails($name: String!) {
    pokemon_v2_pokemon(where: { name: { _eq: $name } }) {
      id
      name
      height
      weight
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`;
