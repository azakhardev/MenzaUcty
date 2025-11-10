import {useEffect, useState} from 'react'
import './App.css'
import axios from "./api/axios.ts";

function App() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        async function getMenu() {
            const response = await axios.get("menu/avgastro");
            setData(response.data);
        }

        getMenu();
    }, []);

    return (
        <div className="flex flex-col items-start w-full text-start justify-start">
            {data === null && <p>Loading...</p>}
            {data !== null && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    )
}

export default App
