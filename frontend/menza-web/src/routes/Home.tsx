import {useEffect, useState} from "react";
import type {WeeklyMenu} from "../api/models";
import {useCanteenStore} from "../store/store.ts";
import {getMenu} from "../api/menu/menu.ts";

export default function Home() {

    const axiosMenu = getMenu();
    const canteen = useCanteenStore(state => state.currentCanteen);

    const [menu, setMenu] = useState<WeeklyMenu>();

    useEffect(() => {
        async function loadMenu() {
            const response = await axiosMenu.getMenu(canteen);

            const data = response.data;

            setMenu(data);
        }

        loadMenu();

    }, []);

    return <div>
        {!menu ? <p>Loading....</p> : <div className="flex flex-col gap-2">
            <h2 className="text-3xl">Dny</h2>
            {menu.days?.map((d) => {
                return <div className="flex flex-col gap-1">
                    <h3 className="text-2xl">{d.date}</h3>
                    <h4 className="text-xl">Hlavní jídla</h4>
                    <div>
                        {JSON.stringify(d.mainCourses)}
                    </div>
                    <h4 className="text-xl">Polévky</h4>
                    <div>
                        {JSON.stringify(d.soups)}
                    </div>
                </div>
            })}
        </div>}
    </div>
}