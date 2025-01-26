'use client';
import { ScheduleXCalendar } from '@schedule-x/react'
import {
    createCalendar,
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'

import '@schedule-x/theme-default/dist/index.css'
import {useEffect, useState } from 'react'

// pluggins
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createCurrentTimePlugin } from '@schedule-x/current-time'
import { createResizePlugin } from '@schedule-x/resize'
import { createEventModalPlugin } from '@schedule-x/event-modal'

import AddEventModal from './AddEventModal';

function CalendarApp() {
  const currentDate : Date = new Date();

  // initialize plugins
  const eventsService = useState(() => createEventsServicePlugin())[0]
  const dragAndDropPlugin = createDragAndDropPlugin();
  const currentTimePlugin = createCurrentTimePlugin();
  const resizePlugin = createResizePlugin();
  const eventModalPlugin = createEventModalPlugin();

  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newEvent, setNewEvent] = useState<object>({});

//   fetch events
  useEffect(() => {
    const fetchEvents = async () => {
        try {
            const response = await fetch('http://localhost:3001/events');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error(error);
        }
    }
    fetchEvents();
  }, [])


  const handleDateClick = (dateTime : string) => {
    setIsModalOpen(true);
    setNewEvent({
        title: '',
        start: dateTime,
    });
  }
  
 
  const calendar = createCalendar({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: events,
    isDark: true,
    isResponsive: true,
    plugins: [eventsService,dragAndDropPlugin,currentTimePlugin,resizePlugin,eventModalPlugin],
    locale: 'pl-PL',
    selectedDate: currentDate.toISOString().split('T')[0],
    callbacks: {
        onClickDateTime(dateTime) {
            handleDateClick(dateTime);
        },
    }
  })
 
  useEffect(() => {
    // get all events
    eventsService.getAll()
  }, [])
 
  return (
    <div>
      {isModalOpen && <AddEventModal/>}
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}
 
export default CalendarApp