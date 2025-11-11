import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import MainLayout from './MainLayout.tsx'
import "./index.css"

import {BrowserRouter, Route, Routes} from "react-router";
import Login from "./routes/Login.tsx";
import Home from "./routes/Home.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route element={<MainLayout/>}>
                    <Route index path={"/"} element={<Home/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
