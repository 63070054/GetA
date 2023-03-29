import React from 'react';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';

const FormsInput = ({
    label,
    name,
    type,
    inputValue,
    handleInputChange
}: FormsInput) => {
    return (
        <div className="w-full">
            <Typography variant="body2" className="self-start" color="#103535" gutterBottom>{label}</Typography>
            <TextField
                hiddenLabel
                variant="filled"
                size="small"
                className='softGreenBackground w-full rounded-lg text-black'
                name={name}
                type={type}
                value={inputValue[name]}
                onChange={handleInputChange}
                color="primary"
            />
        </div>
    );
};

export default FormsInput;