import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useCanteenStore } from "../../../store/store.ts";
import { getMenu as getMenuFunctions } from "../../../api/menu/menu.ts";
import { dateToMenuString } from "../../../utils/dateUtils.ts";
import Menu from "../menu/Menu.tsx";
import Spinner from "../loaders/Spinner.tsx";
import type { DailyMenuResponse } from "../../../api/models";

export default function HomeMenu() {
    const navigate = useNavigate();
    const canteen = useCanteenStore(state => state.currentCanteen);
    const { getMenu } = getMenuFunctions();
    const today = new Date();
    const menuDateStr = dateToMenuString(today);

    const menuQuery = useQuery<DailyMenuResponse>({
        queryFn: () => getMenu(canteen, menuDateStr),
        queryKey: ["menu", canteen, menuDateStr],
    });

    return (
        <div className="flex flex-col h-[550px] shadow-xl rounded-2xl overflow-hidden bg-white border border-gray-100">
            <div
                onClick={() => navigate("/menu")}
                className="flex items-center justify-center bg-surface text-text-on-dark py-4 px-6 shrink-0 cursor-pointer hover:opacity-95 transition-all"
            >
                <h2 className="text-xl font-bold uppercase tracking-widest select-none">
                    DNEŠNÍ MENU
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto bg-[var(--color-background)] flex flex-col">
                {menuQuery.isLoading ? (
                    <div className="flex-1 flex items-center justify-center"><Spinner size="md" /></div>
                ) : (
                    <div className="min-h-full flex flex-col">
                        <Menu
                            soups={menuQuery.data?.soups || []}
                            mainCourses={menuQuery.data?.mainCourses || []}
                            date={today}
                            onDishClick={(id) => navigate(`/menu/${id}`)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}