'use client';

import Image from 'next/image';
import pikaGif from './/pikachu-pokemon.gif';
import {
  useEffect,
  useState,
  createContext,
  useCallback,
  useContext,
} from 'react';
import ModeToggle from '@/components/ModeToggle';
import Keyboard from '@/components/Keyboard';
import WordleGrid from '@/components/WordleGrid';
import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

import useRandomPokemonName from '@/hooks/useRandomPokemonName';
import usePokemonDetails from '@/hooks/usePokemonDetails';

import { EMPTY_STRING, getNoGuesses, getInitialGuesses } from '@/lib/appConfig';

export const SolutionContext = createContext('');

const ErrorComponent = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10 bg-red-50">
      <h1 className="text-4xl font-bold text-red-600">Uh-oh!</h1>
      <p className="mt-4 text-xl text-red-500">The API is currently down.</p>
      <p className="mt-2 text-lg text-red-500">Please try again later.</p>
    </main>
  );
};

function Game({ solution }) {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameWin, setGameWin] = useState(false);
  const [guessedLetters, setGuessedLetters] = useState<{
    [key: string]: 'correct' | 'present' | 'absent' | 'unused';
  }>({});

  const {
    pokemonDetails,
    loading: detailsLoading,
    error: detailsError,
  } = usePokemonDetails(solution, gameWin);
  const lastGuessIndex = guesses.findIndex(
    (guess) => guess === EMPTY_STRING.repeat(solution.length)
  );
  const isGameOver = lastGuessIndex === -1 || gameWin;

  const eraseHandler = useCallback(() => {
    setCurrentGuess((prev) => prev.slice(0, -1));
  }, []);

  const resetHandler = useCallback(() => {
    setGameWin(false);
    setGuesses(getInitialGuesses(solution));
    setCurrentGuess('');
    setGuessedLetters({});
  }, [solution]);

  const updateGuessedLetters = useCallback(
    (guess: string) => {
      const newGuessedLetters = { ...guessedLetters };
      for (let i = 0; i < guess.length; i++) {
        const letter = guess[i].toLowerCase();
        if (solution[i] === letter) {
          newGuessedLetters[letter] = 'correct';
        } else if (
          solution.includes(letter) &&
          newGuessedLetters[letter] !== 'correct'
        ) {
          newGuessedLetters[letter] = 'present';
        } else if (!solution.includes(letter)) {
          newGuessedLetters[letter] = 'absent';
        }
      }
      setGuessedLetters(newGuessedLetters);
    },
    [guessedLetters, solution]
  );

  const handleKeyPress = useCallback(
    (key: string) => {
      if (isGameOver || solution === '') return;
      if (key === 'escape') {
        resetHandler();
      }
      if (key === 'backspace') {
        eraseHandler();
      } else if (key === 'enter' && currentGuess.length === solution.length) {
        const newGuesses = [...guesses];
        newGuesses[lastGuessIndex] = currentGuess;
        setGuesses(newGuesses);
        updateGuessedLetters(currentGuess);
        if (currentGuess === solution) {
          setGameWin(true);
        }
        setCurrentGuess('');
      } else if (/^[a-z]$/.test(key) && currentGuess.length < solution.length) {
        setCurrentGuess((prev) => prev + key);
      }
    },
    [
      currentGuess,
      resetHandler,
      eraseHandler,
      guesses,
      isGameOver,
      lastGuessIndex,
      solution,
      updateGuessedLetters,
    ]
  );

  useEffect(() => {
    resetHandler();
  }, [solution, resetHandler]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      handleKeyPress(event.key.toLowerCase());
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <>
        <div className="fixed top-2 right-2">
          <Button
            onClick={resetHandler}
            variant="outline"
            size="icon"
            className="mr-2"
          >
            <RotateCcw className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          </Button>
          <ModeToggle />
        </div>
        <SolutionContext.Provider value={solution}>
          <WordleGrid guesses={guesses} currentGuess={currentGuess} />
        </SolutionContext.Provider>
        {gameWin && <p>You WIN</p>}
        {isGameOver && !gameWin && <p>Game Over. Try again?</p>}
        <p>Solution is: {solution}</p>
        <Keyboard onKeyPress={handleKeyPress} guessedLetters={guessedLetters} />
      </>
    </main>
  );
}

export default function Home() {
  const {
    pokemonName: solution,
    loading: solutionLoading,
    error: apiError,
  } = useRandomPokemonName();

  const isSiteDown = !!apiError;
  debugger;
  return (
    <>
      {solutionLoading ? (
        <div className="flex items-center justify-center my-auto min-h-svh">
          <Image src={pikaGif} alt="Loading Icon" height={50} width={50} />
          ...
        </div>
      ) : isSiteDown ? (
        <ErrorComponent />
      ) : (
        <Game solution={solution} />
      )}
    </>
  );
}
