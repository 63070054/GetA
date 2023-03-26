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
                className='bg-green opacity-25 w-full rounded-lg'
                name={name}
                type={type}
                onChange={handleInputChange}
                color="primary"
            />
        </div>
    );
};

export default FormsInput;