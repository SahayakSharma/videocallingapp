'use client'
import { FaRegClock } from 'react-icons/fa';
import { useTheme } from '@/context/themeContext';

export default function ScheduleMeeting() {
  const { colors } = useTheme();

  return (
    <div className="flex-1 px-4 md:px-8 py-20 flex flex-col items-center justify-center text-center gap-6">
      <FaRegClock size={60} color={colors.textSecondary} />
      <h1 className="text-3xl font-bold" style={{ color: colors.text }}>Schedule Meeting</h1>
      <p className="text-lg text-gray-500 max-w-xl" style={{ color: colors.textSecondary }}>
        {`We're working on a feature that will let you schedule meetings ahead of time with reminders and calendar sync. 
        Stay tuned — it's coming very soon!`}
      </p>
    </div>
  );
}
