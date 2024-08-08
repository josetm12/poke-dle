import {
  // useReducer,
  createContext,
  // useCallback,
  // useEffect,
  // useContext,
} from 'react';

import { GameAction, GameState } from '@/lib/types';

const initialContextValue = '';

const initialState = {
  guesses: [],
  currentGuess: '',
  gameWin: false,
  guessedLetters: {},
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'SET_GUESSES':
      return { ...state, guesses: action.payload };
    case 'SET_CURRENT_GUESS':
      return { ...state, currentGuess: action.payload };
    case 'SET_GAME_WIN':
      return { ...state, gameWin: action.payload };
    case 'SET_GUESSED_LETTERS':
      return { ...state, guessedLetters: action.payload };
    case 'RESET_GAME':
      return initialState;
    default:
      return state;
  }
};

const GameContext = createContext(initialContextValue);

export { initialState, gameReducer, GameContext };
