import type { BuffetMenu, BuffetItem } from "../../../api/models";

type BuffetProps = {
    data?: BuffetMenu;
    isLoading?: boolean;
    error?: string | null;
};

export default function Buffet({ data, isLoading, error }: BuffetProps) {
    // Pokud se načítá, zobrazíme skeleton nebo text
    if (isLoading) {
        return (
            <div className="w-full md:w-80 h-fit p-8 text-center text-[var(--color-text)] bg-[var(--color-card)] rounded-xl shadow-lg opacity-70">
                Načítám bufet...
            </div>
        );
    }

    // Pokud je chyba (např. 404), komponentu nezobrazíme, aby nekazila design
    if (error) {
        return null;
    }

    const snacks = data?.snacks || [];
    const drinks = data?.drinks || [];
    const isEmpty = snacks.length === 0 && drinks.length === 0;

    // Pokud nejsou data, nezobrazujeme nic
    if (isEmpty) return null;

    return (
        // Fixní šířka na desktopu (w-80), aby ladila s kalendářem
        <div className="w-full md:w-80 shrink-0 h-fit overflow-hidden rounded-xl shadow-lg bg-[var(--color-card)] text-[var(--color-text)]">
            <div className="p-5 text-center border-b border-[var(--color-border)]">
                <h2 className="text-xl font-bold">Buffet</h2>
            </div>

            <div className="flex flex-col pb-4">
                {snacks.length > 0 && <BuffetSection title="Svačinky" items={snacks} />}
                {drinks.length > 0 && <BuffetSection title="Nápoje" items={drinks} />}
            </div>
        </div>
    );
}

// --- Pomocné komponenty ---

type BuffetSectionProps = {
    title: string;
    items: BuffetItem[];
};

const BuffetSection = ({ title, items }: BuffetSectionProps) => {
    return (
        <div className="flex flex-col mt-2">
            <div className="py-1 px-4 text-left font-semibold text-sm uppercase tracking-wider text-[var(--color-text)] opacity-70 bg-[var(--color-background)]">
                {title}
            </div>
            <div className="flex flex-col">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center p-3 border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-background)] transition-colors"
                    >
                        <span className="text-sm font-medium">{item.name}</span>
                        <span className="text-sm font-bold whitespace-nowrap pl-2">
                            {item.price ? `${item.price},- Kč` : ""}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};