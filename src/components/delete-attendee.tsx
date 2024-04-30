import { useState } from "react"
import { api } from "../lib/server"
import { Table } from "./table/table"
import { TableHeader } from "./table/table-header"
import { InputRegister } from "./input-create"
import { TableRow } from "./table/table-row"
import { TableCell } from "./table/table-cell"
import dayjs from "dayjs"

interface Attendee{
    id: string
    name: string
    email: string
    eventId: string
    createdAt: string
    checkedInAt: string | null
}

export function DeleteAttendee() {
   
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [eventId, setEventId] = useState('')
    const [loadingDelete, setLoadingDelete] = useState(false)
    const [loadingSearch, setLoadingSearch] = useState(false)
    const [registerInfo, setRegisterInfo] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    const [checkedInAt, setCheckedInAt] = useState('')
    const [attendeeId, setAttendeeId] = useState('')
    const [attendeeData, setAttendeeData] = useState<Attendee | null>(null)

    const clearAttendeeData = () => {
        setAttendeeData(null)
        setName('')
        setEmail('')
        setCreatedAt('')
        setCheckedInAt('')
        setEventId('');
        setAttendeeId('');
    }

    const searchAttendee = () => {
        setLoadingSearch(true)
        api.get(`/events/${eventId}/attendees/${attendeeId}`)
       .then((response) => {
            const data = response.data.attendees
            if(data){
                setAttendeeData(data)
                setName(data.name)
                setEmail(data.email)
                setCreatedAt(data.createdAt)
                setCheckedInAt(data.checkedInAt)
                setRegisterInfo('')
            }else{
                clearAttendeeData();
                setRegisterInfo("Attendee not found")
            }
        })
        .catch((error) => {
            console.error(`Error searching attendee: ${error}`)
            setRegisterInfo("Error searching attendee")
            setLoadingSearch(false)
        })
        .finally(() => {
            setLoadingSearch(false)
        })
    }

    const deleteAttendee = () =>{
        setLoadingDelete(true)
        api.delete(`/events/${eventId}/attendees/${attendeeId}`)
        .then (() => {
            setRegisterInfo("Successfully deleted")
            setTimeout(() => {
                clearAttendeeData()
                setRegisterInfo('')
            }, 2000);
        })
        .catch((error) => {
            console.error(`Error deleting attendee: ${error}`)
            setRegisterInfo("Error deleting attendee")
        })
        .finally(() => {
            setLoadingDelete(false)
        })
    }

    return(
    <div className='flex flex-col gap-4'>
        <div className="flex gap-3 items-center">
            <h1 className="text-2xl font-bold ">Delete attendee</h1>
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
                        onClick={searchAttendee}
                        disabled={loadingSearch || loadingDelete}>
                        {loadingSearch ? "Searching..." : "Search"}
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
                    <div className='flex flex-col gap-4 items-center'>
                    <button className='bg-orange-400 border border-white/10 rounded-md p-2 text-sm text-zinc-900 hover:bg-orange-500'
                            onClick={deleteAttendee}
                            disabled={loadingSearch || loadingDelete}>
                            {loadingDelete ? "Deleting..." : "Delete"}
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