import './App.css'
import Header from "./components/layout/Header.tsx";
import {Outlet} from "react-router";

function MainLayout() {

    return (
        <div className="flex flex-col items-center min-h-screen w-full relative">
            <Header/>
            <Outlet/>
        </div>
    )
}

export default MainLayout
