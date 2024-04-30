import { useState } from "react"
import { api } from "../lib/server"
import { InputRegister } from "./input-create"
import { Table } from "./table/table"
import { TableHeader } from "./table/table-header"
import { TableRow } from "./table/table-row"
import { TableCell } from "./table/table-cell"

interface Event{
    id: string
    title: string
    slug: string
    details: string | null
    maximumAttendees: number | null
    attendeesAmount: number | null
}

export function UpdateEventData(){

    const [eventId, setEventId] = useState('')
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [details, setDetails] = useState('')
    const [maximumAttendees, setMaximumAttendees] = useState<number | null>(null)
    const [attendeesAmount, setAttendeesAmount] = useState('')
    const [eventData, setEventData] = useState<Event | null>(null)

    const [loadingUpdate, setLoadingUpdate] = useState(false)
    const [loadingSearch, setLoadingSearch] = useState(false)
    const [registerInfo, setRegisterInfo] = useState('')
   
    
   const clearEventData = () => {
    setEventId('');
    setTitle('');
    setSlug('');
    setDetails('');
    setMaximumAttendees(null);
    setAttendeesAmount('');
    setEventData(null);
}

    const searchEvent = () =>{
        setLoadingSearch(true)
        api.get(`/events/${eventId}`)
        .then((response) => {
            const data = response.data.event
            console.log(data)
           if(data){
                setEventData(data)
                setEventId(data.id)
                setTitle(data.title)
                setSlug(data.slug)
                setDetails(data.details)
                setMaximumAttendees(data.maximumAttendees)
                setAttendeesAmount(data.attendeesAmount)
                setRegisterInfo('')
           }else{
                clearEventData()
                setAttendeesAmount('')
                setRegisterInfo("Event not found")
           }
        })
        .catch((error) => {
            console.error(`Error searching event: ${error}`)
            setRegisterInfo("Error searching event")
            setLoadingSearch(false)
        })
        .finally(() => {
            setLoadingSearch(false)
        })
    }
    const updateEventData = () => {
        const attendeesAmountNumber = attendeesAmount !== '' ? parseInt(attendeesAmount) : null;
        setLoadingUpdate(true)
        if (eventData && typeof maximumAttendees === 'number' && typeof attendeesAmountNumber === 'number' && maximumAttendees >= attendeesAmountNumber){            
            const updatedData = {
                title: title,
                details: details,
                maximumAttendees: maximumAttendees
            }
            api.put(`/events/${eventId}`, updatedData)
            .then(() => {
                setRegisterInfo("Successfully updated")
                setTimeout(() => {
                    setRegisterInfo('')
                    clearEventData()
                }, 3000)
            })
            .catch((error) => {
                console.error(`Error updating event data: ${error}`)
                setRegisterInfo("Error updating event")
            })
            .finally(() => {
                setLoadingUpdate(false)
            })
        }
        else{
            setRegisterInfo('Error updating event data, wrong information, verify')   
            setLoadingUpdate(false)     
        }
    }
    return(
        <div className='flex flex-col gap-4'>
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold ">Update a event</h1>
            </div>
            <div className="flex flex-col gap-4 items-center">
                
                <InputRegister 
                        id='eventId'
                        placeholder="Event id..."
                        value={eventId}
                        onChange={(e) => {clearEventData(); setEventId(e.target.value)}}
                />
                <button className='bg-orange-400 border border-white/10 rounded-md p-2 text-sm text-zinc-900 hover:bg-orange-500'
                        onClick={searchEvent}
                        disabled={loadingSearch || loadingUpdate}>
                        {loadingSearch ? "Searching..." : "Search"}
                </button>
                {eventData &&(
                <div>
                <Table>
                    <thead>
                        <tr className='border-b border-white/10'>
                            <TableHeader>Code</TableHeader>
                            <TableHeader>Title</TableHeader>
                            <TableHeader>Slug</TableHeader>
                            <TableHeader>Details</TableHeader>
                            <TableHeader>Maximum Attendees</TableHeader>
                            <TableHeader>Attendees Amount</TableHeader>
                        </tr>
                    </thead>
                    <tbody>
                        <TableRow key={eventId}>
                            <TableCell>
                                {eventId}
                            </TableCell>
                            <TableCell>
                                <span>
                                    {title}
                                </span>
                            </TableCell>                            
                            <TableCell>
                                <span>
                                    {slug}
                                </span>
                            </TableCell>
                            <TableCell>
                                <span>
                                    {details}
                                </span>
                            </TableCell>
                            <TableCell>
                                {maximumAttendees}
                            </TableCell>
                            <TableCell>
                                {attendeesAmount === null 
                                ? <span className="text-zinc-400">Still not have attendees</span>
                                : attendeesAmount}                                    
                            </TableCell>   
                        </TableRow>      
                    </tbody>
                </Table>
                    <div className='flex flex-col gap-4 items-center py-4'>
                        <div className='flex flex-row gap-4 items-center'>
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
                            id='maximumAttendee'
                            placeholder="Maximum Attendee..."
                            value={maximumAttendees !== null ? maximumAttendees.toString() : ''}
                            onChange={(e) => {
                            const value = e.target.value;
                            const parsedValue = value !== '' ? parseInt(value) : null;
                            setMaximumAttendees(parsedValue);
                            }}
                        />
                        </div>
                        <div className='flex flex-col gap-4 items-center'>
                        <button className='bg-orange-400 border border-white/10 rounded-md p-2 text-sm text-zinc-900 hover:bg-orange-500'
                                onClick={updateEventData}
                                disabled={loadingSearch || loadingUpdate}>
                                {loadingUpdate ? "Updating..." : "Update"}
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