import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';

import {useState} from 'react';

interface AddEventModalProps {
    event : {
        title: string,
        start: string,
    };
    position : { x: number, y: number };
}

const AddEventModal = ({event,position} : AddEventModalProps) => {

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [start, setStart] = useState<Dayjs | null>(dayjs(event.start));
    const [end, setEnd] = useState<Dayjs | null>(dayjs(event.start));


    const modalWidth = 300;
    const modalHeight = 378;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

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



  return (
    <div className='absolute w-[300px]' style={{
        left: `${adjustedX}px`,
        top: `${adjustedY}px`,
        transform: 'translate(-50%, -50%)',
        zIndex: 50,
      }}>
        <div className='bg-white p-4 rounded-lg shadow-lg flex flex-col gap-3'>
            <h2 className='text-xl font-bold mb-4 text-black'>Dodaj nowe zdarzenie</h2>
            <TextField value={name} onChange={(e : React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} id="standard-basic" label="Imię i nazwisko" variant="outlined" />
            <TextField value={description} onChange={(e : React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)} id="standard-basic" label="Opis" variant="outlined" />
            <LocalizationProvider adapterLocale="pl" dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label="od"
                    value={start}
                    onChange={(newDate) => setStart(newDate)}
                    ampm={false}
                />
                <DateTimePicker
                    label="do"
                    ampm={false}
                    value={end}
                    onChange={(newDate) => setEnd(newDate)}
                />
            </LocalizationProvider>
            <div>
                <button className='bg-blue-500 text-white px-4 py-2 rounded-lg'>Dodaj</button>
            </div>
        </div>
    </div>
  )
}

export default AddEventModal