import { Flame, Plus, Minus } from 'lucide-react';
import { Habit } from '../types/habit';
import { Link } from 'react-router-dom';

interface HabitCardProps {
  habit: Habit;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
}

export default function HabitCard({ habit, onIncrement, onDecrement }: HabitCardProps) {
  return (
    <Link
      to={`/habit/${habit.id}`}
      className="block w-full bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-gray-900">{habit.name}</h3>
          <p className="text-sm text-gray-500">{habit.category}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                onDecrement(habit.id);
              }}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <Minus className="h-4 w-4 text-gray-500" />
            </button>
            <div className="flex items-center gap-1 text-rose-500">
              <span className="font-bold">{habit.streak}</span>
              <Flame className="h-5 w-5" />
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                onIncrement(habit.id);
              }}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <Plus className="h-4 w-4 text-gray-500" />
            </button>
          </div>
          <div className="text-sm font-medium text-amber-500">
            {habit.points} pts
          </div>
        </div>
      </div>
    </Link>
  );
}