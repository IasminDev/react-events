import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from 'lucide-react'
import { IconButton } from './icon-button'
import { Table } from "./table/table"
import { TableHeader } from "./table/table-header"
import { TableRow } from "./table/table-row"
import { TableCell } from "./table/table-cell"

import { api } from '../lib/server'
import { ChangeEvent, useEffect, useState } from "react"

interface Event{
    id: string
    title: string
    details: string | null
    maximumAttendees: number | null
    attendeesAmount: number | null
}

export function EventList(){
    const [search, setSearch] = useState(() => {
        const url = new URL(window.location.toString())
        if(url.searchParams.has('search')){
            return url.searchParams.get('search') ?? ''
        }
        return ''
    })
    const [page, setPage] = useState(() => {
        const url = new URL(window.location.toString())
        if(url.searchParams.has('page')){
            return Number(url.searchParams.get('page'))
        }
        return 1
    })
    const [events, setEvents] = useState<Event[]>([])
    const [total, setTotal] = useState(0)
    const totalPages = Math.ceil(total/10)

    useEffect(() => {
        api.get('/events', {
            params:{
                page,
                search
            }}
        )
        .then(function(response){
            return response.data
        })
        .then(data => {
            setEvents(data.events)
            setTotal(data.total)
        })
        .catch(function(error){
            console.log(error)
        })
    }, [page, search])
    function setCurrentSearch(search: string){
        const url = new URL(window.location.toString())
        url.searchParams.set('search', search)
        window.history.pushState({}, "", url)
        setSearch(search)
    }
    function setCurrentPage(page: number){
        const url = new URL(window.location.toString())
        url.searchParams.set('page', String(page))
        window.history.pushState({}, "", url)
        setPage(page)
    }
    function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>){
        setCurrentSearch(event.target.value)
        setCurrentPage(1)
    }
    function goToNextPage(){
        setCurrentPage(page + 1)
    }
    function goToPreviousPage(){
        setCurrentPage(page - 1)
    }
    function goToFirstPage(){
        setCurrentPage(1)
    }
    function goToLastPage(){
        setCurrentPage(totalPages)
    }

    return(
        <div className='flex flex-col gap-4'>
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold ">Events</h1>
                <div className="py-3 px-1.5 w-72 border border-white/10 rounded-lg flex items-center gap-3">
                    <Search className='size-4 text-emerald-300'/>
                    <input 
                        onChange={onSearchInputChanged} 
                        value={search}
                        className="bg-transparent flex-1 outline-none h-auto border-0 p-0 text-sm focus:ring-0" 
                        type="text" 
                        placeholder="Search event..."
                    />
                </div>
            </div>
            <Table>            
            <thead>
                <tr className='border-b border-white/10'>
                    <TableHeader style={{width:48}}>
                        <input type="checkbox" className='size-4 bg-black/20 rounded border border-white/10'/>
                    </TableHeader>
                    <TableHeader>Code</TableHeader>
                    <TableHeader>Title</TableHeader>
                    <TableHeader>Details</TableHeader>
                    <TableHeader>Maximum Attendees</TableHeader>
                    <TableHeader>Attendees Amount</TableHeader>
                    <TableHeader style={{width:64}}></TableHeader>
                </tr>
            </thead>
            <tbody>
                {events
                .filter(event => event.id.toLowerCase().includes(search.toLowerCase()))
                .map((event) => {
                    return(
                        <TableRow key={event.id}>
                            <TableCell>
                                <input type="checkbox" className='size-4 bg-black/20 rounded border border-white/10'/>
                            </TableCell>
                            <TableCell>
                                <span>{event.id}</span>
                            </TableCell>
                            <TableCell>
                                <span>{event.title}</span>
                            </TableCell>
                            <TableCell>
                                <span>{event.details}</span>
                            </TableCell>
                            <TableCell>
                                {event.maximumAttendees}
                            </TableCell>
                            <TableCell>
                                {event.attendeesAmount}
                            </TableCell>
                            <TableCell>
                            <IconButton transparent> {/* auto true */}
                                <MoreHorizontal className='size-4'/>
                            </IconButton>
                            </TableCell>
                        </TableRow>
                    )
                } )}
            </tbody>
            <tfoot>
                <tr>
                    <TableCell colSpan={3}>Showing {events.length} of {total} events</TableCell>
                    <TableCell  className='text-right' colSpan={4}>
                        <div className='inline-flex items-center gap-8'>
                            <span>Page {page} of {totalPages} </span>
                            <div className='flex gap-1.5'>
                                <IconButton onClick={goToFirstPage} disabled={page===1}> 
                                    <ChevronsLeft className='size-4'/>
                                </IconButton>
                                <IconButton onClick={goToPreviousPage} disabled={page===1}>
                                    <ChevronLeft className='size-4'/>
                                </IconButton>
                                <IconButton onClick={goToNextPage} disabled={page===totalPages}>
                                    <ChevronRight className='size-4'/>
                                </IconButton>
                                <IconButton onClick={goToLastPage} disabled={page===totalPages}>
                                    <ChevronsRight className='size-4'/>
                                </IconButton>
                            </div>
                        </div>
                    </TableCell>
                </tr>
            </tfoot>
            </Table>
        </div>
    )
}