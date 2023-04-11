import { Button, Card, CardActions, CardContent, CardMedia, Fab, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import Task from "../Task";
import Divider from '@mui/material/Divider';
import AddTaskModal from "../Modal/AddTaskModal";
import { useState } from "react";

interface TodolistCardProps extends TodolistCard {
    addTask: (toDoIndex: number, newTask: Task) => void;
    toDoIndex: number;
}

const TodolistCard = ({ date, tasks, addTask, toDoIndex }: TodolistCardProps) => {
    const [taskList, setTaskList] = useState(tasks);
    const [open, setOpen] = useState(false);
    const handleChange = (taskId: string) => {
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
    const closeModal = () => {
        setOpen(open);
    }

    const handleonChangeStatus = (task: Task) => {
        if (task.id) handleChange(task?.id)
    }

    return (
        <div className="relative">
            <Card className="todolistCard h-96 rounded-lg overflow-y-auto">
                <CardContent className="p-0">
                    <Typography className="todolistTitle p-2 sticky top-0 z-10" gutterBottom component="div">
                        {date}
                    </Typography>
                    <div className="px-3">
                        {taskList.map((task, index) =>
                            task.status === false ? <Task key={index} {...task} onStatusChange={() => handleonChangeStatus(task)} /> : null
                        )}
                    </div>
                    {taskList.some(task => task.status === true) && <Divider variant="middle" className="mt-5" color="primary" />}
                    <div className="px-3">
                        {taskList.map((task, index) =>
                            task.status === true ? <Task key={index} {...task} onStatusChange={() => handleonChangeStatus(task)} /> : null
                        )}
                    </div>
                </CardContent>
                <CardActions className="flex justify-end items-end">
                    <Fab size="small" color="info" aria-label="add" className="bg-orange absolute bottom-5 right-10" onClick={() => { setOpen(true) }}>
                        <AddIcon className="text-white" />
                    </Fab>
                </CardActions>
            </Card>
            <AddTaskModal openModal={open} setOpenModal={setOpen} {...{ addTask, toDoIndex }}></AddTaskModal>
        </div>
    );
};

export default TodolistCard;