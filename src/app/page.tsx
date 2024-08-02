'use client';

import { useEffect, useState, createContext, useCallback } from 'react';
import ModeToggle from '@/components/ModeToggle';
import Keyboard from '@/components/Keyboard';
import WordleGrid from '@/components/WordleGrid';
import { Eraser, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

import useRandomPokemonName from '@/hooks/useRandomPokemonName';
import usePokemonDetails from '@/hooks/usePokemonDetails';

const EMPTY_STRING_5 = '     ';
const INITIAL_GUESSES = Array(6).fill(EMPTY_STRING_5);

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

export default function Home() {
  const [guesses, setGuesses] = useState(INITIAL_GUESSES);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameWin, setGameWin] = useState(false);
  const [guessedLetters, setGuessedLetters] = useState<{
    [key: string]: 'correct' | 'present' | 'absent' | 'unused';
  }>({});

  const lastGuessIndex = guesses.findIndex((guess) => guess === EMPTY_STRING_5);
  const isGameOver = lastGuessIndex === -1 || gameWin;
  const {
    pokemonName: solution,
    loading: nameLoading,
    error: nameError,
  } = useRandomPokemonName();
  const {
    pokemonDetails,
    loading: detailsLoading,
    error: detailsError,
  } = usePokemonDetails(solution, gameWin);
  const isSiteDown = !!nameError;

  const eraseHandler = useCallback(() => {
    setCurrentGuess((prev) => prev.slice(0, -1));
  }, []);

  const resetHandler = useCallback(() => {
    setGameWin(false);
    setGuesses(INITIAL_GUESSES);
    setCurrentGuess('');
    setGuessedLetters({});
  }, []);

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
      } else if (key === 'enter' && currentGuess.length === 5) {
        const newGuesses = [...guesses];
        newGuesses[lastGuessIndex] = currentGuess;
        setGuesses(newGuesses);
        updateGuessedLetters(currentGuess);
        if (currentGuess === solution) {
          setGameWin(true);
        }
        setCurrentGuess('');
      } else if (/^[a-z]$/.test(key) && currentGuess.length < 5) {
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

  // useEffect(() => {
  //   try {
  //     fetch('https://random-word-api.herokuapp.com/word?length=5')
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setSolution(data[0]);
  //         setIsLoading(false);
  //       });
  //   } catch (error) {
  //     setIsSiteDown(true);
  //   }
  // }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      handleKeyPress(event.key.toLowerCase());
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      {nameLoading ? (
        <div className="flex items-center justify-center my-auto">
          <div className="loader text-xl">Loading...</div>
        </div>
      ) : isSiteDown ? (
        <ErrorComponent />
      ) : (
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
          <Keyboard
            onKeyPress={handleKeyPress}
            guessedLetters={guessedLetters}
          />
        </>
      )}
    </main>
  );
}
