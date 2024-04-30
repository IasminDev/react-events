import { InputRegister } from './input-create'
import { api } from '../lib/server'
import { useState } from "react"

export function RegisterNewAttendee(){

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [eventId, setEventId] = useState('')
    const [registerInfo, setRegisterInfo] = useState('')

    const handleAttendeeRegister = () => {
        api.post(`/events/${eventId}/attendees`, {
            eventId,
            name,
            email
        })
        .then(function(response){
            console.log(response)
            setRegisterInfo('New participant successfully registered')
            setTimeout(() => {
                setRegisterInfo('')
                setEventId('')
                setName('')
                setEmail('')
            }, 2000)
        })
        .catch(function(error){
            setRegisterInfo(`Error registering attendee: ${error.response.data.message}`)
        })
    }

    return(
        <div className='flex flex-col gap-4'>
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold ">Register a new attendee</h1>
            </div>
            <div className="flex flex-col gap-4 items-center">
                <InputRegister 
                        id='eventId'
                        placeholder="Event id..."
                        value={eventId}
                        onChange={(e) => setEventId(e.target.value)}
                />
                <InputRegister
                        id='name'
                        placeholder="Name..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                />
                <InputRegister
                        id='email'
                        placeholder="Email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                />
                <div>
                <button className='bg-orange-400 border border-white/10 rounded-md p-2 text-sm text-zinc-900 hover:bg-orange-500'
                        onClick={handleAttendeeRegister}>
                    Register
                </button>   
                </div>           
                <div>
                <span className='text-center'>{registerInfo}</span>
                </div>  
            </div>  
        </div>    
    )
}