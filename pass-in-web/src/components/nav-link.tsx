import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

interface NavLinkProps extends ComponentProps<'a'>{}

export function NavLink(props: NavLinkProps){
    return(
        <a {...props} 
            className={twMerge('font-medium text-sm text-zinc-500 hover:text-zinc-300', props.className)}>
        </a>
    )
}