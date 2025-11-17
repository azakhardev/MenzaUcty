import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import MainLayout from './MainLayout.tsx'
import "./index.css"

import {BrowserRouter, Route, Routes} from "react-router";
import Login from "./routes/Login.tsx";
import Home from "./routes/Home.tsx";
import MenuPage from "./routes/MenuPage.tsx";
import HistoryPage from "./routes/HistoryPage.tsx";
import MealDetailPage from "./routes/MealDetailPage.tsx";
import CanteenOccupancyPage from "./routes/CanteenOccupancyPage.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route element={<ProtectedRoute/>}>
                    <Route path="/" element={<MainLayout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="menu" element={<MenuPage/>}/>
                        <Route path="history" element={<HistoryPage/>}/>
                        <Route path="menu/:id" element={<MealDetailPage/>}/>
                        <Route path="occupancy/:canteenName" element={<CanteenOccupancyPage/>}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>
)
