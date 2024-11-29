import { Medal, Trophy, Footprints } from 'lucide-react';
import { getAchievements } from '../lib/storage';
import { Achievement } from '../types/habit';

const icons = {
  medal: Medal,
  trophy: Trophy,
  footsteps: Footprints,
};

export default function AchievementsPage() {
  const achievements = getAchievements();

  const getIcon = (iconName: string) => {
    const Icon = icons[iconName as keyof typeof icons] || Trophy;
    return Icon;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Achievements</h1>
      
      <div className="grid gap-4">
        {achievements.map((achievement: Achievement) => {
          const Icon = getIcon(achievement.icon);
          return (
            <div
              key={achievement.id}
              className={`p-4 rounded-xl ${
                achievement.unlocked
                  ? 'bg-white'
                  : 'bg-gray-100'
              } shadow-sm`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-full ${
                  achievement.unlocked
                    ? 'bg-rose-100 text-rose-500'
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className={`font-semibold ${
                    achievement.unlocked
                      ? 'text-gray-900'
                      : 'text-gray-500'
                  }`}>
                    {achievement.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}