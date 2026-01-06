import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { ArrowLeft } from "lucide-react"; // Pokud používáš lucide-react
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe("STRIPE_FE_SECRET_KEY");

export default function TopupPage() {
    const [clientSecret, setClientSecret] = useState("");
    const [amount, setAmount] = useState<string>("200");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const token = sessionStorage.getItem('token');

    // Funkce, která se zavolá až když uživatel potvrdí částku
    const initializePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const amountValue = parseInt(amount, 10);

        if (isNaN(amountValue) || amountValue < 10) {
            setError("Minimální částka pro dobití je 10 Kč.");
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch("http://localhost:8080/payment/create-payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                // Stripe očekává haléře
                body: JSON.stringify({ amount: amountValue * 100 }),
            });

            if (!res.ok) throw new Error("Chyba serveru");

            const data = await res.json();
            setClientSecret(data.clientSecret);
        } catch (err) {
            setError("Nepodařilo se inicializovat platbu.");
        } finally {
            setIsLoading(false);
        }
    };

    const options = {
        clientSecret,
        appearance: { theme: 'stripe' as const },
    };

    // Pokud už máme clientSecret, zobrazíme Stripe formulář
    if (clientSecret) {
        return (
            <div className="w-screen h-screen flex items-center justify-center bg-gray-50">
                <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
                    <button
                        onClick={() => setClientSecret("")} // Tlačítko zpět na výběr částky
                        className="flex items-center text-sm text-gray-500 hover:text-gray-800 mb-4 transition"
                    >
                        <ArrowLeft size={16} className="mr-1"/> Změnit částku
                    </button>

                    <h1 className="text-2xl font-bold mb-6 text-center">
                        Zaplatit {amount} Kč
                    </h1>

                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                </div>
            </div>
        );
    }

    // VÝCHOZÍ STAV: Formulář pro zadání částky
    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
                <h1 className="text-2xl font-bold mb-2 text-center">Dobít kredit</h1>
                <p className="text-gray-500 text-center mb-6">Zadejte částku, kterou chcete dobít.</p>

                <form onSubmit={initializePayment} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Částka (Kč)
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                min="10"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-lg p-3 border"
                                placeholder="Např. 500"
                            />
                            <div className="absolute inset-y-0 right-4 pr-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-lg">Kč</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2 justify-center">
                        {[100, 200, 500, 1000].map((val) => (
                            <button
                                key={val}
                                type="button"
                                onClick={() => setAmount(val.toString())}
                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition"
                            >
                                {val}
                            </button>
                        ))}
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading || !amount}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition disabled:opacity-50"
                    >
                        {isLoading ? "Načítám bránu..." : "Pokračovat k platbě"}
                    </button>
                </form>
            </div>
        </div>
    );
}