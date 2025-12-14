import React from 'react';
import type { MealsHistory } from '../../api/models/mealsHistory';

interface MealsHistoryProps {
    item: MealsHistory;
}

const HistoryItem: React.FC<MealsHistoryProps> = ({ item }) => {

    const priceValue = parseFloat(String(item.price || 0));
    const priceColor = (priceValue < 0) ? 'text-red-500' : 'text-green-500';
    const formattedPrice = `${priceValue}, - Kč`;

    const displayDate = item.date ? new Date(item.date).toLocaleDateString('cs-CZ') : 'Datum chybí';

    const mealDisplayName = (item as any).name || (item as any).mealName || "Název nebyl nalezen";


    return (
        <div className="flex justify-between items-center py-2 px-4 border-b border-gray-200 hover:bg-gray-50">

            <div className="flex flex-col">
                <span className="font-bold text-sm">
                    {displayDate}
                </span>
                <span className="text-sm text-gray-700">
                    {mealDisplayName}
                </span>
            </div>

            <div className={`${priceColor} font-bold text-sm`}>
                {formattedPrice}
            </div>

        </div>
    );
};

export default HistoryItem;