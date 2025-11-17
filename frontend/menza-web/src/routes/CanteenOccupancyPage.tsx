import {useParams} from "react-router";

export default function CanteenOccupancyPage(){
    const params = useParams();
    const canteenName = params.canteenName;

    return <div>Occupancy for canteen {canteenName}</div>
}