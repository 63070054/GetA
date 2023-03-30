import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { format } from 'path';

interface datePickerProps{
  handleDateChange:(date:Dayjs)=> void
}

export default function CustomDatePicker({handleDateChange}:datePickerProps) {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2023-04-01'));
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker value={value}
          onChange={(newValue) => {setValue(newValue)
          if(newValue)
          handleDateChange(newValue)}
          }
          format="DD/MM/YYYY"/>
    </LocalizationProvider>
  );
}