import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import React from "react";

interface TaskCopmonentProps extends Task {
    onStatusChange: (taskId: number) => void;
}

const Task = ({ id, status, title, time, onStatusChange }: TaskCopmonentProps) => {
    const [checked, setChecked] = React.useState(status);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        if (onStatusChange && id)
            onStatusChange(id);
    };
    return (
        <div className="task flex" >
            <FormControlLabel
                label=""
                control={<Checkbox checked={checked} onChange={handleChange} color="primary" />}
            ></FormControlLabel>
            <Typography className={checked ? "line-through mr-2 mt-2 grow" : "mr-2 mt-2 grow"}>{title}</Typography>
            <Typography className="mr-2 mt-2">{time}</Typography>
        </div>
    );
};

export default Task;