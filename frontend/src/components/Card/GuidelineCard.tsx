import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Fab, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import React from "react";
import IconGetA from "../IconGetA";

const GuidelineCard = ({
    id,
    title,
    description,
    folderId,
    files
}: GuideLineCard) => {


    return (
        <div className="flex flex-col w-full shadow-lg">
            <div className="flex flex-col bg-green-no-hover text-center py-2 text-white rounded-t-lg">
                <Typography variant="h5">{title}</Typography>
            </div>
            <div className="flex flex-col softGreenBackground px-6 py-6 gap-4 rounded-b-lg grow">
                <Typography variant="body2" className="px-3 py-6 bg-white grow" dangerouslySetInnerHTML={{ __html: description }} />
                <div className="flex flex-col">
                    <Typography variant="h6" className="underline">ควรค่าแก่การอ่าน</Typography>
                    <div className="grid grid-cols-3 gap-2 py-3">
                        {files.map(file => (
                            <IconGetA {...file} key={file.id} routeTo={file.routeTo.replace(":fileId", file.id).replace(":folderId", folderId)} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuidelineCard;