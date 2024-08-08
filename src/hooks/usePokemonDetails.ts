import { useState, useEffect } from 'react';
import { pokemonType } from '@/lib/types';

interface PokemonDetails {
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: pokemonType[];
  sprites: {
    front_default: string;
  };
}

interface UsePokemonDetailsReturn {
  pokemonDetails: PokemonDetails | null;
  loading: boolean;
  error: string | null;
}

const usePokemonDetails = (pokemonName: string): UsePokemonDetailsReturn => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    //Only return the details if the game has been won
    if (!pokemonName) return;

    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPokemonDetails(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [pokemonName]);

  return { pokemonDetails, loading, error };
};

export default usePokemonDetails;
