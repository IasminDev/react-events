import { useState } from 'react'
import { InputRegister } from './input-create'
import { api } from '../lib/server'


export function CreateNewEvent(){
    
    const [title, setTitle] = useState('')
    const [details, setDetails] = useState('')
    const [maximumAttendees, setMaximumAttendees] = useState('')
    const [registerError, setRegisterError] = useState('')
    const [registerInfo, setRegisterInfo] = useState('')

    const handleRegister = () => {
        
        const maxAttendeesNumber = parseInt(maximumAttendees); 

        if (isNaN(maxAttendeesNumber)) {
            setRegisterError('Maximum attendees must be a valid number.');
            return;
        }        
        api.post(`/events`,{
            title,
            details,
            maximumAttendees: maxAttendeesNumber
        })
        .then(function(response){
            console.log(response)
            setRegisterError('')
            setRegisterInfo('New event successfully created')
            setTimeout(() => {
                setRegisterInfo('')
                setTitle('')
                setDetails('')
                setMaximumAttendees('')
            }, 3000)
        })
        .catch(function(error){
            setRegisterInfo('')
            setRegisterError(`Error registering event: ${error.response.data.message}`)
        })
    }

    return(
        <div className='flex flex-col gap-4'>
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold ">Create a new event</h1>
            </div>
            <div className="flex flex-col gap-4 items-center">
                <InputRegister 
                        id='title'
                        placeholder="Title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                />
                
                <InputRegister 
                        id='details'
                        placeholder="Details..."
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                />
                <InputRegister
                        id='maximumAttendees'
                        placeholder="Maximum Attendees..."
                        value={maximumAttendees}
                        onChange={(e) => setMaximumAttendees(e.target.value)}
                />
                <div>
                <button className='bg-orange-400 border border-white/10 rounded-md p-2 text-sm text-zinc-900 hover:bg-orange-500'
                        onClick={handleRegister}>
                    Create
                </button>
                </div>
                <div>
                    <span className='text-center'>{registerError}{registerInfo}</span>
                </div>
            </div>  
        </div>    
    )
}