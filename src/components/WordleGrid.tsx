import React, { useContext, useMemo } from 'react';
import styles from './Wordlegrid.module.css';

import { cn } from '@/lib/utils';

import { SolutionContext } from '@/app/page';

const EMPTY_STRING_1 = ' ';
interface WordTileProps {
  letter: string;
  className: string;
}

const WordTile: React.FC<WordTileProps> = ({ letter, className }) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center text-xl text-slate-900 dark:text-slate-200',
        styles.tile,
        className
      )}
    >
      {letter}
    </div>
  );
};

interface RowProps {
  guess: string;
  isActiveRow: boolean;
}

const getTileClass = (
  letter: string,
  index: number,
  solution: string[]
): string => {
  let tileClass = '';
  debugger;
  if (letter === solution[index]) {
    tileClass = styles.correct;
  } else if (solution.indexOf(letter) > -1) {
    tileClass = styles.close;
  } else if (letter !== ' ') {
    tileClass = styles.incorrect;
  }

  return tileClass;
};

const Row: React.FC<RowProps> = ({ guess, isActiveRow }) => {
  let rowTiles = [];

  const solution = useContext(SolutionContext).split('');

  for (let i = 0; i < guess.length; i++) {
    const letter = guess[i];
    const WordTileClass = isActiveRow ? '' : getTileClass(letter, i, solution);

    rowTiles.push(
      <WordTile key={`Row-${i}`} letter={letter} className={WordTileClass} />
    );
  }

  return <div className="flex gap-1">{rowTiles}</div>;
};

interface WordleGridProps {
  guesses: string[];
  currentGuess: string;
}

const WordleGrid: React.FC<WordleGridProps> = ({ guesses, currentGuess }) => {
  const activeRow = guesses.findIndex((val) => val === '     ');
  const fillerLength = 5 - currentGuess.length;
  const filler = fillerLength > -1 ? EMPTY_STRING_1.repeat(fillerLength) : '';

  console.log('Current Guess', currentGuess + filler, '|');
  console.log('currentIndex ', activeRow);

  return (
    <div className="flex flex-col gap-1">
      {guesses.map((guess: string, index: number) => {
        return (
          <Row
            key={`WordleGrid-${index}`}
            isActiveRow={activeRow === index}
            guess={activeRow === index ? currentGuess + filler : guess}
          />
        );
      })}
    </div>
  );
};

export default WordleGrid;
