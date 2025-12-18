import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CalendarProps = {
    selectedDate: Date;
    onDateSelect: (date: Date) => void;
    availableDates?: string[];
};

const DAYS_OF_WEEK = ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"];

export default function Calendar({ selectedDate, onDateSelect, availableDates = [] }: CalendarProps) {
    const [currentViewDate, setCurrentViewDate] = useState(new Date(selectedDate));

    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();

    const getFirstDayOfMonth = (year: number, month: number) => {
        const day = new Date(year, month, 1).getDay();
        return day === 0 ? 6 : day - 1;
    };

    const handlePrevMonth = () => {
        setCurrentViewDate(new Date(currentViewDate.getFullYear(), currentViewDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentViewDate(new Date(currentViewDate.getFullYear(), currentViewDate.getMonth() + 1, 1));
    };

    const calendarDays = useMemo(() => {
        const year = currentViewDate.getFullYear();
        const month = currentViewDate.getMonth();

        const daysInMonth = getDaysInMonth(year, month);
        const firstDayIndex = getFirstDayOfMonth(year, month);

        const days = [];

        const prevMonthDays = getDaysInMonth(year, month - 1);
        for (let i = firstDayIndex - 1; i >= 0; i--) {
            days.push({
                day: prevMonthDays - i,
                currentMonth: false,
                date: new Date(year, month - 1, prevMonthDays - i)
            });
        }

        for (let i = 1; i <= daysInMonth; i++) {
            days.push({
                day: i,
                currentMonth: true,
                date: new Date(year, month, i)
            });
        }

        const remainingCells = 42 - days.length;
        for (let i = 1; i <= remainingCells; i++) {
            days.push({
                day: i,
                currentMonth: false,
                date: new Date(year, month + 1, i)
            });
        }

        return days;
    }, [currentViewDate]);

    const monthLabel = currentViewDate.toLocaleDateString("cs-CZ", { month: "long", year: "numeric" });
    const formattedMonthLabel = monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1);

    const isSameDay = (d1: Date, d2: Date) => {
        return d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate();
    };

    const availableDatesSet = useMemo(() => new Set(availableDates), [availableDates]);

    return (
        <div className="w-full md:w-[320px] bg-[var(--color-card)] rounded-xl shadow-lg p-4 text-[var(--color-text)]">
            <div className="flex justify-between items-center mb-4 px-1">
                <button
                    onClick={handlePrevMonth}
                    className="p-1 hover:bg-[var(--color-background)] rounded-full transition-colors text-[var(--color-text)] cursor-pointer"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                <h3 className="text-sm font-bold text-[var(--color-text)] uppercase tracking-wide">{formattedMonthLabel}</h3>

                <button
                    onClick={handleNextMonth}
                    className="p-1 hover:bg-[var(--color-background)] rounded-full transition-colors text-[var(--color-text)] cursor-pointer"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            <div className="grid grid-cols-7 mb-2">
                {DAYS_OF_WEEK.map((day) => (
                    <div key={day} className="text-center text-[10px] font-bold opacity-50 py-1 uppercase tracking-wider">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((dayObj, index) => {
                    const isSelected = isSameDay(dayObj.date, selectedDate);
                    const isToday = isSameDay(dayObj.date, new Date());
                    const dateString = dayObj.date.toLocaleDateString("sv-SE");
                    const hasMenu = availableDatesSet.has(dateString);

                    let buttonClass = "relative w-full aspect-square flex flex-col items-center justify-center rounded-md text-xs transition-all cursor-pointer ";

                    if (isSelected) {
                        buttonClass += "bg-button-primary text-text-on-dark font-bold shadow-sm";
                    } else if (dayObj.currentMonth) {
                        buttonClass += "hover:bg-background text-text";
                        if (isToday) buttonClass += " border border-border-contrast font-semibold";
                    } else {
                        buttonClass += "text-text opacity-30";
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => {
                                onDateSelect(dayObj.date);
                                if (!dayObj.currentMonth) {
                                    setCurrentViewDate(new Date(dayObj.date.getFullYear(), dayObj.date.getMonth(), 1));
                                }
                            }}
                            className={buttonClass}
                        >
                            <span>{dayObj.day}</span>

                            {hasMenu && !isSelected && (
                                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[var(--color-border-contrast)]"></span>
                            )}
                            {hasMenu && isSelected && (
                                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-white opacity-80"></span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}