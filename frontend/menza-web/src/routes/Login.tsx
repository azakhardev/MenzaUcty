import {useCanteenStore} from "../store/store.ts";
import {type FormEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {useShallow} from "zustand/react/shallow";
import {Input} from "../components/ui/Input.tsx";
import Button from "../components/ui/Button.tsx";
import {getMenu as getMenuFunctions} from "../api/menu/menu.ts";
import {useMutation, useQuery} from "@tanstack/react-query";
import {dateToMenuString} from "../utils/dateUtils.ts";
import {getAuthentication, type LoginResult} from "../api/authentication/authentication.ts";
import type {LoginCredentials} from "../api/models";
import type {AxiosError} from "axios";

export default function Login() {
    const {user, canteen, setUser} = useCanteenStore(useShallow(set => ({
        user: set.user,
        canteen: set.currentCanteen,
        setUser: set.setUser,
    })));
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const {getMenu} = getMenuFunctions();
    const {login} = getAuthentication();
    const navigate = useNavigate();

    useEffect(() => {
        if (user !== null && user !== undefined) {
            navigate("/");
        }
    }, [user])

    async function handleLogin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: { username?: string, password?: string } = Object.fromEntries(formData.entries());

        mutation.mutate({username: data.username, password: data.password});
    }

    const menuQuery = useQuery({
        queryFn: () => getMenu(canteen, dateToMenuString(new Date())),
        queryKey: ["menu", canteen],
    })

    const mutation = useMutation<LoginResult, AxiosError, LoginCredentials>({
        mutationFn: (credentials) => login(credentials),
        onError: () => setErrorMessage("Špatné přihlašovací údaje"),
        onSuccess: (data) => {
            setUser(data.user);
            window.sessionStorage.setItem("token", data.token! );
            setErrorMessage(null);
        },
    })

    return <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="flex h-full flex-row gap-20 justify-center items-center">
            <div className="flex-1 h-full flex flex-col justify-center items-center">
                <form onSubmit={handleLogin}
                      className="flex w-[25vw] flex-col items-center h-1/2 justify-between rounded-xl bg-card p-4 ">
                    <div className="flex flex-col gap-2 w-full">
                        <h2 className="text-2xl font-bold mb-4 text-center">Máte hlad? Přihlašte se!</h2>
                        <Input required name="username" placeholder="Username"/>
                        <Input type="password" required name="password" placeholder="Heslo"/>
                        {errorMessage && <span className="text-red-500">{errorMessage}</span>}
                    </div>
                    <Button type="submit">Přihlásit se</Button>
                </form>
            </div>
            <div className="h-3/4 border border-black"/>

            {menuQuery.isLoading ? <div>Loading...</div> : <div className="flex-1">
                <h2>Menu</h2>
                {/*TODO:MENU COMPONENT*/}
                <div>MENU COMPONENT</div>
            </div>}
        </div>
    </div>
}