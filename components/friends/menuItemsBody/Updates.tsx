import { useTheme } from "@/context/themeContext"
import { FaRegFrownOpen } from "react-icons/fa";
export default function Updates(){
    const {colors}=useTheme();
    return(
        <main className="p-10">
            <div className="w-[50%] flex flex-col items-center gap-5">
                <FaRegFrownOpen size={50} color="red"/>
                <p className="text-center text-[15px] underline">No updates available to show currently</p>
            </div>
        </main>
    )
}