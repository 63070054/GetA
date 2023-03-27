import { Button, Card, CardActions, CardContent, CardMedia, Fab, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import React from "react";

const GuidelineCard = () => {
    return (
        <div>
            <Card className="todolistCard max-w-xs h-96 rounded-lg">
                <CardContent className="p-0">
                    <Typography className="todolistTitle p-2" gutterBottom component="div">
                        ITPM
                    </Typography>
                </CardContent>
                <CardActions className="flex justify-end items-end">
                </CardActions>
            </Card>
        </div>
    );
};

export default GuidelineCard;