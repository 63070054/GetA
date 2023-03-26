import { Button, Card, CardActions, CardContent, CardMedia, Fab, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import Task from "../Task";
import Divider from '@mui/material/Divider';
import React from "react";

const TodolistCard = ({ date, tasks }: TodolistCard) => {
    const [taskList, setTaskList] = React.useState(tasks);
    const handleChange = (taskId:number) => {
        setTaskList((prevTasks) => {
            // find the task with the given id and update its status
            const updatedTasks = prevTasks.map((task) => {
                if (task.id === taskId) {
                    console.log("ada")
                    return { ...task, status: !task.status };
                }
                return task;
            });
            
            return updatedTasks;
        });
    };
    return (
        <div>
            <Card className="todolistCard max-w-80">
                <CardContent>
                    <Typography className="todolistTitle" gutterBottom component="div" >
                        {date}
                    </Typography>
                    <div>
                        {taskList.map(task =>
                            task.status === false ? <Task key={task.id} id={task.id} status={task.status} title={task.title} onStatusChange={() => handleChange(task.id)}/> : null
                        )}
                    </div>
                    <Divider variant="middle" className="mt-5" color="primary"/>
                    <div>
                        {taskList.map(task =>
                            task.status === true ? <Task key={task.id} id={task.id} status={task.status} title={task.title} onStatusChange={() => handleChange(task.id)}/> : null
                        )}
                    </div>
                    
                </CardContent>
                <CardActions className="grid justify-items-end ">
                    <Fab size="small" color="info" aria-label="add">
                        <AddIcon className="text-white" />
                    </Fab>
                </CardActions>
            </Card>
        </div>
    );
};

export default TodolistCard;