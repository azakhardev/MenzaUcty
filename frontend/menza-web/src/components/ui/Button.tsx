import type {HTMLProps} from "react";

export default function Button(props: HTMLProps<HTMLButtonElement>) {
    return <button className="px-4 py-2 bg-blue-500 rounded-xl hover:scale-[1.05] hover:bg-blue-600 cursor-pointer transition-all text-center text-white border border-gray-400 ">{props.children}</button>
}