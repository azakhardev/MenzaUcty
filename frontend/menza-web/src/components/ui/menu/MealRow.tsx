import { type MealOverview } from "../../../api/models";

type MealRowProps = {
    index: number;
    meal: MealOverview;
};

export const MealRow = ({ index, meal }: MealRowProps) => {
    const allergensString = meal.alergenList
        ?.map((a) => a.id)
        .join(", ");

    return (
        <div className="flex w-full flex-row justify-between items-center p-3 text-[var(--color-text)]">
            <div className="flex flex-row items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded text-xs font-bold shrink-0 bg-[var(--color-surface)] text-[var(--color-text-on-dark)]">
                    {index}
                </div>

                <div className="text-sm font-medium">
                    {meal.name}
                    {allergensString && (
                        <span className="ml-1 text-xs opacity-70">({allergensString})</span>
                    )}
                </div>
            </div>

            <div className="font-bold whitespace-nowrap pl-2">
                {meal.price ? `${meal.price},- Kč` : "Cena neuvedena"}
            </div>
        </div>
    );
};