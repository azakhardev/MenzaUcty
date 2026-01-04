import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {useShallow} from "zustand/react/shallow";
import {useNavigate} from "react-router-dom";

import {useCanteenStore} from "../store/store.ts";
import {getMenu as getMenuFunctions} from "../api/menu/menu.ts";
import {dateToMenuString} from "../utils/dateUtils.ts";
import Menu from "../components/ui/menu/Menu.tsx";
import Calendar from "../components/ui/calendar/Calendar.tsx";
import Buffet from "../components/ui/buffet/Buffet.tsx";

import type {DailyMenuResponse, BuffetMenu} from "../api/models";
import BackButton from "../components/BackButton.tsx";
import MenuPageSkeleton from "../components/ui/loaders/MenuPageSkeleton.tsx";

export default function MenuPage() {
    const navigate = useNavigate(); // Hook pro navigaci

    const {currentCanteen} = useCanteenStore(useShallow((state) => ({
        currentCanteen: state.currentCanteen,
    })));

    const {getMenu, getBuffetMenu} = getMenuFunctions();

    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const dateString = dateToMenuString(selectedDate);

    // --- QUERIES ---
    const menuQuery = useQuery<DailyMenuResponse>({
        queryFn: () => getMenu(currentCanteen, dateString),
        queryKey: ["menu", currentCanteen, dateString],
        retry: (failureCount, error: any) => {
            if (error?.response?.status === 404 || error?.status === 404) return false;
            return failureCount < 3;
        },
    });

    const buffetQuery = useQuery<BuffetMenu>({
        queryFn: () => getBuffetMenu(currentCanteen),
        queryKey: ["buffet", currentCanteen],
        retry: (failureCount, error: any) => {
            if (error?.response?.status === 404 || error?.status === 404) return false;
            return failureCount < 3;
        },
    });

    const menuError = menuQuery.error as any;
    const isMenuNotFound = menuError?.response?.status === 404 || menuError?.status === 404;
    const menuErrorMsg = (menuQuery.isError && !isMenuNotFound) ? "Chyba při načítání menu" : null;

    const buffetError = buffetQuery.error as any;
    const isBuffetNotFound = buffetError?.response?.status === 404 || buffetError?.status === 404;
    const buffetErrorMsg = (buffetQuery.isError && !isBuffetNotFound) ? "Chyba bufetu" : isBuffetNotFound ? "NOT_FOUND" : null;

    const dailyMenu = menuQuery.data || {};
    const soups = dailyMenu.soups || [];
    const mainCourses = dailyMenu.mainCourses || [];

    const availableDates: string[] = [];

    if(buffetQuery.isLoading){
        return <MenuPageSkeleton/>
    }

    // Funkce pro proklik na detail jídla
    const handleDishClick = (dishId: number) => {
        navigate(`/menu/${dishId}`);
    };

    return (
        <div className="min-h-[calc(100vh-80px)] w-full flex flex-col bg-[var(--color-background)]">

            <BackButton/>

            {/* 2. WRAPPER PRO VERTIKÁLNÍ CENTROVÁNÍ */}
            <div className="flex-1 flex flex-col pb-10">

                {/* 3. HLAVNÍ GRID */}
                <div
                    className="w-full max-w-[1600px] mx-auto flex flex-col md:flex-row items-start justify-center gap-12 px-4">

                    {/* KALENDÁŘ */}
                    <div className="w-full md:w-auto shrink-0 flex justify-center xl:justify-start relative z-10">
                        <Calendar
                            selectedDate={selectedDate}
                            onDateSelect={(date) => setSelectedDate(date)}
                            availableDates={availableDates}
                        />
                    </div>

                    <div
                        className="flex flex-col gap-4 items-center xl:flex-row xl:justify-between xl:items-start flex-1">
                        {/* MENU */}
                        <div className="w-full flex-1 min-w-0 max-w-3xl mx-auto xl:mx-0 relative z-50">
                            <Menu
                                soups={soups}
                                mainCourses={mainCourses}
                                date={selectedDate}
                                isLoading={menuQuery.isLoading}
                                error={menuErrorMsg}
                                onDishClick={handleDishClick}
                            />
                        </div>

                        {/* BUFET */}
                        <div className="w-full md:w-auto shrink-0 flex justify-center xl:justify-end relative z-10">
                            <Buffet
                                data={buffetQuery.data}
                                isLoading={buffetQuery.isLoading}
                                error={buffetErrorMsg}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}