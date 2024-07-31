'use client';

import Image from 'next/image';
import Keyboard from './components/Keyboard';
import WordleGrid from './components/WordleGrid';
import { useEffect, useState } from 'react';

export default function Home() {
  const [solution, setSolution] = useState('');
  const [guesses, setGuesses] = useState(Array(6).fill('     '));

  useEffect(() => {
    setSolution('Hello');
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <WordleGrid guesses={guesses} />
      <Keyboard />
    </main>
  );
}
