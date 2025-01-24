'use client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import 'dayjs/locale/pl';
import dayjs from 'dayjs';


declare module '@mui/material/styles' {
  interface Components {
    [key: string]: any
  }
}

interface CalendarProps {
  currentDate: dayjs.Dayjs
}

const Calendar = ({currentDate}: CalendarProps) => {
  const theme = createTheme({
    components: {
      MuiDateCalendar: {
        styleOverrides: {
          root: {
            color: 'white',

          },
        },
      },
      MuiPickersDay: {
        styleOverrides: {
          root: {
            color: 'white',
            backgroundColor: 'transparent',
          },
          today: {
            border: '1px white solid !important'
          },
        },
      },
      
      MuiTypography: {
        styleOverrides: {
          root: {
            color: 'white !important',
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: 'white',
          },
        },
      },
    },
  });
  return (
      <ThemeProvider theme={theme}>
        <DateCalendar
           sx={{
            '& .MuiPickersDay-root.Mui-selected': {
              border: '0 !important',
            },
          }}
          defaultValue={currentDate}
        />
      </ThemeProvider>
  )
}

export default Calendar