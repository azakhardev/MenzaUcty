import type { HTMLProps } from "react";
import { forwardRef } from "react";

export const Input = forwardRef<HTMLInputElement, HTMLProps<HTMLInputElement>>(
    function InputFunction(props, ref) {
        return (
            <input
                className="bg-gray-300 rounded-full px-4 py-2 border-0 focus:border-gray-500 focus:outline-none focus:ring-0"
                ref={ref}
                {...props}
            />
        );
    }
);
