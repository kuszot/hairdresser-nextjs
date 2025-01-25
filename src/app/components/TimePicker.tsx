'use client';
import dayjs from 'dayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PickersActionBar } from '@mui/x-date-pickers/PickersActionBar';
interface TimePickerProps {
  currentDate: dayjs.Dayjs;
  
}

declare module '@mui/material/styles' {
  interface Components {
    [key: string]: any
  }
}

const TimePicker = ({currentDate} : TimePickerProps) => {
  const theme = createTheme({
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
            color: 'white',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline : {
            borderColor: 'rgba(255, 255, 255, 0.23)',
          },
          root: {
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            color: 'white',
          },
        },
      }, 
    }
  });
  return (
    <div className='flex justify-center'>
        <ThemeProvider theme={theme}>
          <MobileTimePicker
              defaultValue={currentDate}
              label="Godzina"
              localeText={{
                cancelButtonLabel: 'Zamknij',
                okButtonLabel: 'Zapisz',
                toolbarTitle: 'Wybierz datę'

              }}
              
          />
        </ThemeProvider>
    </div>
  )
}

export default TimePicker