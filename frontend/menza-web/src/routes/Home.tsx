import {useEffect, useState} from "react";
import type {DailyMenuResponse} from "../api/models";
import {useCanteenStore} from "../store/store.ts";
import {getMenu} from "../api/menu/menu.ts";
import {dateToMenuString} from "../utils/dateUtils.ts";

export default function Home() {

    const axiosMenu = getMenu();
    const canteen = useCanteenStore(state => state.currentCanteen);

    const [menu, setMenu] = useState<DailyMenuResponse>();

    useEffect(() => {
        async function loadMenu() {
            const response = await axiosMenu.getMenu(canteen, dateToMenuString(new Date()));

            const data = response.data;

            setMenu(data);
        }

        loadMenu();

    }, []);

    return <div>
        {!menu ? <p>Loading....</p> : <div className="flex flex-col gap-2">
            Seznam jídel
        </div>}
    </div>
}