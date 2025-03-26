import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
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

  return (
    <div className="home-container">
      <h1>Bienvenido a la Pokédex</h1>
      <p>Explora y descubre todos los Pokémon.</p>
      <Link to="/pokedex">
        <button className="btn-explorar">Explorar Pokédex</button>
      </Link>

      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mp3" />
        Tu navegador no soporta el elemento de audio.
      </audio>
    </div>
  );
}

export default Home;
