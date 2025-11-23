import {CANTEENS} from "../../utils/constants.ts";
import {useCanteenStore} from "../../store/store.ts";
import {useShallow} from "zustand/react/shallow";
import {useState} from "react";
import {ChevronUp} from "lucide-react";


export default function CanteenSelector() {
    const [isOpen, setIsOpen] = useState(false);

    const {canteen, setCanteen} = useCanteenStore(useShallow(set => ({
        canteen: set.currentCanteen,
        setCanteen: set.setCurrentCanteen
    })))

    function onItemClick(item: string) {
        if (canteen !== item) {
            setCanteen(item);
            window.location.reload();
        }
        setIsOpen(false);
    }

    return <div className="flex flex-col relative">
        <button onClick={() => setIsOpen(old => !old)}
                className="flex flex-row text-xl py-2 px-4 gap-2 items-center justify-start hover:bg-button-secondary-hover cursor-pointer border-b-1 ">
            <ChevronUp className={`${isOpen && "rotate-180"} transition-all`}/>
            {CANTEENS[canteen]}
        </button>
        {isOpen && <div className="absolute flex flex-col top-[100%] right-0 z-10 bg-card rounded w-full border ">
            {Object.entries(CANTEENS).map(([key, value]) => <button
                className="flex flex-row text-xl py-2 px-4 gap-2 items-center justify-start hover:bg-button-secondary-hover cursor-pointer border-b-1 "
                key={key}
                onClick={() => onItemClick(key)}>{value}</button>)}
        </div>}
    </div>
}