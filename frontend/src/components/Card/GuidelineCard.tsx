import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Fab, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import React from "react";
import IconGetA from "../IconGetA";

const GuidelineCard = ({
    title,
    description,
}: GuideLineCard) => {


    return (
        <div className="flex flex-col w-full shadow-lg">
            <div className="flex flex-col bg-green-no-hover text-center py-2 text-white rounded-t-lg">
                <Typography variant="h5">{title}</Typography>
            </div>
            <div className="flex flex-col softGreenBackground px-6 py-6 gap-4 rounded-b-lg grow">
                <Typography variant="body2" className="px-3 py-6 bg-white grow" dangerouslySetInnerHTML={{ __html: description }} />
            </div>
        </div>
    );
};

export default GuidelineCard;