import nlwUniteIcon from '../assets/nlw-unite-icon.svg'
import { NavLink } from './nav-link'

export function Header(){
    return(
    <div className='flex items-center gap-5 py-2'>
        <img src={nlwUniteIcon}/>
        <nav className='flex items-center gap-5'>
            <NavLink href="/events">Events</NavLink>
            <NavLink href="/participants">Participants</NavLink>
            <NavLink href="/create-event">Create Event</NavLink>
            <NavLink href="/register-attendee">Register Attendee</NavLink>
        </nav>
    </div>
    )
}