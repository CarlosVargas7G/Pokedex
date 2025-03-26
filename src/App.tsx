import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // Importamos Home
import Pokedex from "./pages/Pokedex";
import PokemonDetails from "./pages/PokemonDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> {/* Página principal */}
      <Route path="/pokedex" element={<Pokedex />} />
      <Route path="/pokemon/:name" element={<PokemonDetails />} />
    </Routes>
  );
}

export default App;
