import { useState } from "react";
import { InputRegister } from "./input-create";
import { api } from "../lib/server";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableRow } from "./table/table-row";
import { TableCell } from "./table/table-cell";

interface Event{
    id: string
    title: string
    slug: string
    details: string | null
    maximumAttendees: number | null
    attendeesAmount: number | null
}

export function DeleteEvent() {
  
   const [eventId, setEventId] = useState('')
   const [title, setTitle] = useState('')
   const [slug, setSlug] = useState('')
   const [details, setDetails] = useState('')
   const [maximumAttendees, setMaximumAttendees] = useState('')
   const [attendeesAmount, setAttendeesAmount] = useState('')
   const [eventData, setEventData] = useState<Event | null>(null)
   const [loadingDelete, setLoadingDelete] = useState(false)
   const [loadingSearch, setLoadingSearch] = useState(false)
   const [registerInfo, setRegisterInfo] = useState('')
  
   const clearEventData = () => {
    setEventId('');
    setTitle('');
    setSlug('');
    setDetails('');
    setMaximumAttendees('');
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
           setRegisterInfo("Event not found")
           clearEventData()
       }
    })
    .catch((error) => {
        console.error(`Error searching event: ${error}`)
        setRegisterInfo("Error searching event")
        clearEventData()
        setLoadingSearch(false)
    })
    .finally(() => {
        setLoadingSearch(false)
    })
    }

    const deleteEvent = () => {
        setLoadingDelete(true)
        api.delete(`/events/${eventId}`)
        .then (()=>{
            setRegisterInfo("Successfully deleted")
            setTimeout(() => {
                clearEventData()
                setRegisterInfo('')
            }, 2000)  
        })
        .catch((error) => {
            console.error(`Error deleting event: ${error}`)
            setRegisterInfo("Error deleting event")
        })
        .finally(() => {
            setLoadingDelete(false)
        })
    }

    return(
    <div className='flex flex-col gap-4'>
        <div className="flex gap-3 items-center">
            <h1 className="text-2xl font-bold ">Delete event</h1>
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
                        disabled={loadingSearch || loadingDelete}>
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
                        <div className='flex flex-col gap-4 items-center'>
                        <button className='bg-orange-400 border border-white/10 rounded-md p-2 text-sm text-zinc-900 hover:bg-orange-500'
                                onClick={deleteEvent}
                                disabled={loadingSearch || loadingDelete}
                                >
                                 
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