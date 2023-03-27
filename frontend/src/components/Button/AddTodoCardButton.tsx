import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';

const AddTodoCardButton = () => {
    const addDailyTodo =()=>{
        console.log("Added")
    }
    return (
        <div>
            <Card className="todolistCard max-w-xs h-96 rounded-lg border-dashed border-4" onClick={addDailyTodo}>
                <Button fullWidth={true} className="flex justify-center items-center h-full p-0 fsize-50">+</Button>
            </Card>
        </div>
    );
};

export default AddTodoCardButton;