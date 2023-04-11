import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react';
import AddTodoModal from '../Modal/AddTodoModal';

interface AddTodoCardButtonProps{
    addToDo:(newToDo:TodolistCard)=>void;
}

const AddTodoCardButton = ({addToDo}:AddTodoCardButtonProps) => {
    const [open, setOpen] = useState(false);
    const addDailyTodo =()=>{
        console.log("Added")
    }
    return (
        <div>
            <Card className="todolistCard h-96 rounded-lg border-dashed border-4" onClick={()=>setOpen(true)}>
                <Button fullWidth={true} className="flex justify-center items-center h-full p-0 fsize-50">+</Button>
            </Card>
            <AddTodoModal addToDo={addToDo} openModal={open} setOpenModal={setOpen}/>
        </div>
    );
};

export default AddTodoCardButton;