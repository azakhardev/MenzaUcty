import React from 'react';
import HistoryItem from './HistoryItem';
import type { MealsHistory } from '../../api/models/mealsHistory';
import { Link } from 'react-router-dom';

interface HistoryListProps {
    items: MealsHistory[];
    limit?: number;
}

const groupItemsByMonth = (items: MealsHistory[]) => {
    return items.reduce((acc, item: MealsHistory) => {
        if (!item.date) return acc;

        const date = new Date(item.date);

        const sortKey = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0');

        const displayKey = date.toLocaleDateString('cs-CZ', {
            month: 'long',
            year: 'numeric'
        });

        if (!acc[sortKey]) {
            acc[sortKey] = { title: displayKey, items: [] };
        }
        acc[sortKey].items.push(item);
        return acc;
    }, {} as Record<string, { title: string, items: MealsHistory[] }>);
};

const HistoryList: React.FC<HistoryListProps> = ({ items, limit }) => {
    const limitedItems = limit ? items.slice(0, limit) : items;

    const groupedItems = groupItemsByMonth(limitedItems);

    const sortedKeys = Object.keys(groupedItems).sort().reverse();

    const scrollWrapperClass = limit ? 'max-h-96 overflow-y-auto' : '';


    return (
        <div className="bg-white rounded-lg shadow-lg">

            <div className={scrollWrapperClass}>

                {sortedKeys.map((sortKey) => {
                    const group = groupedItems[sortKey];

                    return (
                        <div key={sortKey} className="mb-0">

                            {!limit && (
                                <div className="bg-blue-600 text-white font-bold py-2 px-4 sticky top-0 shadow-md">
                                    {group.title.charAt(0).toUpperCase() + group.title.slice(1)}
                                </div>
                            )}

                            <div className={`${!limit ? 'border border-gray-300' : ''}`}>
                                {group.items.map((item) => (
                                    <HistoryItem key={item.id} item={item} />
                                ))}
                            </div>

                        </div>
                    );
                })}

            </div>

            {limit && items.length > limit && (
                <div className="text-center pt-2 px-4 pb-2 border-t border-gray-200">
                    <Link to="/history" className="text-blue-600 font-semibold hover:underline">
                        Více
                    </Link>
                </div>
            )}
        </div>
    );
};

export default HistoryList;