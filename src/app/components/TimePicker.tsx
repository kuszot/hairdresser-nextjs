'use client';
import dayjs from 'dayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';

interface TimePickerProps {
  currentDate: dayjs.Dayjs
}

const TimePicker = ({currentDate} : TimePickerProps) => {
  return (
    <div>
        <MobileTimePicker
            defaultValue={currentDate}
        />
    </div>
  )
}

export default TimePicker