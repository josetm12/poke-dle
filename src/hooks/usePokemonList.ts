import { useState, useEffect } from 'react';
import { UsePokemonListReturn } from '@/lib/types';

// Function to transform the fetched data into the desired format (if necessary)
function generatePokemonList(response: any) {
  return response.results.map((item: any) => item.name);
}

const usePokemonList = (): UsePokemonListReturn => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/?offset=0&limit=1100`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const formattedList = generatePokemonList(data); // Transform the data if needed
        setPokemonList(formattedList);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, []);

  return { pokemonList, loading, error };
};

export default usePokemonList;
