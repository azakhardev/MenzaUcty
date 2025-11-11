import {create} from "zustand";

type StoreType = {
    userId?: number;
    setUserId: (id: number) => void;
    currentCanteen: string;
    setCurrentCanteen: (canteen: string) => void;
};

const useStore = create<StoreType>((set) => ({
    userId: getUserId(),
    setUserId: (id) => {
        localStorage.setItem("userId", id.toString());
        set({userId: id});
    },

    currentCanteen: getSavedCanteen(),
    setCurrentCanteen: (canteen) => {
        localStorage.setItem("canteen", canteen);
        set({currentCanteen: canteen});
    },
}));

function getSavedCanteen(): string {
    if (typeof window === "undefined") return "avgastro";
    return localStorage.getItem("canteen") ?? "avgastro";
}

function getUserId() {
    if (typeof window === "undefined") return undefined;
    const id = localStorage.getItem("userId");
    return id ? parseInt(id) : undefined;
}

export default useStore;
