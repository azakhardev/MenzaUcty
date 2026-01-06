import {Link} from "react-router-dom";

export default function Success(){
    return<div className="flex w-full items-center justify-center text-green-700 font-bold text-xl flex-col gap-10 mt-8">
        <div>
        Platba proběhla úspěšně! Po zpracování providerem se Vám připíše na Váš účet. Děkujeme, že u nás jíte 😊.
        </div>
        <Link className="underline text-blue-500 hover:text-blue-600 font-medium block" to="/">Přejít na hlavní stránku</Link>
    </div>

}