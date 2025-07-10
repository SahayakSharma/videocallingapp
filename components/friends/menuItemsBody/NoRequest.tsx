import { useFriends } from "@/context/friendsContext";
import { useTheme } from "@/context/themeContext";
import { FaRegFrownOpen } from "react-icons/fa";
import ThemeButton from "@/components/customComponents/ThemeButton";

export function NoRequestsReceived() {
    const { colors } = useTheme();
    const { changeActiveMenu } = useFriends();
    return (
        <main className="w-full flex flex-col items-center gap-4 py-16 bg-gray-50 rounded-md">
            <FaRegFrownOpen size={48} color="red" />
            <p className="text-base text-gray-600" style={{ color: colors.textSecondary }}>
                No friend requests received recently.
            </p>
            <button
                onClick={() => changeActiveMenu("add-friends")}
                className="text-sm font-medium text-blue-600 underline hover:text-blue-800 transition"
            >
                Find new friends
            </button>
        </main>
    );

}


export function NoRequestSent() {
  const { colors } = useTheme();
  const { changeActiveMenu } = useFriends();

  return (
    <main className="w-full flex flex-col items-center gap-4 py-16 bg-gray-50 rounded-md">
      <FaRegFrownOpen size={48} color="red" />
      <p className="text-base text-gray-600" style={{ color: colors.textSecondary }}>
        You haven’t sent any friend requests yet.
      </p>
      <ThemeButton
        text="Find Friends to Connect"
        onClickAction={() => changeActiveMenu('add-friends')}
      />
    </main>
  );
}
