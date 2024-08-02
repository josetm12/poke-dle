import { useState, useEffect } from 'react';

//Keeping the total value hardcoded to reduce 1 extra call
const TOTAL_POKEMONS = 1025;

interface UseRandomPokemonNameReturn {
  pokemonName: string;
  loading: boolean;
  error: string | null;
}

const useRandomPokemonName = (): UseRandomPokemonNameReturn => {
  const [pokemonName, setPokemonName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRandomPokemonName = async () => {
      try {
        const randomNumber = Math.floor(Math.random() * TOTAL_POKEMONS) + 1;
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${randomNumber}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPokemonName(data.name);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomPokemonName();
  }, []);

  return { pokemonName, loading, error };
};

export default useRandomPokemonName;
