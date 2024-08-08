export interface GuessedLetter {
  [key: string]: 'correct' | 'present' | 'absent';
}

export interface GameState {
  guesses: string[];
  currentGuess: string;
  gameWin: boolean;
  guessedLetters: GuessedLetter;
}

export type GameAction =
  | { type: 'SET_GUESSES'; payload: string[] }
  | { type: 'SET_CURRENT_GUESS'; payload: string }
  | { type: 'SET_GAME_WIN'; payload: boolean }
  | { type: 'SET_GUESSED_LETTERS'; payload: GuessedLetter }
  | { type: 'RESET_GAME' };

export interface KeyboardProps {
  onKeyPress: (key: string) => void;
  guessedLetters: {
    [key: string]: 'correct' | 'present' | 'absent' | 'unused';
  };
}

export interface WordTileProps {
  letter: string;
  className: string;
}

export interface WordleGridProps {
  guesses: string[];
  currentGuess: string;
}

export interface RowProps {
  guess: string;
  isActiveRow: boolean;
}

// Interfaces and types w.r.t POKE API
export interface InnerRecord {
  name: string;
  url: string;
}

export interface UsePokemonListReturn {
  pokemonList: string[];
  loading: boolean;
  error: string | null;
}

export interface pokedexNumber {
  entry_number: number;
  pokedex: InnerRecord;
}

export interface PokemonDetailsInterface {
  name: string;
  generation: InnerRecord;
  is_legendary: boolean;
  is_mythical: boolean;
  color: InnerRecord;
  sprites: {
    front_default: string;
  };
  pokedex_numbers: pokedexNumber[];
}

export interface UseRandomPokemonNameReturn {
  pokedexNumber: number;
  pokemonDetails?: PokemonDetailsInterface;
  loading: boolean;
  error: string | null;
}

export interface ImageWithFallbackProps {
  pokedexNumber: number;
  gameWin: boolean;
  spriteBaseColor: string;
  className?: string;
  fallBack: string;
  alt: string;
}

export interface pokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}
