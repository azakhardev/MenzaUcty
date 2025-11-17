import {useCanteenStore} from "../../store/store.ts";

const CANTEENS: Record<string, string> = {
    "avgastro": "AvGastro",
    "vsem": "Pizza VŠEm"
}

export default function Header() {
    const canteen = useCanteenStore(set => set.currentCanteen);

    return <div className="w-full bg-gray-300 flex flex-col items-center justify-center">
        {/*<h1 className="text-2xl font-bold">WebCredit 2.0</h1>*/}
        <div className="sticky top-0 w-full p-4 flex flex-row justify-center">
            <h2 className="text-xl font-bold">
                {CANTEENS[canteen] ?? "Unknown"}
            </h2>
        </div>
    </div>
}