import { useState } from "react";
import { InputRegister } from "./input-create";
import { api } from "../lib/server";

interface Attendee{
    id: string
    name: string
    email: string
    eventId: string
    createdAt: string
    checkedInAt: string | null
}

export function UpdateAttendeeData(){
    const [eventId, setEventId] = useState('');
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    const [checkedInAt, setCheckedInAt] = useState('')
    const [attendeeId, setAttendeeId] = useState('');
    const [attendeeData, setAttendeeData] = useState<Attendee | null>(null);
    const [loading, setLoading] = useState(false);
    const [registerInfo, setRegisterInfo] = useState('')

    const searchAttendee = () => {
        setLoading(true)
        api.get(`/events/${eventId}/attendees?search=${attendeeId}`)
       .then((response) => {
            const data = response.data
            console.log(response.data)
            if(data && data.length > 0){
                setAttendeeData(data[0])
                setName(data[0].name)
                setEmail(data[0].email)
                setCreatedAt(data[0].createdAt)
                setCheckedInAt(data[0].checkedInAt ?? "")
                setRegisterInfo("")
            }else{
                setAttendeeData(null)
                setName('')
                setEmail('')
                setCreatedAt('')
                setCheckedInAt('')
                setRegisterInfo("Attendee not found")
            }
        })
        .catch((error) => {
            console.error(`Error searching attendee: ${error}`)
            setRegisterInfo("Error searching attendee")
        })
        .finally(() => {
            setLoading(false)
        })
    }
    const updateAttendeeData = () => {
        setLoading(true)
        if (attendeeData) {
            const updatedData = {
                name: name,
                email: email,
                createdAt: createdAt,
                checkedInAt: checkedInAt,
            }
            api.put(`/events/${eventId}/attendees/${attendeeData.id}`, updatedData)
           .then((response) => {
                console.log(response.data)
                setRegisterInfo("Successfully updated")
                setTimeout(() => {
                    setRegisterInfo('')
                    setEventId('')
                    setName('')
                    setEmail('')
                    setCreatedAt('')
                    setCheckedInAt('')
                }, 3000)
            })
            .catch((error) => {
                console.error(`Error updating attendee data: ${error}`)
                setRegisterInfo("Error updating attendee")
            })
            .finally(() => {
                setLoading(false)
            })
        }
        else{
            setRegisterInfo('Attendee not found')   
            setLoading(false)     
        }
    }


    return(
        <div className='flex flex-col gap-4'>
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold ">Update a attendee</h1>
            </div>
            <div className="flex flex-col gap-4 items-center">
                <InputRegister 
                        id='eventId'
                        placeholder="Event id..."
                        value={eventId}
                        onChange={(e) => setEventId(e.target.value)}
                />
                <InputRegister 
                        id='search'
                        placeholder="Participant id..."
                        value={attendeeId}
                        onChange={(e) => setAttendeeId(e.target.value)}
                />
                <button className='bg-orange-400 border border-white/10 rounded-md p-2 text-sm text-zinc-900 hover:bg-orange-500'
                        onClick={searchAttendee}>
                        {loading ? "Searching..." : "Search"}
                </button>  
                {attendeeData && (
                <div className='flex flex-col gap-4 items-center'>
                    <InputRegister
                            id='email'
                            placeholder="Email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputRegister
                            id='name'
                            placeholder="Name..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                    />
                    <InputRegister
                            id='createdAt'
                            placeholder="Created date..."
                            value={createdAt}
                            onChange={(e) => setCreatedAt(e.target.value)}
                    />
                    <InputRegister
                            id='checkedInAt'
                            placeholder="Check in..."
                            value={checkedInAt}
                            onChange={(e) => setCheckedInAt(e.target.value)}
                    />
                    <div>
                    <button className='bg-orange-400 border border-white/10 rounded-md p-2 text-sm text-zinc-900 hover:bg-orange-500'
                            onClick={updateAttendeeData}
                            disabled={loading}>
                            {loading ? "Updating..." : "Update"}
                    </button>   
                    </div>           
                </div>
                )}
                <div>
                <span className='text-center'>{registerInfo}</span>
                </div>  
            </div>   
        </div>
    )
}