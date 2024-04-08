import { Routes, Route } from 'react-router-dom'
import { Home } from './home'
import { ViewAttendee } from './view-attendee'
import { CreateAttendee } from './create-attendee'
import { ViewEvent } from './view-event'
import { CreateEvent } from './create-event'

import './index.css'

export const Main = () => {
    return(
        <Routes>
            <Route path='/' element= {<Home/>} />
            <Route path='/participants' element= {<ViewAttendee/>} />
            <Route path='/register-attendee' element= {<CreateAttendee />} />
            <Route path='/events' element= {<ViewEvent />} />
            <Route path='/create-event' element= {<CreateEvent />} />
        </Routes>
    )


    // const routes = ([
    //   {
    //     path: '/',
    //     element: '<Home />',
    //     loader: async () => {
    //         return fetch(`./home`)
    //     },
    //   },
    //   {
    //     path: '/participants',
    //     element: '<ViewAttendee />',
    //   },
    //   {
    //     path: '/register-attendee',
    //     element: '<CreateAttendee />',
    //   },
    //   {
    //     path: '/events',
    //     element: '<ViewEvent />',
    //   },
    //   {
    //     path: '/create-event',
    //     element: '<CreateEvent />',
    //   }
    // ]);
    //   return <RouterProvider router={createBrowserRouter(routes)} />
  }