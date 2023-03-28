import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import React from "react";

const Task = ({id, status, title, time,onStatusChange }: Task) => {
    const [checked, setChecked] = React.useState(status);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        if(onStatusChange&&id)
        onStatusChange(id);
    };
    return (
        <div className="task flex" >
            <FormControlLabel
            label=""
            control={<Checkbox checked={checked} onChange={handleChange} color="primary"/>}
            ></FormControlLabel>
            <Typography className={checked ? "line-through mr-2 mt-2 grow" : "mr-2 mt-2 grow"}>{title}</Typography>
            <Typography className="mr-2 mt-2">{time}</Typography>
        </div>
    );
};

export default Task;