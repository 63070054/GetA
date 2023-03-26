import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";

const Task = ({id, status, title, time,onStatusChange }: Task) => {
    const [checked, setChecked] = React.useState(status);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        if(onStatusChange)
        onStatusChange(id);
    };
    return (
        <div className="task" >
            <FormControlLabel
            label={title}
            control={<Checkbox checked={checked} onChange={handleChange} color="primary"/>}
            className={checked ? "line-through" : ""}
            />
        </div>
    );
};

export default Task;