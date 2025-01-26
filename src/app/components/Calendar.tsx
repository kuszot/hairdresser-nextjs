'use client';
import { ScheduleXCalendar } from '@schedule-x/react';
import {
  createCalendar,
  createViewDay,
  createViewWeek,
  createViewMonthGrid,
  createViewMonthAgenda,
} from '@schedule-x/calendar';
import { createEventsServicePlugin } from '@schedule-x/events-service';

import '@schedule-x/theme-default/dist/index.css';
import { useEffect, useState, useRef, useMemo } from 'react';

// plugins
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import { createCurrentTimePlugin } from '@schedule-x/current-time';
import { createResizePlugin } from '@schedule-x/resize';
import { createEventModalPlugin } from '@schedule-x/event-modal';

import EventModal from './EventModal';

interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  description: string;
}

function CalendarApp() {
  const currentDate: Date = new Date();

  // Initialize plugins
  const eventsService = useState(() => createEventsServicePlugin())[0];
  const dragAndDropPlugin = createDragAndDropPlugin();
  const currentTimePlugin = createCurrentTimePlugin();
  const resizePlugin = createResizePlugin();
  const eventModalPlugin = createEventModalPlugin();

  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<string>('add');

  // Using refs for modal-related data
  const newEventRef = useRef<Event>({
    title: '',
    start: '',
    end: '',
    description: '',
    id: '',
  });

  const modalPositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response: Response = await fetch('http://localhost:3001/events');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Event[] = await response.json();
        setEvents(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEvents();
  }, []);

  // Handle date click to show modal
  const handleDateClick = (event: MouseEvent, dateTime: string) => {
    newEventRef.current = {
      title: '',
      start: dateTime,
      end: '',
      description: '',
      id: '',
    };
    modalPositionRef.current = { x: event.clientX, y: event.pageY };

    // Toggle modal visibility
    setIsModalOpen(prevState => !prevState); // Correctly toggle the state
  };

  // Calendar configuration (memoized to avoid re-rendering unnecessarily)
  const calendar = useMemo(() => {
    return createCalendar({
      views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
      events: events,
      isDark: true,
      isResponsive: true,
      plugins: [eventsService, dragAndDropPlugin, currentTimePlugin, resizePlugin, eventModalPlugin],
      locale: 'pl-PL',
      selectedDate: currentDate.toISOString().split('T')[0],
      callbacks: {
        onClickDateTime(dateTime) {
          document.addEventListener(
            'click',
            (event) => {
              handleDateClick(event as MouseEvent, dateTime);
            },
            { once: true }
          );
        },
      },
    });
  }, [events]); // Only recreate the calendar when `events` change

  return (
    <div className="relative">
      {/* Render modal if it's open */}
      {isModalOpen && (
        <EventModal
          events={events}
          setEvents={setEvents}
          event={newEventRef.current} // Use ref values here
          position={modalPositionRef.current} // Use ref values here
          mode={mode}
          closeModal={() => setIsModalOpen(false)} // Close modal function
        />
      )}

      {/* Render the calendar */}
      <ScheduleXCalendar
        calendarApp={calendar}
      />
    </div>
  );
}

export default CalendarApp;
