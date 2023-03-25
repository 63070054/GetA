import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const CheckBox = ({label}:CheckBox) => {
    return (
        <div>
            <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label={label} />
            </FormGroup>
        </div>
    );
};

export default CheckBox;