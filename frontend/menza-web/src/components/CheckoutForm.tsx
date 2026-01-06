import { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string | null>(null); // TypeScript typování
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Stránka pro přesměrování
                return_url: window.location.origin + "/topup/success"
            },
        });

        if (error) {
            if (error.type === "card_error" || error.type === "validation_error") {
                setMessage(error.message ?? "Nastala chyba.");
            } else {
                setMessage("Neočekávaná chyba.");
            }
        }

        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement />

            <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? "Zpracovávám..." : "Zaplatit"}
            </button>

            {message && (
                <div id="payment-message" className="text-red-500 text-sm text-center mt-2">
                    {message}
                </div>
            )}
        </form>
    );
}