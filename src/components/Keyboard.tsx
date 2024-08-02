import React from 'react';
import styles from './Keyboard.module.css';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  guessedLetters: {
    [key: string]: 'correct' | 'present' | 'absent' | 'unused';
  };
}

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
];

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, guessedLetters }) => {
  console.log('guessed', guessedLetters);
  const handleKeyClick = (key: string) => {
    if (key === 'BACKSPACE') {
      onKeyPress('backspace');
    } else if (key === 'ENTER') {
      onKeyPress('enter');
    } else {
      onKeyPress(key.toLowerCase());
    }
  };

  console.log('render KB');

  return (
    <div className={styles.keyboard}>
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {row.map((key) => (
            <button
              key={key}
              onClick={() => handleKeyClick(key)}
              className={`${styles.key} ${
                styles[guessedLetters[key.toLowerCase()] || 'unused']
              }`}
            >
              {key === 'BACKSPACE' ? '←' : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
