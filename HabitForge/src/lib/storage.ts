import { Habit, Achievement, User } from '../types/habit';

const HABITS_KEY = 'habits';
const ACHIEVEMENTS_KEY = 'achievements';
const USER_KEY = 'user';

export const defaultHabits: Habit[] = [
  { 
    id: '1', 
    name: 'Drink Water', 
    category: 'Health', 
    streak: 5, 
    points: 10,
    description: 'Drink 8 glasses of water daily',
    goal: 8,
    completedDates: []
  },
  { 
    id: '2', 
    name: 'Read', 
    category: 'Personal Growth', 
    streak: 3, 
    points: 15,
    description: 'Read for 30 minutes',
    goal: 30,
    completedDates: []
  },
  { 
    id: '3', 
    name: 'Exercise', 
    category: 'Fitness', 
    streak: 2, 
    points: 20,
    description: 'Exercise for 30 minutes',
    goal: 30,
    completedDates: []
  },
];

export const defaultUser: User = {
  points: 0,
  level: 1,
};

export const defaultAchievements: Achievement[] = [
  { id: '1', name: 'First Step', description: 'Complete your first habit', icon: 'footsteps', unlocked: false },
  { id: '2', name: 'Week Warrior', description: 'Complete all habits for a week', icon: 'trophy', unlocked: false },
  { id: '3', name: 'Habit Master', description: 'Maintain a 30-day streak', icon: 'medal', unlocked: false },
];

export const getHabits = (): Habit[] => {
  const stored = localStorage.getItem(HABITS_KEY);
  return stored ? JSON.parse(stored) : defaultHabits;
};

export const setHabits = (habits: Habit[]) => {
  localStorage.setItem(HABITS_KEY, JSON.stringify(habits));
};

export const getUser = (): User => {
  const stored = localStorage.getItem(USER_KEY);
  return stored ? JSON.parse(stored) : defaultUser;
};

export const setUser = (user: User) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getAchievements = (): Achievement[] => {
  const stored = localStorage.getItem(ACHIEVEMENTS_KEY);
  return stored ? JSON.parse(stored) : defaultAchievements;
};

export const setAchievements = (achievements: Achievement[]) => {
  localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(achievements));
};