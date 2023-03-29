import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { ChangeEvent, useState } from 'react';

interface timeProps{
  handleTimeChange:(time:Dayjs)=> void
}

const CustomTimePicker = (({handleTimeChange}:timeProps) => {
  const [value, setValue] = useState<Dayjs|null>(dayjs('2022-04-17T00:00'));


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimeField
          label="เวลา(ไม่จำเป็นต้องระบุ)"
          value={value}
          onChange={(newValue) => {setValue(newValue)
          if(newValue)
          handleTimeChange(newValue)
          }}
          format="HH:mm"
        />
    </LocalizationProvider>
  );
})

export default CustomTimePicker;