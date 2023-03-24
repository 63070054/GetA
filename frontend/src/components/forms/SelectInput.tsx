import React from 'react';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const [selectInput, setSelectInput] = React.useState('');

const handleChange = (event: SelectChangeEvent) => {
    setSelectInput(event.target.value as string);
};

const SelectInput = () => {
    return (
        <div>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">nameSelect</InputLabel>
                <Select
                    value={selectInput}
                    label="Age"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};

export default SelectInput;