import { useContext } from 'react';
import { GameContext } from '@/reducers/gameReducer';

export default function GameTitle({ gameWin = false, isGameOver = false }) {
  const solution = useContext(GameContext);

  console.log('title sol', solution);

  return (
    <div className="text-2xl text-ring">
      {isGameOver && !gameWin ? (
        <p>Game Over. Try again?</p>
      ) : gameWin ? (
        <p>
          It{"'"}s {solution.toLocaleUpperCase()}
        </p>
      ) : (
        <p>Who{"'"}s is that pokemon</p>
      )}
      {}
    </div>
  );
}
