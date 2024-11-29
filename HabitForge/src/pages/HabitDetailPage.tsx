import { useParams } from 'react-router-dom';
import { getHabits } from '../lib/storage';
import { format } from 'date-fns';

export default function HabitDetailPage() {
  const { id } = useParams();
  const habits = getHabits();
  const habit = habits.find(h => h.id === id);

  if (!habit) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900">Habit not found</h2>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{habit.name}</h1>
        <div className="text-sm text-gray-500">{habit.category}</div>
        
        <div className="mt-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Description</h2>
            <p className="text-gray-600">{habit.description}</p>
          </div>

          <div className="border-t pt-4">
            <h2 className="text-lg font-semibold text-gray-900">Statistics</h2>
            <dl className="mt-2 grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm text-gray-500">Current Streak</dt>
                <dd className="text-2xl font-semibold text-rose-500">{habit.streak} days</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Points Earned</dt>
                <dd className="text-2xl font-semibold text-amber-500">{habit.points}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Daily Goal</dt>
                <dd className="text-2xl font-semibold text-gray-900">{habit.goal}</dd>
              </div>
            </dl>
          </div>

          {habit.completedDates.length > 0 && (
            <div className="border-t pt-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              <div className="mt-2 space-y-2">
                {habit.completedDates.slice(-5).map(date => (
                  <div key={date} className="text-sm text-gray-600">
                    Completed on {format(new Date(date), 'PP')}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}