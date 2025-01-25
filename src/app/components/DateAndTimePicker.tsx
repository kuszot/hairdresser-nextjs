'use client';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import dynamic from 'next/dynamic';

const Calendar = dynamic(() => import('./Calendar'), { ssr: false });
const TimePicker = dynamic(() => import('./TimePicker'), { ssr: false });

const DateAndTimePicker = () => {
    const today:dayjs.Dayjs = dayjs(new Date()) ;
  return (
    <div className='flex flex-col'>
        <LocalizationProvider adapterLocale="pl" dateAdapter={AdapterDayjs}>
            <Calendar currentDate={today}/>
            <TimePicker currentDate={today}/>
        </LocalizationProvider>
    </div>
  )
}

export default DateAndTimePicker