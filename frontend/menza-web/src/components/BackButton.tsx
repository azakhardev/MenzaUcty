import {ArrowLeft} from "lucide-react";

export default function BackButton() {
    return <div className="w-full pl-4 mx-auto py-6 flex justify-start shrink-0">
        <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all
                               text-text hover:bg-text/5 hover:-translate-x-1 cursor-pointer"
        >
            <ArrowLeft className="w-6 h-6"/>
            <span className="font-medium">Zpět</span>
        </button>
    </div>
}