import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

interface InputRegisterProps extends ComponentProps<'input'> {
    
}

export function InputRegister ({...props}: InputRegisterProps){
    return(
        <div className="py-3 px-1.5 w-72 border border-white/10 rounded-lg flex items-center gap-3">
        <input 
            {...props}
            className="bg-transparent flex-1 outline-none h-auto border-0 p-0 text-sm focus:ring-0" 
            type="text" 
        />
        </div>
    )
}