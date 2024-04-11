import { InputRegister } from './input-create'

export function CreateNewEvent(){
    
    return(
        <div className='flex flex-col gap-4'>
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold ">Create a new event</h1>
            </div>
            <div className="flex flex-col gap-4 items-center">
                <InputRegister 
                        id='title'
                        placeholder="Title...">
                </InputRegister>
                <InputRegister 
                        id='details'
                        placeholder="Details...">
                </InputRegister>
                <InputRegister
                        id='maximumAttendees'
                        placeholder="Maximum Attendees...">
                </InputRegister>
                <div>
                <button className='bg-orange-400 border border-white/10 rounded-md p-2 text-sm text-zinc-900 hover:bg-orange-500'>
                    Seed
                </button>
                </div>
            </div>  
        </div>    
    )
}