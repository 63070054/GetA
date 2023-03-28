import { Button, Card, CardActions, CardContent, CardMedia, Fab, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import Task from "../Task";
import Divider from '@mui/material/Divider';
import React from "react";
import FilterModal from "../Modal/FilterModal";
import AddTaskModal from "../Modal/AddTaskModal";

interface TodolistCardProps extends TodolistCard {
    addTask:(toDoIndex:number, newTask:Task)=>void;
    toDoIndex: number;
}

const TodolistCard = ({ date, tasks, addTask, toDoIndex}: TodolistCardProps) => {
    const [taskList, setTaskList] = React.useState(tasks);
    const [open, setOpen] = React.useState(false);
    const handleChange = (taskId: number) => {
        setTaskList((prevTasks) => {
            const updatedTasks = prevTasks.map((task) => {
                if (task.id === taskId) {
                    return { ...task, status: !task.status };
                }
                return task;
            });

            return updatedTasks;
        });
    };
    const clostModal = () => {
        setOpen(open);
    }

    const handleonChangeStatus = (task: Task) => {
        if(task.id) handleChange(task?.id)
    }

    return (
        <div>
            <Card className="todolistCard max-w-xs h-96 rounded-lg">
                <CardContent className="p-0">
                    <Typography className="todolistTitle p-2" gutterBottom component="div">
                        {date}
                    </Typography>
                    <div className="px-3">
                        {taskList.map(task =>
                            task.status === false ? <Task key={task.id} id={task.id} status={task.status} title={task.title} time={task.time} onStatusChange={() => handleonChangeStatus(task)} /> : null
                        )}
                    </div>
                    <Divider variant="middle" className="mt-5" color="primary" />
                    <div className="px-3">
                        {taskList.map(task =>
                            task.status === true ? <Task key={task.id} id={task.id} status={task.status} title={task.title} time={task.time} onStatusChange={() => handleonChangeStatus(task)} /> : null
                        )}
                    </div>

                </CardContent>
                    <CardActions className="flex justify-end items-end">
                        <Fab size="small" color="info" aria-label="add" className="bg-orange" onClick={() => { setOpen(true) }}>
                            <AddIcon className="text-white" />
                        </Fab>
                    </CardActions>
            </Card>
            <AddTaskModal openModal={open} setOpenModal={setOpen} {...{addTask, toDoIndex}}></AddTaskModal>
        </div>
    );
};

export default TodolistCard;