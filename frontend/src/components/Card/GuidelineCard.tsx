import { Typography } from "@mui/material"
import React from "react";
import Link from "next/link";

const GuidelineCard = ({
    title,
    description,
    ownerName,
    ownerId
}: GuideLineCard) => {


    return (
        <div className="flex flex-col w-full shadow-lg">
            <div className="flex flex-col bg-green-no-hover text-center py-2 text-white rounded-t-lg">
                <Typography variant="h5">{title}</Typography>
                <Link href={`/user/${ownerId}`} className="text-black no-underline">
                    <Typography variant="body2">{ownerName}</Typography>
                </Link>
            </div>
            <div className="flex flex-col softGreenBackground px-6 py-6 gap-4 rounded-b-lg grow">
                <Typography variant="body2" className="px-3 py-6 bg-white grow" dangerouslySetInnerHTML={{ __html: description }} />
            </div>
        </div>
    );
};

export default GuidelineCard;