import React from 'react';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';

const FormsInput = ({ name }: FormsInput) => {
    return (
        <div>
            <Typography variant="body2" className="self-start" color="#CBD5E1" gutterBottom>{name}</Typography>
            <TextField
                hiddenLabel
                variant="filled"
                size="small"
            />
        </div>
    );
};

export default FormsInput;