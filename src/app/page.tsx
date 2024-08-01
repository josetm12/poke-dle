'use client';

import Image from 'next/image';
import ModeToggle from '@/components/ModeToggle';
import Keyboard from '@/components/Keyboard';
import WordleGrid from '@/components/WordleGrid';
import { useEffect, useState, createContext } from 'react';

import { Eraser, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { debug } from 'console';
const EMPTY_STRING_1 = ' ';
const EMPTY_STRING_5 = '     ';

export const SolutionContext = createContext(''); // initialize with empty string of 5 chars

export default function Home() {
  const [solution, setSolution] = useState('');
  const [guesses, setGuesses] = useState(Array(6).fill(EMPTY_STRING_5));
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameWin, setGameWin] = useState(false);
  const lastGuessIndex = guesses.findIndex((guess) => guess === EMPTY_STRING_5);

  const isGameOver = lastGuessIndex === -1 || gameWin;

  const eraseHandler = () => {
    if (currentGuess === '') return;

    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const resetHandler = () => {
    setGameWin(false);
    setGuesses(Array(6).fill(EMPTY_STRING_5));
    setCurrentGuess('');
  };

  useEffect(() => {
    setSolution('hello');
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const regexPatternLetters = /^[A-Za-z]$/;

      //Dont accept any keystrokes if the game is over (win/lose)
      // if (isGameOver || gameWin) {
      //   return;
      // }

      if (key === 'backspace') {
        setCurrentGuess(currentGuess.slice(0, -1));
        return;
      }

      if (key === 'enter') {
        debugger;
        if (currentGuess.length < 5) return;

        let currentGuesses: string[] = [...guesses];
        currentGuesses[lastGuessIndex] = currentGuess;
        setGuesses(currentGuesses);
        if (currentGuess === solution) {
          setGameWin(true);
        }
        setCurrentGuess('');
        return;
      }

      //only Enter, Backspace and letters are allowed
      if (!regexPatternLetters.test(key) || currentGuess.length > 4) return;

      setCurrentGuess(currentGuess + key);
    };

    if (solution === '' || (!isGameOver && !gameWin))
      window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    currentGuess,
    setCurrentGuess,
    isGameOver,
    guesses,
    lastGuessIndex,
    gameWin,
    solution,
  ]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <div className="fixed top-2 right-2">
        <ModeToggle />
      </div>
      <SolutionContext.Provider value={solution}>
        <WordleGrid guesses={guesses} currentGuess={currentGuess} />
      </SolutionContext.Provider>
      {gameWin && 'You WIN'}
      {isGameOver && !gameWin && 'Game Over. Try again ?'}
      {'solution is ' + solution}
      <Keyboard />
      <div className="flex items-center justify-center gap-10">
        <Button onClick={eraseHandler} variant="outline" size="icon">
          <Eraser className="h-4 w-4" />
        </Button>
        <Button onClick={resetHandler} variant="outline" size="icon">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </main>
  );
}
