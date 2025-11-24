import {useEffect, useRef, useState} from "react";
import {BanknoteArrowUp, ChartColumnBig, LogOut, User, Utensils} from "lucide-react";
import {Link} from "react-router-dom";
import CanteenSelector from "./CanteenSelector.tsx";
import {useCanteenStore} from "../../store/store.ts";

export default function HeaderMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const user = useCanteenStore(set => set.user);

    function logout() {
        sessionStorage.removeItem("user");
        window.location.reload();
    }

    useEffect(() => {
        function onClickOutside(ev: MouseEvent) {
            if (ref.current && !ref.current.contains(ev.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", onClickOutside);

        return () => document.removeEventListener("mousedown", onClickOutside);
    }, []);

    return <div ref={ref} className="relative">
        <div className="flex flex-row gap-2 items-center">
            <p className="text-xl">{user?.username}</p>
            <button onClick={() => setIsOpen(old => !old)}
                    className="bg-button-secondary rounded-full flex items-center justify-center p-2 cursor-pointer hover:bg-button-secondary-hover transition-all">
                <User color="black" size={36}/>
            </button>
        </div>
        {isOpen && <div
            className="absolute bg-card top-[110%] right-0 rounded-xl text-text flex flex-col border-border-card border-2 text-nowrap overflow-hidden">
            <CanteenSelector/>
            <Link to={"/menu"}
                  className="flex flex-row text-xl py-2 px-4 gap-2 items-center justify-start hover:bg-button-secondary-hover cursor-pointer border-b-1 "><Utensils/>
                <p>Týdenní menu</p>
            </Link>
            <Link to={`/occupancy`}
                  className="flex flex-row text-xl py-2 px-4 gap-2 items-center justify-start hover:bg-button-secondary-hover cursor-pointer border-b-1 "><ChartColumnBig/>
                <p>Zatíženost</p>
            </Link>
            <button
                className="flex flex-row text-xl py-2 px-4 gap-2 items-center justify-start hover:bg-button-secondary-hover cursor-pointer border-b-1 ">
                <BanknoteArrowUp/>
                <p>Dobít kredit</p>
            </button>
            <button onClick={() => logout()}
                    className="flex flex-row text-xl py-2 px-4 gap-2 items-center justify-start hover:bg-button-secondary-hover cursor-pointer ">
                <LogOut/>
                <p>Odhlásit se</p>
            </button>
        </div>}
    </div>
}