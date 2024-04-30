import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/react'

import { Home } from './home'
import { ViewAttendee } from './view-attendee'
import { ViewEvent } from './view-event'
import { CreateEvent } from './create-event'
import { RegisterAttendee } from './create-attendee'
import { UpdateEvent } from './update-event'
import { UpdateAttendee } from './update-attendee'

import './index.css'
import { DelEvent } from './del-event'
import { DelAttendee } from './del-attendee'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/events",
        element: <ViewEvent />,
    },
    {
        path: "/participants",
        element: <ViewAttendee />,
    },
    {
        path: "/create-event",
        element: <CreateEvent />,
    },
    {
        path: "/register-attendee",
        element: <RegisterAttendee />,
    },
    {
        path: "/update-event",
        element: <UpdateEvent />,
    },
    {
        path: "/update-attendee",
        element: <UpdateAttendee />,
    },
    {
        path: "/delete-event",
        element: <DelEvent />,
    },
    {
        path: "/delete-attendee",
        element: <DelAttendee />,
    }
]
)
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
    <Analytics/>
    <SpeedInsights/>
        <RouterProvider router={router}/>
    </React.StrictMode>
)