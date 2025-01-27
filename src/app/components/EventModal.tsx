import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

import {useState} from 'react';

interface EventModalProps {
    event : {
        title: string,
        start: string,
        end: string,
        description: string,
        id: string,
        calendarId: string
    };
    position : { x: number, y: number };

    mode : string;

    setEvents : (events: Array<{ title: string; start: string; end: string; description: string; id: string; calendarId : string }>) => void;

    events: Array<{
        title: string;
        start: string;
        end: string;
        description: string;
        id: string;
        calendarId: string;
    }>;

    closeModal : () => void;
}



const EventModal = ({event,position,mode,setEvents,events,closeModal} : EventModalProps) => {
    
    const [name, setName] = useState<string>('');
    const [nameError, setNameError] = useState<boolean>(false);
    const [description, setDescription] = useState<string>('');
    const [descriptionError, setDescriptionError] = useState<boolean>(false);
    const [start, setStart] = useState<Dayjs | null>(dayjs(event.start));
    const [startDateError, seteStartDateError] = useState(false);
    const [end, setEnd] = useState<Dayjs | null>(dayjs(event.start));
    const [endDateError, seteEndDateError] = useState(false);
    
    const modalWidth = 300;
    const modalHeight = 378;
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = document.body.scrollHeight;

    const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
    
    let adjustedX = position.x;
    let adjustedY = position.y;
    
    if (position.x + modalWidth > viewportWidth) {
        adjustedX = viewportWidth - modalWidth;
    } else if (position.x - modalWidth <= 0) {
        adjustedX = modalWidth;
    }
    
    
    if (position.y + modalHeight > viewportHeight) {
        adjustedY = viewportHeight - modalHeight - 16;
    } else if (position.y - modalHeight <= 0) {
        adjustedY = modalHeight
    }
    
    function validateForm() {
        let valid = true;
        if (name.length === 0) {
            setNameError(true);
            valid = false;
        } else {
            setNameError(false);
        }
        if (description.length === 0) {
            setDescriptionError(true);
            valid = false;
        } else {
            setDescriptionError(false);
        }
        if (start === null || start === undefined) {
            valid = false;
            seteStartDateError(true);
        } else {
            seteStartDateError(false);
        }
        if (end === null || end === undefined || end.isBefore(start) || start?.isSame(end) || start?.isAfter(end)) {
            valid = false;
            seteEndDateError(true);
        } else {
            seteEndDateError(false);
        }
        console.log(start?.toISOString(), end?.toISOString());

        return valid;
    }

    async function handleAddEvent() {
        if (validateForm()) {
            const newEvent = {
                id: uuidv4(),
                title: name,
                start: start!.toISOString().slice(0, 16).replace('T', ' '),
                end: end!.toISOString().slice(0, 16).replace('T', ' '),
                description: description,
                calendarId : colors[Math.floor(Math.random() * colors.length)]
            }
            try {
                const response = await fetch('http://localhost:3001/events', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(newEvent),
                });
            
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
            
                const result = await response.json();
                console.log('Success:', result);
                setEvents([...events, newEvent]);
                closeModal();
              } catch (error) {
                console.error('Error:', error);
            }
        }           
    }

    return (
        <div className='absolute w-[300px]' style={{
        left: `${adjustedX}px`,
        top: `${adjustedY}px`,
        transform: 'translate(-50%, -50%)',
        zIndex: 50,
      }}>
        <div className='bg-white p-4 rounded-lg shadow-lg flex flex-col gap-3'>
            <h2 className='text-xl font-bold mb-4 text-black'>Dodaj nowe zdarzenie</h2>
            <TextField required={true} error={nameError} id='name' value={name} onChange={(e : React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} label="Imię i nazwisko" variant="outlined" />
            <TextField required={true} error={descriptionError} id='description' value={description} onChange={(e : React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)} label="Opis" variant="outlined" />
            <LocalizationProvider adapterLocale="pl" dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label="od"
                    value={start}
                    onChange={(newDate) => setStart(newDate)}
                    ampm={false}
                    slotProps={{
                        textField: {
                          error: startDateError,
                        },
                    }}
                />
                <DateTimePicker
                    label="do"
                    ampm={false}
                    value={end}
                    onChange={(newDate) => setEnd(newDate)}
                    slotProps={{
                        textField: {
                          error: endDateError,
                        },
                    }}
                />
            </LocalizationProvider>
            <div>
                <button onClick={handleAddEvent} className='bg-blue-500 text-white px-4 py-2 rounded-lg'>{mode === 'add' ? "Dodaj" : "Edytuj"}</button>
            </div>
        </div>
    </div>
  )
}

export default EventModal