import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

const TodolistCard = ({ date, tasks }: TodolistCard) => {
    return (
        <div>
            <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" >
                    {date}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Share</Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default TodolistCard;