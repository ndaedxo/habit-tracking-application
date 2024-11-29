export interface Habit {
  id: string;
  name: string;
  category: string;
  streak: number;
  points: number;
  description: string;
  goal: number;
  completedDates: string[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface User {
  points: number;
  level: number;
}