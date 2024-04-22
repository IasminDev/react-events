import { useState } from "react";
import { InputRegister } from "./input-create";
import { api } from "../lib/server";
import { Table } from "./table/table";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";
import { TableHeader } from "./table/table-header";
import dayjs from "dayjs";

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
        api.get(`/events/${eventId}/attendees/${attendeeId}`)
       .then((response) => {
            const data = response.data.attendees
            console.log(data)
            if(data){
                setAttendeeData(data)
                setName(data.name)
                setEmail(data.email)
                setCreatedAt(data.createdAt)
                setCheckedInAt(data.checkedInAt)
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
            }
            api.put(`/events/${eventId}/attendees/${attendeeData.id}`, updatedData)
           .then((response) => {
                console.log(response.data)
                setRegisterInfo("Successfully updated")
                setTimeout(() => {
                    setRegisterInfo('')
                    setEventId('')
                    setAttendeeId('')
                    setName('')
                    setEmail('')
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
                <div>

                    <Table>
                    <thead>
                        <tr className='border-b border-white/10'>
                            <TableHeader>Code</TableHeader>
                            <TableHeader>Participant</TableHeader>
                            <TableHeader>Email</TableHeader>
                            <TableHeader>Date of inscription</TableHeader>
                            <TableHeader>Date of check-in</TableHeader>
                        </tr>
                    </thead>
                    <tbody>
                        <TableRow key={attendeeId}>
                            <TableCell>
                                {attendeeId}
                            </TableCell>
                            <TableCell>
                                <span>
                                    {name}
                                </span>
                            </TableCell>
                            <TableCell>
                                <span>
                                    {email.toLocaleLowerCase()}
                                </span>
                            </TableCell>
                            <TableCell>
                                {dayjs().to(createdAt)}
                            </TableCell>
                            <TableCell>
                                {checkedInAt === null 
                                ? <span className="text-zinc-400">Still not checked</span>
                                : dayjs().to(checkedInAt)}                                    
                            </TableCell>   
                        </TableRow>      
                    </tbody>                       
                    </Table>
                <div className='flex flex-col gap-4 items-center py-4'>
                    <div className='flex flex-row gap-4 items-center'>
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
                    </div>
                    <div className='flex flex-col gap-4 items-center'>
                    <button className='bg-orange-400 border border-white/10 rounded-md p-2 text-sm text-zinc-900 hover:bg-orange-500'
                            onClick={updateAttendeeData}
                            disabled={loading}>
                            {loading ? "Updating..." : "Update"}
                    </button>   
                    </div>           
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