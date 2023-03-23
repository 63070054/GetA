import { Button, Card, CardActions, CardContent, CardMedia, Fab, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import Task from "../Task";

const TodolistCard = ({ date, tasks }: TodolistCard) => {
    return (
        <div>
            <Card className="todolistCard">
                <CardContent>
                    <Typography className="todolistTitle" gutterBottom component="div" >
                        {date}
                    </Typography>
                    <Task status={false} title="Do HomeWork"></Task>
                </CardContent>
                <CardActions className="grid justify-items-end ">
                    <Fab size="small" color="info" aria-label="add">
                        <AddIcon />
                    </Fab>
                </CardActions>
            </Card>
        </div>
    );
};

export default TodolistCard;