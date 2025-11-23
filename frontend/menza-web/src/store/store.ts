import {create} from "zustand";
import type {User} from "../api/models";

type StoreType = {
    user?: User,
    setUser: (user?: User) => void;
    currentCanteen: string;
    setCurrentCanteen: (canteen: string) => void;
};

export const useCanteenStore = create<StoreType>((set) => ({
    user: getUser(),
    setUser: (user?: User) => {
        sessionStorage.setItem("user", JSON.stringify(user));
        set({user: user});
    },
    currentCanteen: getSavedCanteen(),
    setCurrentCanteen: (canteen) => {
        sessionStorage.setItem("canteen", canteen);
        set({currentCanteen: canteen});
    },
}));

function getUser() {
    if (typeof window === "undefined") return undefined;
    const user = sessionStorage.getItem("user");
    return user ? JSON.parse(user) : undefined;
}

function getSavedCanteen(): string {
    if (typeof window === "undefined") return "avgastro";
    return sessionStorage.getItem("canteen") ?? "avgastro";
}
