import { useTheme } from "@/context/themeContext";
import { FaRegFrownOpen } from "react-icons/fa";

export default function Updates() {
  const { colors } = useTheme();

  return (
    <main className="p-10 flex justify-center">
      <div className="w-full max-w-xl flex flex-col items-center gap-4 py-20 bg-gray-50 rounded-md shadow-sm">
        <FaRegFrownOpen size={48} color="red" />
        <p className="text-base text-gray-600 text-center" style={{ color: colors.textSecondary }}>
          No updates available to show currently.
        </p>
        <p className="text-sm text-gray-400 text-center max-w-[70%]">
          We’ll notify you here when there’s something new—like friend activity or system announcements.
        </p>
      </div>
    </main>
  );
}
