import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from 'lucide-react'
// import { formatRelative } from 'date-fns'
// import { ptBR } from 'date-fns/locale'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
//import 'dayjs/locale/pt-br'
import { IconButton } from './icon-button'
import { Table } from './table/table'
import { TableHeader } from './table/table-header'
import { TableCell } from './table/table-cell'
import { TableRow } from './table/table-row'
import { ChangeEvent, useEffect, useState } from 'react'
// import { attendees } from '../data/attendees'

dayjs.extend(relativeTime)
//dayjs.locale('pt-br')

interface Attendee{
    id: string
    name: string
    email: string
    eventId: string
    createdAt: string
    checkedInAt: string | null
}

export function AttendeeList(){
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

    const [attendees, setAttendees] = useState<Attendee[]>([])

    const [total, setTotal] = useState(0)
    const totalPages = Math.ceil(total/10)
    
    useEffect(() => {

        const url = new URL('http://localhost:3333/events/0e349644-78f8-45c7-8481-d740d35a9c44/attendees')

        url.searchParams.set('pageIndex', String(page-1))
        if(search.length > 0){
            url.searchParams.set('query', search)
        }

        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setAttendees(data.attendees)
            setTotal(data.total)
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
        // setPage(page + 1)
        setCurrentPage(page + 1)
    }

    function goToPreviousPage(){
        // setPage(page - 1)
        setCurrentPage(page - 1)
    }

    function goToFirstPage(){
        // setPage(1)
        setCurrentPage(1)
    }

    function goToLastPage(){
        // setPage(totalPages)
        setCurrentPage(totalPages)
    }

    return(
        <div className='flex flex-col gap-4'>
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold ">Participants</h1>
                <div className="py-3 px-1.5 w-72 border border-white/10 rounded-lg flex items-center gap-3">
                    <Search className='size-4 text-emerald-300'/>
                    <input 
                        onChange={onSearchInputChanged} 
                        value={search}
                        className="bg-transparent flex-1 outline-none h-auto border-0 p-0 text-sm focus:ring-0" 
                        type="text" 
                        placeholder="Search participant..."
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
                        <TableHeader>Participant</TableHeader>
                        <TableHeader>Date of inscription</TableHeader>
                        <TableHeader>Date of check-in</TableHeader>
                        <TableHeader style={{width:64}}></TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {/* slice((page-1)*10, page * 10). */}
                    {attendees.map((attendee) => {
                        return(
                            <TableRow key={attendee.id}>
                                <TableCell>
                                    <input type="checkbox" className='size-4 bg-black/20 rounded border border-white/10'/>
                                </TableCell>
                                <TableCell>
                                    {attendee.id}
                                </TableCell>
                                <TableCell>
                                    <div className='flex flex-col gap 1'>
                                        <span className='font-semibold text-white'>
                                            {attendee.name}
                                        </span>
                                        <span>
                                            {attendee.email.toLocaleLowerCase()}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {dayjs().to(attendee.createdAt)}
                                    {/* {formatRelative(attendee.createdAt, new Date(), {locale: ptBR})} */}
                                </TableCell>
                                <TableCell>
                                    {attendee.checkedInAt === null 
                                    ? <span className="text-zinc-400">Still not checked</span>
                                    : dayjs().to(attendee.checkedInAt)}                                    
                                </TableCell>
                                <TableCell>
                                    <IconButton transparent> {/* auto true */}
                                        <MoreHorizontal className='size-4'/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <TableCell colSpan={3}>Showing {attendees.length} of {total} items</TableCell>
                        <TableCell  className='text-right' colSpan={3}>
                            <div className='inline-flex items-center gap-8'>
                                <span>Page {page} of {totalPages}</span>
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