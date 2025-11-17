import {useCanteenStore} from "../store/store.ts";
import {useEffect} from "react";
import {useNavigate} from "react-router";

export default function Login() {
    const userId = useCanteenStore(set => set.userId);
    const navigate = useNavigate();

    useEffect(() => {
        if (userId !== null && userId !== undefined) {
            navigate("/");
        }
    }, [])

    return <div>Login page</div>
}