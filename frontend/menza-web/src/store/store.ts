import {create} from "zustand";

type StoreType = {
    userId?: number;
    setUserId: (id: number) => void;
    currentCanteen: string;
    setCurrentCanteen: (canteen: string) => void;
};

export const useCanteenStore = create<StoreType>((set) => ({
    userId: getUserId(),
    setUserId: (id) => {
        sessionStorage.setItem("userId", id.toString());
        set({userId: id});
    },

    currentCanteen: getSavedCanteen(),
    setCurrentCanteen: (canteen) => {
        sessionStorage.setItem("canteen", canteen);
        set({currentCanteen: canteen});
    },
}));

function getSavedCanteen(): string {
    if (typeof window === "undefined") return "avgastro";
    return sessionStorage.getItem("canteen") ?? "avgastro";
}

function getUserId() {
    if (typeof window === "undefined") return undefined;
    const id = sessionStorage.getItem("userId");
    return id ? parseInt(id) : undefined;
}

