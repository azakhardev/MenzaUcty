import React, {useState, useMemo, useEffect} from 'react';
import HistoryList from '../components/ui/HistoryList';
import type {MealsHistory} from '../api/models/mealsHistory';
import {getUsers} from '../api/users/users';
import {useCanteenStore} from '../store/store';
import BackButton from "../components/BackButton.tsx";
import {ChevronDown} from "lucide-react";
import HistoryLoader from "../components/ui/loaders/HistoryLoader.tsx";


const getAvailableYears = (items: MealsHistory[]): string[] => {
    const uniqueYears = new Set<string>();
    items.forEach(item => {
        if (item.date) {
            uniqueYears.add(new Date(item.date).getFullYear().toString());
        }
    });
    return Array.from(uniqueYears).sort().reverse();
};


const HistoryPage: React.FC = () => {

    const [historyData, setHistoryData] = useState<MealsHistory[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

    const {getUserHistory} = getUsers();

    const {user} = useCanteenStore();
    const userId = user?.id;

    useEffect(() => {
        const fetchHistory = async () => {
            if (!userId) {
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setError(null);

                const dataFromApi = await getUserHistory(userId);

                const sortedData = (dataFromApi as unknown as MealsHistory[]).sort((a, b) => {
                    if (!a.date || !b.date) return 0;
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                });

                setHistoryData(sortedData);

            } catch (err) {
                console.error("Chyba při načítání historie:", err);
                setError("Nastala chyba při načítání historie. Zkontrolujte spojení s backendem.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchHistory();
    }, [userId]);


    const availableYears = useMemo(() => getAvailableYears(historyData), [historyData]);
    const [selectedYear, setSelectedYear] = useState(availableYears[0] || new Date().getFullYear().toString());

    const allMonths = useMemo(() => {
        const months = [];
        const currentYear = parseInt(selectedYear);
        for (let i = 0; i < 12; i++) {
            const month = (i + 1).toString().padStart(2, '0');
            months.push(`${currentYear}-${month}`);
        }
        return months;
    }, [selectedYear]);

    const [selectedMonth, setSelectedMonth] = useState(
        `${selectedYear}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}`
    );

    useEffect(() => {
        const latestMonthWithDataKey = historyData.find(item =>
            item.date && item.date.startsWith(selectedYear)
        )?.date!.substring(0, 7);

        if (latestMonthWithDataKey) {
            setSelectedMonth(latestMonthWithDataKey);
        } else {
            setSelectedMonth(`${selectedYear}-01`);
        }
    }, [selectedYear, historyData]);

    const filteredData = useMemo(() => {
        if (!selectedMonth) return [];

        return historyData.filter(item => {
            return item.date && item.date.startsWith(selectedMonth);
        });
    }, [historyData, selectedMonth]);


    const monthlyStats = useMemo(() => {
        if (filteredData.length === 0) {
            return {count: 0, totalSpent: 0, avgPrice: 0, totalCalories: 0};
        }

        const totalSpent = filteredData.reduce((sum, item) => sum + Math.abs(parseFloat(String(item.price || 0))), 0);
        const count = filteredData.length;
        const avgPrice = totalSpent / count;

        //@ts-ignore
        const totalCalories = filteredData.reduce((sum, item) => sum + (Number(item.kcal) || 0), 0);

        return {
            count: count,
            totalSpent: Math.round(totalSpent),
            avgPrice: Math.round(avgPrice),
            totalCalories: totalCalories
        };
    }, [filteredData]);


    const displaySelectedMonth = selectedMonth
        ? new Date(selectedMonth).toLocaleDateString('cs-CZ', {month: 'long', year: 'numeric'})
        : 'Žádná data';


    if (isLoading) {
        return <HistoryLoader/>;
    }

    if (error) {
        return <div className="text-center p-8 text-red-600 font-bold">{error}</div>;
    }

    if (historyData.length === 0) {
        return <div className="text-center p-8 text-gray-500 text-2xl">V celkové historii nemáte žádné objednávky.</div>;
    }


    const dataMessage = filteredData.length === 0 ?
        <div className="text-center p-8 text-gray-500 bg-white rounded-lg shadow-md text-2xl">V tomto měsíci nemáte žádné
            objednávky.</div> :
        <HistoryList items={filteredData}/>;


    return (
        <>
            <BackButton/>
            <div className="min-h-screen p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    <div
                        className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-md mb-6">
                        <div className="relative mb-4 sm:mb-0 sm:mr-4">
                            <button
                                onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
                                className={`px-4 py-2 text-md font-bold rounded-lg transition-colors cursor-pointer flex items-center ${
                                    isYearDropdownOpen ? 'bg-blue-700 text-white shadow-lg' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                                }`}
                            >
                                {selectedYear}
                                <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isYearDropdownOpen ? 'rotate-180' : 'rotate-0'}`}/>
                            </button>

                            {isYearDropdownOpen && (
                                <div
                                    className="absolute top-full mt-2 w-full max-h-48 overflow-y-auto bg-white rounded-lg shadow-xl border border-gray-200 z-10">
                                    {availableYears.map(year => (
                                        <button
                                            key={year}
                                            onClick={() => {
                                                setSelectedYear(year);
                                                setIsYearDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2 text-gray-800 transition-colors cursor-pointer ${
                                                selectedYear === year
                                                    ? 'bg-blue-500 text-white'
                                                    : 'hover:bg-gray-100'
                                            }`}
                                        >
                                            {year}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div
                            className="flex justify-around bg-gray-100 p-2 rounded-lg shadow-inner flex-wrap w-full sm:w-auto">
                            {allMonths.map(monthKey => {
                                const date = new Date(monthKey);

                                const hasDataInMonth = historyData.some(item => item.date && item.date.startsWith(monthKey));

                                const isInactive = !hasDataInMonth && monthKey !== selectedMonth;

                                return (
                                    <button
                                        key={monthKey}
                                        onClick={() => !isInactive && setSelectedMonth(monthKey)}
                                        className={`px-3 py-1 text-sm font-semibold rounded-lg transition-colors m-0.5 ${
                                            selectedMonth === monthKey
                                                ? 'bg-blue-600 text-white shadow-md cursor-pointer'
                                                : isInactive
                                                    ? 'text-gray-400 bg-gray-50 cursor-default pointer-events-none'
                                                    : 'text-gray-700 hover:bg-gray-200 cursor-pointer'
                                        }`}
                                    >
                                        {date.toLocaleDateString('cs-CZ', {month: 'long'})}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-6 h-full">

                        <div className="flex-1 min-w-0 bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-extrabold text-gray-800 mb-4 pb-2 border-b-2 border-gray-300">
                                Historie objednávek ({displaySelectedMonth})
                            </h2>
                            {dataMessage}
                        </div>

                        <div
                            className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-2xl border border-gray-100 h-fit lg:sticky lg:top-4">
                            <h3 className="text-2xl font-extrabold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                                Statistika za měsíc
                            </h3>
                            <div className="space-y-4 text-gray-700 text-lg">
                                <p className="flex justify-between border-b border-gray-100 pb-3">
                                    Počet objednávek:
                                    <span className="font-bold text-gray-900">{monthlyStats.count}</span>
                                </p>
                                <p className="flex justify-between border-b border-gray-100 pb-3">
                                    Celkem utraceno:
                                    <span className="font-bold text-red-600">{monthlyStats.totalSpent}, - Kč</span>
                                </p>
                                <p className="flex justify-between border-b border-gray-100 pb-3">
                                    Průměrná cena:
                                    <span className="font-bold text-gray-900">{monthlyStats.avgPrice}, - Kč</span>
                                </p>
                                <p className="flex justify-between">
                                    Kalorický príjem:
                                    <span className="font-bold text-gray-900">{monthlyStats.totalCalories} KCal</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HistoryPage;