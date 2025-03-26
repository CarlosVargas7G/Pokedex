import { useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_POKEMON_LIST } from "../services/pokemonService";
import { Link, useNavigate } from "react-router-dom";
import "./Pokedex.css";

interface PokemonSprite {
  sprites: {
    front_default: string;
  };
}

interface Pokemon {
  id: number;
  name: string;
  pokemon_v2_pokemonsprites?: PokemonSprite[];
}

interface PokemonData {
  pokemon_v2_pokemon: Pokemon[];
}

function Pokedex() {
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState(151);
  const navigate = useNavigate();
  const { loading, error, data } = useQuery<PokemonData>(GET_POKEMON_LIST);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((err) => console.error("Error al reproducir música:", err));
    }
  };

  useEffect(() => {
    playMusic();
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        playMusic();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  if (loading) return <p className="loading-text">Cargando...</p>;
  if (error) return <p className="error-text">Error al obtener datos: {error.message}</p>;
  if (!data || !data.pokemon_v2_pokemon) return <p className="error-text">No se encontraron datos de Pokémon.</p>;

  const filteredPokemons = data.pokemon_v2_pokemon.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const limitedPokemons = filteredPokemons.slice(0, limit);

  return (
    <div className="pokedex-container">
      <button className="back-home-button" onClick={() => navigate("/")}>Volver al Inicio</button>
      <h1>Lista de Pokémon</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar Pokémon por nombre..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mp3" />
        Tu navegador no soporta el elemento de audio.
      </audio>

      <div className="pokemon-grid">
        {limitedPokemons.length > 0 ? (
          limitedPokemons.map((pokemon) => {
            const sprite = pokemon.pokemon_v2_pokemonsprites?.[0]?.sprites?.front_default || "";

            return (
              <div key={pokemon.id} className="pokemon-card">
                <Link to={`/pokemon/${pokemon.name}`} className="pokemon-link">
                  <h3>{pokemon.name.toUpperCase()}</h3>
                  {sprite && <img src={sprite} alt={pokemon.name} />}
                </Link>
              </div>
            );
          })
        ) : (
          <p>No se encontraron Pokémon con ese nombre.</p>
        )}
      </div>
    </div>
  );
}

export default Pokedex;