import { MealRow } from "./MealRow";
import type { MealOverview } from "../../../api/models";

type MenuProps = {
    soups: MealOverview[];
    mainCourses: MealOverview[];
    date: Date;
    isLoading?: boolean;
    error?: string | null;
    onDishClick?: (id: number) => void;
};

export default function Menu({ soups, mainCourses, date, isLoading, error, onDishClick }: MenuProps) {
    const datePart = date.toLocaleDateString("cs-CZ", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
    });
    const weekdayPart = date.toLocaleDateString("cs-CZ", { weekday: "short" });
    const formattedDate = `${datePart} (${weekdayPart})`;

    if (isLoading) return <div className="p-8 text-center text-[var(--color-text)]">Načítám menu...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

    const isEmpty = soups.length === 0 && mainCourses.length === 0;

    return (
        <div className="w-full overflow-hidden rounded-xl shadow-lg bg-[var(--color-card)] text-[var(--color-text)]">
            <div className="p-5 text-center">
                <h2 className="text-2xl font-bold">Menu k {formattedDate}</h2>
            </div>

            <div className="flex flex-col">
                {soups.length > 0 && (
                    <MenuSection title="Polévky" meals={soups} onDishClick={onDishClick} />
                )}
                {mainCourses.length > 0 && (
                    <MenuSection title="Hlavní jídla" meals={mainCourses} onDishClick={onDishClick} />
                )}

                {isEmpty && !isLoading && !error && (
                    <div className="p-8 text-center opacity-70">
                        Pro tento den není vypsané menu.
                    </div>
                )}
            </div>
        </div>
    );
}

type MenuSectionProps = {
    title: string;
    meals: MealOverview[];
    onDishClick?: (id: number) => void;
};

const MenuSection = ({ title, meals, onDishClick }: MenuSectionProps) => {
    return (
        <div className="flex flex-col">
            <div className="py-2 text-center font-semibold text-lg tracking-wide bg-[var(--color-border-contrast)] text-[var(--color-text-on-dark)]">
                {title}
            </div>
            <div className="flex flex-col">
                {meals.map((meal, index) => {
                    const isEven = index % 2 === 0;
                    const rowBackgroundClass = isEven ? "bg-[var(--color-card)]" : "bg-white";

                    return (
                        <div
                            key={meal.id || index}
                            className={`${rowBackgroundClass} cursor-pointer transition-all duration-200 hover:brightness-95 hover:shadow-inner relative`}
                            onClick={() => {
                                if (meal.id && onDishClick) {
                                    onDishClick(meal.id);
                                }
                            }}
                        >
                            <MealRow index={index + 1} meal={meal} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};