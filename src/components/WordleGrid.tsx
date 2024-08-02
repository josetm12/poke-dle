import React, { useContext, useEffect, useState } from 'react';
import styles from './Wordlegrid.module.css';
import { cn } from '@/lib/utils';
import { SolutionContext } from '@/app/page';
import { EMPTY_STRING, getEmptyRow } from '@/lib/appConfig';

interface WordTileProps {
  letter: string;
  className: string;
}

const WordTile: React.FC<WordTileProps> = React.memo(
  ({ letter, className }) => {
    const [isFlipping, setIsFlipping] = useState(false);

    useEffect(() => {
      if (letter !== EMPTY_STRING) {
        setIsFlipping(true);
        const timer = setTimeout(() => setIsFlipping(false), 500); // 500ms matches the animation duration
        return () => clearTimeout(timer);
      }
    }, [letter]);

    return (
      <div
        className={cn(
          'flex items-center justify-center text-xl text-slate-900 dark:text-slate-200',
          styles.tile,
          className,
          isFlipping && styles.flip
        )}
      >
        {letter}
      </div>
    );
  }
);

WordTile.displayName = 'WordTile';

interface RowProps {
  guess: string;
  isActiveRow: boolean;
}

const getTileClass = (
  letter: string,
  index: number,
  solution: string[]
): string => {
  if (letter === solution[index]) return styles.correct;
  if (solution.includes(letter)) return styles.close;
  return letter !== EMPTY_STRING ? styles.incorrect : '';
};

const Row: React.FC<RowProps> = React.memo(({ guess, isActiveRow }) => {
  const solution = useContext(SolutionContext).split('');

  return (
    <div className="flex gap-1">
      {guess.split('').map((letter, i) => (
        <WordTile
          key={`Row-${i}`}
          letter={letter}
          className={isActiveRow ? '' : getTileClass(letter, i, solution)}
        />
      ))}
    </div>
  );
});

Row.displayName = 'Row';

interface WordleGridProps {
  guesses: string[];
  currentGuess: string;
}

const WordleGrid: React.FC<WordleGridProps> = ({ guesses, currentGuess }) => {
  const solution = useContext(SolutionContext);
  const activeRow = guesses.findIndex((val) => val === getEmptyRow(solution));
  const filler = EMPTY_STRING.repeat(
    Math.max(0, solution.length - currentGuess.length)
  );

  console.log('currentGuess', currentGuess);

  return (
    <div className="flex flex-col gap-1">
      {guesses.map((guess, index) => (
        <Row
          key={`WordleGrid-${index}`}
          isActiveRow={activeRow === index}
          guess={activeRow === index ? currentGuess + filler : guess}
        />
      ))}
    </div>
  );
};

export default React.memo(WordleGrid);
