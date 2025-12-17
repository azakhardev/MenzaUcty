import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
    BanknoteArrowUp,
    ChartColumnBig,
    LogOut,
    User,
    Utensils
} from "lucide-react";
import { Link } from "react-router-dom";
import CanteenSelector from "./CanteenSelector";
import { useCanteenStore } from "../../store/store";

export default function HeaderMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const user = useCanteenStore(state => state.user);

    function logout() {
        sessionStorage.removeItem("user");
        window.location.reload();
    }

    // zavření klikem mimo
    useEffect(() => {
        function onClickOutside(ev: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(ev.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(ev.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", onClickOutside);
        return () => document.removeEventListener("mousedown", onClickOutside);
    }, []);

    return (
        <>
            {/* TRIGGER */}
            <div className="flex gap-2 items-center">
                <p className="text-xl">{user?.username}</p>
                <button
                    ref={buttonRef}
                    onClick={() => setIsOpen(o => !o)}
                    className="
                        bg-button-secondary
                        rounded-full
                        flex items-center justify-center
                        p-2
                        cursor-pointer
                        hover:bg-button-secondary-hover
                        transition
                    "
                >
                    <User size={36} />
                </button>
            </div>

            {/* DROPDOWN + BACKDROP přes PORTAL */}
            {isOpen &&
                createPortal(
                    <>
                        {/* BACKDROP */}
                        <div
                            className="fixed inset-0 z-[9998]"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* MENU */}
                        <div
                            ref={menuRef}
                            className="
                                fixed
                                top-20
                                right-6
                                z-[9999]
                                bg-[var(--color-card)]
                                text-[var(--color-text)]
                                border border-[var(--color-border)]
                                rounded-xl
                                shadow-xl
                                overflow-hidden
                                min-w-[240px]
                            "
                        >
                            <CanteenSelector />

                            <Link
                                to="/menu"
                                className="flex gap-2 items-center px-4 py-2 text-xl hover:bg-button-secondary-hover"
                            >
                                <Utensils />
                                <p>Týdenní menu</p>
                            </Link>

                            <Link
                                to="/occupancy"
                                className="flex gap-2 items-center px-4 py-2 text-xl hover:bg-button-secondary-hover"
                            >
                                <ChartColumnBig />
                                <p>Zatíženost</p>
                            </Link>

                            <button className="flex gap-2 items-center px-4 py-2 text-xl hover:bg-button-secondary-hover w-full text-left">
                                <BanknoteArrowUp />
                                <p>Dobít kredit</p>
                            </button>

                            <button
                                onClick={logout}
                                className="flex gap-2 items-center px-4 py-2 text-xl hover:bg-button-secondary-hover w-full text-left"
                            >
                                <LogOut />
                                <p>Odhlásit se</p>
                            </button>
                        </div>
                    </>,
                    document.body
                )}
        </>
    );
}
