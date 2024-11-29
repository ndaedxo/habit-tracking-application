import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, parseISO, isSameDay } from 'date-fns';
import { getHabits } from '../lib/storage';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Habit } from '../types/habit';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const habits = getHabits();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getCompletedHabitsForDay = (date: Date, habit: Habit) => {
    return habit.completedDates.some(completedDate => 
      isSameDay(parseISO(completedDate), date)
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          
          <h2 className="text-xl font-semibold text-gray-900">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Day headers */}
          {daysOfWeek.map(day => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-500 py-2"
            >
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {daysInMonth.map((date, index) => {
            const isCurrentMonth = isSameMonth(date, currentDate);
            const isCurrentDay = isToday(date);
            const dayCompletions = habits.map(habit => 
              getCompletedHabitsForDay(date, habit)
            );
            const completionCount = dayCompletions.filter(Boolean).length;
            const completionPercentage = (completionCount / habits.length) * 100;

            let bgColor = 'bg-white';
            if (completionCount > 0) {
              if (completionPercentage === 100) bgColor = 'bg-green-100';
              else if (completionPercentage >= 50) bgColor = 'bg-yellow-100';
              else bgColor = 'bg-rose-50';
            }

            return (
              <div
                key={date.toString()}
                className={`
                  aspect-square p-2 border rounded-lg
                  ${isCurrentMonth ? 'text-gray-900' : 'text-gray-300'}
                  ${isCurrentDay ? 'border-rose-500' : 'border-gray-100'}
                  ${bgColor}
                `}
              >
                <div className="text-sm font-medium">
                  {format(date, 'd')}
                </div>
                {completionCount > 0 && (
                  <div className="text-xs text-gray-500 mt-1">
                    {completionCount}/{habits.length}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 flex gap-4 justify-center text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 rounded"></div>
            <span>All Complete</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-100 rounded"></div>
            <span>Partially Complete</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-rose-50 rounded"></div>
            <span>Few Complete</span>
          </div>
        </div>

        {/* Habits Summary */}
        <div className="mt-8 space-y-4">
          <h3 className="font-medium text-gray-900">Habits Overview</h3>
          {habits.map(habit => (
            <div key={habit.id} className="flex justify-between items-center py-2 border-t">
              <div>
                <div className="font-medium text-gray-900">{habit.name}</div>
                <div className="text-sm text-gray-500">
                  {habit.completedDates.length} total completions
                </div>
              </div>
              <div className="text-sm font-medium text-rose-500">
                {habit.streak} day streak
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}