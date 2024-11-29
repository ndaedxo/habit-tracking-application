import { useState } from 'react';
import { Plus } from 'lucide-react';
import HabitCard from '../components/HabitCard';
import AddHabitModal from '../components/AddHabitModal';
import { getHabits, setHabits } from '../lib/storage';
import { Habit } from '../types/habit';

export default function HabitsPage() {
  const [habits, setHabitsState] = useState<Habit[]>(getHabits);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddHabit = (habitData: { name: string; category: string; description: string; goal: number }) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name: habitData.name,
      category: habitData.category,
      description: habitData.description,
      goal: habitData.goal,
      streak: 0,
      points: 0,
      completedDates: [],
    };

    const updatedHabits = [...habits, newHabit];
    setHabitsState(updatedHabits);
    setHabits(updatedHabits);
  };

  const handleIncrement = (id: string) => {
    const updatedHabits = habits.map(habit =>
      habit.id === id ? { ...habit, streak: habit.streak + 1, points: habit.points + 5 } : habit
    );
    setHabitsState(updatedHabits);
    setHabits(updatedHabits);
  };

  const handleDecrement = (id: string) => {
    const updatedHabits = habits.map(habit =>
      habit.id === id ? { ...habit, streak: Math.max(0, habit.streak - 1), points: Math.max(0, habit.points - 5) } : habit
    );
    setHabitsState(updatedHabits);
    setHabits(updatedHabits);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Habits</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded-full bg-rose-500 p-2 text-white hover:bg-rose-600 transition-colors"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        ))}
      </div>

      <AddHabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddHabit}
      />
    </div>
  );
}