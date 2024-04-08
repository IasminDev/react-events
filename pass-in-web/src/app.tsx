import { Link } from 'react-router-dom'
import { Main } from './main'
import nlwUniteIcon from '../assets/nlw-unite-icon.svg'

import './index.css'

// export function App() {
//     return(
//         <>
//             <div>

//             </div>
//         </>
//     )
// }

export function App(){
    return(
    <div className='flex items-center gap-5 py-2'>
        <img src={nlwUniteIcon}/>
        <nav className='flex items-center gap-5'>
            <Link to="/events">Events</Link>
            <Link to="/participants">Participants</Link>
            <Link to="/create-event">Create Event</Link>
            <Link to="/register-attendee">Register Attendee</Link>
        </nav>
        <Main/>
    </div>
    )
}