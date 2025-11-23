import {useCanteenStore} from "../store/store.ts";

export default function CanteenOccupancyPage(){
    const currentCanteen = useCanteenStore(set => set.currentCanteen);
    return <div>Occupancy for canteen {currentCanteen}</div>
}