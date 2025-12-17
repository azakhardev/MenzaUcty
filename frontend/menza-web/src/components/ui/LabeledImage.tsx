import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

type CompProps = {
    PropIcon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
    label: string | number | undefined,
    className: string | undefined,
    callback: () => void;
};

export default function LabeledImage({PropIcon, label, className, callback}: CompProps) {
    const baseClasses = "flex flex-row text-center justify-center items-center space-x-2";
    const combinedClasses = className ? `${baseClasses} ${className}` : baseClasses;

    return (
        <div className={combinedClasses}>
            <div className="w-10 h-6 cursor-pointer" onClick={callback}>
                <PropIcon/>
            </div>
            <span className="font-bold">{label}</span>
        </div>
    )
}