import { Button, Card, CardActions, CardContent, CardMedia, Fab, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import Task from "../Task";
import Divider from '@mui/material/Divider';
import AddTaskModal from "../Modal/AddTaskModal";
import { useState } from "react";

interface TodolistCardProps extends TodolistCard {
    addTask: (toDoIndex: number, newTask: Task) => void;
    toDoIndex: number;
    handleonChangeStatus: (toDoIndex: number, task: Task) => void;
}

const TodolistCard = ({ id, date, subTasks, addTask, toDoIndex, handleonChangeStatus }: TodolistCardProps) => {
    const [open, setOpen] = useState(false);

    console.log(subTasks)

    return (
        <div className="relative">
            <Card className="todolistCard h-96 rounded-lg overflow-y-auto">
                <CardContent className="p-0">
                    <Typography className="todolistTitle p-2 sticky top-0 z-10" gutterBottom component="div">
                        {date}
                    </Typography>
                    <div className="px-3">
                        {subTasks?.map((task, index) =>
                            task.status === false ? <Task key={index} {...task} onStatusChange={() => handleonChangeStatus(toDoIndex, task)} /> : null
                        )}
                    </div>
                    {subTasks?.some(task => task.status === true) && <Divider variant="middle" className="mt-5" color="primary" />}
                    <div className="px-3">
                        {subTasks?.map((task, index) =>
                            task.status === true ? <Task key={index} {...task} onStatusChange={() => handleonChangeStatus(toDoIndex, task)} /> : null
                        )}
                    </div>
                </CardContent>
                <CardActions className="flex justify-end items-end">
                    <Fab size="small" color="info" aria-label="add" className="bg-orange absolute bottom-5 right-10" onClick={() => { setOpen(true) }}>
                        <AddIcon className="text-white" />
                    </Fab>
                </CardActions>
            </Card>
            {id && (
                < AddTaskModal openModal={open} setOpenModal={setOpen} taskId={id} {...{ addTask, toDoIndex }} />
            )}
        </div>
    );
};

export default TodolistCard;