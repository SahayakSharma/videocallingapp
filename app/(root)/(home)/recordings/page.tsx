'use client'
import { FaVideoSlash } from 'react-icons/fa';
import { useTheme } from '@/context/themeContext';

export default function Recordings() {
  const { colors } = useTheme();

  return (
    <div className="flex-1 px-4 md:px-8 py-20 flex flex-col items-center justify-center text-center gap-6">
      <FaVideoSlash size={60} color={colors.textSecondary} />
      <h1 className="text-3xl font-bold" style={{ color: colors.text }}>Meeting Recordings</h1>
      <p className="text-lg text-gray-500 max-w-xl" style={{ color: colors.textSecondary }}>
        You’ll soon be able to record your meetings and revisit them anytime from this page.
        The feature is under development and will be available soon!
      </p>
    </div>
  );
}
