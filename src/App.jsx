import { useState, useEffect } from "react";
function App() {
  let [pokeId, setPokeId] = useState(1);
  let [pokeName, setPokeName] = useState("");

  function increaseId() {
    setPokeId(pokeId + 1);
    console.log("valor Id antes del render: " + pokeId);
  }

  //aca es donde llamamos a la API
  useEffect(() => {
    console.log("valor Id actualizado: " + pokeId);
    searchPokemon(pokeId);
  }, [pokeId]);

  let searchPokemon = async (pokeId) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);
    const data = await response.json();
    setPokeName(data.name);
  };

  return (
    <>
      <button onClick={increaseId}>Next</button>
      <div>
        {pokeId} - {pokeName}
      </div>
    </>
  );
}

export default App;
