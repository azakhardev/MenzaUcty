import type {ComponentPropsWithoutRef} from "react";

type ButtonProps = ComponentPropsWithoutRef<'button'> & {};

export default function Button({className, children, ...props}: ButtonProps) {
    const baseClasses = "px-4 py-2 bg-button-primary rounded-xl hover:scale-[1.05] hover:bg-button-primary-hover cursor-pointer transition-all text-center text-white border border-gray-400 active:scale-[0.95]";

    const combinedClasses = className ? `${baseClasses} ${className}` : baseClasses;

    return <button className={combinedClasses} {...props} >{children}</button>
}