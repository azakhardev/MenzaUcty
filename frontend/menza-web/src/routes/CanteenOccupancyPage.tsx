import {useCanteenStore} from "../store/store.ts";
import {getCanteenOccupancy} from "../api/canteen-occupancy/canteen-occupancy.ts";
import {useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {DAYS} from "../utils/constants.ts";
import Button from "../components/ui/Button.tsx";
import {Bar, BarChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import BackButton from "../components/BackButton.tsx";
import Spinner from "../components/ui/loaders/Spinner.tsx";

type ChartItem = {
    name: string;
    occupancy: number;
}

type ChartData = ChartItem[]

function RechartsHookInspector() {
    return null;
}

export default function CanteenOccupancyPage() {
    const currentCanteen = useCanteenStore(set => set.currentCanteen);
    const [charData, setCharData] = useState<ChartData | undefined>(undefined)
    const [day, setDay] = useState<keyof typeof DAYS>("MON");
    const {getOccupancy} = getCanteenOccupancy();

    const occupancyQuery = useQuery({
        queryFn: async () => getOccupancy(currentCanteen),
        queryKey: ["occupancy", currentCanteen],
        select: data => data.occupancy
    })

    useEffect(() => {
        if (occupancyQuery.data) {
            const data = occupancyQuery.data[day];
            const mappedData = Object.entries(data).map(([key, value]) => ({name: key, occupancy: value}))
            setCharData(mappedData)
        }
    }, [occupancyQuery.isFetching, day]);

    if (occupancyQuery.isLoading) {
        return <div className="h-[40vh] w-screen flex items-end justify-center"><Spinner/></div>;
    }

    if (occupancyQuery.isError) {
        return <div className="text-center p-8 text-red-600 font-bold">{occupancyQuery.error.message}</div>;
    }

    return <>
        <BackButton/>
        <div
            className="relative flex flex-col-reverse md:flex-row mt-20 gap-10 w-full justify-around items-center px-6 lg:px-[10%] 2xl:px-[20%] h-[500px] z-0!">
            <div className="flex flex-row md:flex-col gap-4">
                {Object.entries(DAYS).map(([key, val]) => <Button
                    className={`${day === key && "bg-blue-400!"} md:text-2xl p-4! md:p-6!`}
                    onClick={() => {
                        setDay(key)
                    }} key={key}>{val}</Button>)}
            </div>
            <ResponsiveContainer className="md:flex-1"
            >
                <BarChart
                    className="bg-white p-4 rounded-md shadow-md"
                    barCategoryGap="5"
                    data={charData}
                    height="100%"
                    margin={{
                        bottom: 5,
                        left: -25,
                        top: 5
                    }}
                    width="100%"
                >
                    <XAxis dataKey="name" stroke="#000000"
                           tick={{fill: '#000000'}} />
                    <YAxis dataKey="occupancy" stroke="#000000"
                           tick={{fill: '#000000'}}/>
                    <Tooltip/>
                    <Bar
                        activeBar={<Rectangle fill="#4052D6" stroke="blue"/>}
                        dataKey="occupancy"
                        name="Zatíženost"
                        fill="#6395EE"
                    />
                    <RechartsHookInspector/>
                </BarChart>
            </ResponsiveContainer>

        </div>
    </>
}