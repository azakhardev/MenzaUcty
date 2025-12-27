import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useCanteenStore } from "../../../store/store.ts";
import { getUsers } from "../../../api/users/users.ts";
import HistoryList from "../HistoryList.tsx";
import Spinner from "../loaders/Spinner.tsx";
import type { MealsHistory } from "../../../api/models";

export default function HomeHistory() {
    const user = useCanteenStore(state => state.user);
    const { getUserHistory } = getUsers();
    const [historyDate, setHistoryDate] = useState(new Date());

    const historyMonthKey = historyDate.getFullYear() + '-' + (historyDate.getMonth() + 1).toString().padStart(2, '0');

    const historyQuery = useQuery({
        queryFn: () => getUserHistory(user?.id || 0),
        queryKey: ["userHistory", user?.id],
        enabled: !!user?.id,
        select: (data) => data as unknown as MealsHistory[]
    });

    const handleHistoryChange = (offset: number) => {
        const next = new Date(historyDate);
        next.setMonth(next.getMonth() + offset);
        setHistoryDate(next);
    };

    const stats = useMemo(() => {
        const allHistory = historyQuery.data || [];
        const monthItems = allHistory.filter(item => item.date?.startsWith(historyMonthKey));
        const totalSpent = monthItems.reduce((sum, item) => sum + Math.abs(parseFloat(String(item.price || 0))), 0);

        return {
            items: monthItems.sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime()),
            count: monthItems.length,
            total: Math.round(totalSpent)
        };
    }, [historyQuery.data, historyMonthKey]);

    return (
        <div className="flex flex-col h-[550px] shadow-xl rounded-2xl overflow-hidden bg-white border border-gray-100">
            <div className="flex flex-row justify-between items-center bg-surface text-text-on-dark py-4 px-6 shrink-0">
                <button
                    onClick={() => handleHistoryChange(-1)}
                    className="flex items-center justify-center p-1 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                >
                    <ChevronLeft size={28} />
                </button>
                <h2 className="text-xl font-bold uppercase tracking-widest select-none">
                    HISTORIE ({historyDate.toLocaleDateString('cs-CZ', { month: 'long' }).toUpperCase()} {historyDate.getFullYear()})
                </h2>
                <button
                    onClick={() => handleHistoryChange(1)}
                    className="flex items-center justify-center p-1 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                >
                    <ChevronRight size={28} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-2 bg-gray-50/30">
                {historyQuery.isLoading ? (
                    <div className="flex h-full items-center justify-center"><Spinner size="md" /></div>
                ) : (
                    <HistoryList items={stats.items} limit={3} />
                )}
            </div>

            <div className="flex flex-row justify-between items-center bg-white p-6 border-t border-gray-100 shrink-0">
                <div className="flex flex-col gap-1">
                    <p className="text-[10px] text-gray-400 uppercase font-black tracking-tighter">Měsíční útrata</p>
                    <p className="text-2xl font-black text-red-600">{stats.total},- Kč</p>
                </div>
                <div className="flex flex-col gap-1 text-right">
                    <p className="text-[10px] text-gray-400 uppercase font-black tracking-tighter">Počet jídel</p>
                    <p className="text-2xl font-black text-gray-800">{stats.count}</p>
                </div>
            </div>
        </div>
    );
}