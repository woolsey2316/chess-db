import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Position } from '@/models/Position';

/** Merge classes with tailwind-merge with clsx full feature */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function updateMove(moves: string, start: Position, destination: Position) {
  return `${moves}${moves.length > 0 ? " " : ""}${start.getAlgebraic()}${destination.getAlgebraic()}`
}
