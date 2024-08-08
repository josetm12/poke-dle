import { useState, useEffect } from 'react';

//Keeping the total value hardcoded to reduce 1 extra call
const TOTAL_POKEMONS = 1025;

interface pokeData {
  name: string;
  color: {
    name: string;
    url: string;
  };
  id: number;
}

interface UseRandomPokemonNameReturn {
  data: pokeData | null;
  pokemonName: string;
  loading: boolean;
  error: string | null;
}

const randomNumber = Math.floor(Math.random() * TOTAL_POKEMONS) + 1;

const useRandomPokemonName = (): UseRandomPokemonNameReturn => {
  const [pokemonName, setPokemonName] = useState<string>('');
  const [data, setData] = useState<pokeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRandomPokemonName = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${randomNumber}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPokemonName(data.name);
        setData(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomPokemonName();
  }, []);

  return { pokemonName, data, loading, error };
};

export default useRandomPokemonName;
