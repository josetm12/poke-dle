export const EMPTY_STRING = ' ';
export const EMPTY_STRING_5 = '     ';

export function getNoGuesses(solution: string): number {
  if (!solution || solution.length >= 5) {
    return 6;
  } else {
    return 4;
  }
}

export function getInitialGuesses(solution: string): string[] {
  const len = getNoGuesses(solution);
  return Array(len).fill(EMPTY_STRING.repeat(solution.length));
}

export function getEmptyRow(solution: string): string {
  return EMPTY_STRING.repeat(solution.length);
}
