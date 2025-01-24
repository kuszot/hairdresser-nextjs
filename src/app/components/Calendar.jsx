'use client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';

const Calendar = () => {
  const theme = createTheme({
    components: {
      MuiDateCalendar: {
        styleOverrides: {
          root: {
            color: 'white',           // Set text color

          },
          // Optional: Customize other parts like header or day cells
        },
      },
      MuiPickersDay: {
        styleOverrides: {
          root: {
            color: 'white',           // Set text color
            backgroundColor: 'transparent',  // Set background color
          },
          today: {
            border: '1px white solid !important'
          },
        },
      },
      
      MuiTypography: {
        styleOverrides: {
          root: {
            color: 'white !important',           // Set text color
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: 'white',           // Set text color
          },
        },
      },
    },
  });
  return (
    <LocalizationProvider adapterLocale="pl" dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <DateCalendar
           sx={{
            '& .MuiPickersDay-root.Mui-selected': {
              border: '0 !important',
            },
          }}
          defaultValue={dayjs(new Date())}
        />
      </ThemeProvider>
    </LocalizationProvider>
  )
}

export default Calendar