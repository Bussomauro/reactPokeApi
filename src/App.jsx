//Components
import { Button } from "./components/Button";
import { Card } from "./components/Card";
//Styles
import "./App.css";
import { TiArrowLeftOutline } from "react-icons/ti";
import { TiArrowRightOutline } from "react-icons/ti";
//Hooks
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [pokemonId, setPokemonId] = useState(1);
  const [pokemonEvolutions, setPokemonEvolutions] = useState([]);

  useEffect(() => {
    getEvolutions(pokemonId);
  }, [pokemonId]);

  let getEvolutions= async (id)=> {
    const response = await axios(
      `https://pokeapi.co/api/v2/evolution-chain/${id}/`
    );

    let pokemonEvoArray = [];

    let pokemonLv1 = response.data.chain.species.name;
    let pokemonLv1Type = await getPokemonTypes(pokemonLv1);
    let pokemonLv1Img = await getPokemonImgs(pokemonLv1);

    pokemonEvoArray.push([pokemonLv1,pokemonLv1Type, pokemonLv1Img]);

    if (response.data.chain.evolves_to.length !== 0) {
      let pokemonLv2 = response.data.chain.evolves_to[0].species.name;
      let pokemonLv2Type = await getPokemonTypes(pokemonLv2);
      let pokemonLv2Img = await getPokemonImgs(pokemonLv2);
      pokemonEvoArray.push([pokemonLv2,pokemonLv2Type, pokemonLv2Img]);

      if (response.data.chain.evolves_to[0].evolves_to.length !== 0) {
        let pokemonLv3 = response.data.chain.evolves_to[0].evolves_to[0].species.name;
        let pokemonLv3Type = await getPokemonTypes(pokemonLv3);
        let pokemonLv3Img = await getPokemonImgs(pokemonLv3);
        pokemonEvoArray.push([pokemonLv3,pokemonLv3Type, pokemonLv3Img]);
      }
    }
    setPokemonEvolutions(pokemonEvoArray);
  }

  let getPokemonTypes= async (name)=> {
    const response = await axios(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    return response.data.types[0].type.name;
  }

  let getPokemonImgs = async (name)=> {
    const response = await axios(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    return response.data.sprites.other["official-artwork"].front_default;
  }

  function prevClick() {
    pokemonId === 1 ? setPokemonId(1) : setPokemonId(pokemonId - 1);
  }
  function nextClick() {
    setPokemonId(pokemonId + 1);
  }

  return (
    <div className="app">
      <div className={`card_container card${pokemonEvolutions.length}`}>
        {pokemonEvolutions.map((pokemon) => (
          <Card key={pokemon[0]} name={pokemon[0]} type={pokemon[1]} img={pokemon[2]} />
        ))}
      </div>
      <div className="btn_container">
        <Button icon={<TiArrowLeftOutline />} handleClick={prevClick} />
          <p>{pokemonId}</p> 
        <Button icon={<TiArrowRightOutline />} handleClick={nextClick} />
      </div>
    </div>
  );
};
export { App };