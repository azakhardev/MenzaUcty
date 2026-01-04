import HomeHistory from "../components/ui/home/HomeHistory.tsx";
import HomeMenu from "../components/ui/home/HomeMenu.tsx";

export default function Home() {
    return (
        <div className="w-full max-w-7xl mx-auto p-6 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <HomeHistory />
                <HomeMenu />
            </div>
        </div>
    );
}