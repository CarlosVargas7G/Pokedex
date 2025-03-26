import { useQuery } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { GET_POKEMON_DETAILS } from "../services/pokemonService";
import "./PokemonDetails.css";

// Definir interfaces para los datos de Pokémon
interface PokemonSprite {
  sprites: {
    front_default: string;
    front_shiny: string;
  };
}

interface PokemonType {
  pokemon_v2_type: {
    name: string;
  };
}

interface PokemonStat {
  pokemon_v2_stat: {
    name: string;
  };
  base_stat: number;
}

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  pokemon_v2_pokemonsprites: PokemonSprite[];
  pokemon_v2_pokemontypes: PokemonType[];
  pokemon_v2_pokemonstats: PokemonStat[];
}

interface PokemonData {
  pokemon_v2_pokemon: Pokemon[];
}

function PokemonDetails() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery<PokemonData>(GET_POKEMON_DETAILS, {
    variables: { name },
  });

  if (loading) return <p className="loading-text">Cargando datos del Pokémon...</p>;
  if (error) return <p className="error-text">Error al obtener datos: {error.message}</p>;

  if (!data || !data.pokemon_v2_pokemon.length) {
    return <p className="error-text">No se encontraron detalles del Pokémon.</p>;
  }

  const pokemon = data.pokemon_v2_pokemon[0];
  const sprite = pokemon.pokemon_v2_pokemonsprites[0]?.sprites?.front_default || "";
  const shinySprite = pokemon.pokemon_v2_pokemonsprites[0]?.sprites?.front_shiny || sprite;

  return (
    <div className={`pokemon-details-container ${pokemon.pokemon_v2_pokemontypes[0]?.pokemon_v2_type.name}`}>
      <button className="back-home-button" onClick={() => navigate("/")}>
        Volver al Inicio
      </button>

      <h1>{pokemon.name.toUpperCase()}</h1>

      {/* Mostrar ambas imágenes: normal y shiny */}
      <div className="pokemon-images">
        <div className="image-container">
          <h3>Versión Normal</h3>
          <img src={sprite} alt={`${pokemon.name} normal`} />
        </div>

        <div className="image-container">
          <h3>Versión Shiny</h3>
          <img src={shinySprite} alt={`${pokemon.name} shiny`} />
        </div>
      </div>

      <p><strong>Número en la Pokédex:</strong> {pokemon.id}</p>
      <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
      <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>

      <h2>Tipos</h2>
      <ul>
        {pokemon.pokemon_v2_pokemontypes.map((type, index) => (
          <li key={index}>{type.pokemon_v2_type.name}</li>
        ))}
      </ul>

      <h2>Estadísticas</h2>
      <ul>
        {pokemon.pokemon_v2_pokemonstats.length > 0 ? (
          pokemon.pokemon_v2_pokemonstats.map((stat, index) => (
            <li key={index}>
              {stat.pokemon_v2_stat.name.toUpperCase()}: {stat.base_stat}
            </li>
          ))
        ) : (
          <p>No hay estadísticas disponibles para este Pokémon.</p>
        )}
      </ul>
    </div>
  );
}

export default PokemonDetails;
