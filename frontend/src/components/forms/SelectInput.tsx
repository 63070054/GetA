import React from 'react';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const SelectInput = ({ label, selectData, handleSelectChange, name }: SelectInput) => {
    return (
        <>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    onChange={(e: SelectChangeEvent<string>) => handleSelectChange(e.target.value, name)}
                    label={label}>
                    {selectData.map(data => (
                        <MenuItem value={data.name}>{data.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
};

export default SelectInput;