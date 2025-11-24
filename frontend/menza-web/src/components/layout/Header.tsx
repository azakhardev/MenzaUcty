import {useCanteenStore} from "../../store/store.ts";
import HeaderMenu from "./HeaderMenu.tsx";
import {Link} from "react-router-dom";
import {useShallow} from "zustand/react/shallow";
import {CANTEENS} from "../../utils/constants.ts";

export default function Header() {
    const {canteen, user} = useCanteenStore(useShallow(set => ({canteen: set.currentCanteen, user: set.user})));

    return <div className="w-full bg-surface text-text-on-dark flex flex-col items-center justify-center">
        <div className="sticky top-0 w-full p-4 flex flex-row justify-between items-center">
            <div className="rounded bg-card text-text px-4 py-2">
                <strong>Zůstatek: </strong>
                <span className="text-green-700">
                {user?.balance} CZK
                    </span>
            </div>
            <div className="flex flex-col gap-1 justify-center items-center">
                <Link to={"/"}>
                    <h2 className="text-2xl font-bold">
                        {CANTEENS[canteen] ?? "Unknown"}
                    </h2>

                </Link>
                <a href="http://localhost:8080/swagger-ui/index.html" className="text-blue-600 underline"
                   target="_blank"> Swagger </a>
            </div>
            <HeaderMenu/>
        </div>
    </div>
}