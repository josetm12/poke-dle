import React from 'react';
import styles from './Wordlegrid.module.css';

import { cn } from '@/lib/utils';

interface WordTileProps {
  letter: string;
}

const WordTile: React.FC<WordTileProps> = ({ letter }) => {
  return <div className={cn('test CHANGE ME', styles.tile)}>{letter}</div>;
};

interface RowProps {
  guess: string;
}

const Row: React.FC<RowProps> = ({ guess }) => {
  let rowTiles = [];

  for (let i = 0; i < guess.length; i++) {
    rowTiles.push(<WordTile key={`Row-${i}`} letter={guess[i]} />);
  }

  return <div className="flex gap-1">{rowTiles}</div>;
};

interface WordleGridProps {
  guesses: string[];
}

const WordleGrid: React.FC<WordleGridProps> = ({ guesses }) => {
  return (
    <div className="flex flex-col gap-1">
      {guesses.map((guess: string, index: number) => {
        return <Row key={`WordleGrid-${index}`} guess={guess} />;
      })}
    </div>
  );
};

export default WordleGrid;
