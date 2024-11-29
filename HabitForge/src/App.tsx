import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HabitsPage from './pages/HabitsPage';
import ProgressPage from './pages/ProgressPage';
import CalendarPage from './pages/CalendarPage';
import AchievementsPage from './pages/AchievementsPage';
import HabitDetailPage from './pages/HabitDetailPage';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HabitsPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/habit/:id" element={<HabitDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}