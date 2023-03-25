import React from 'react';
import Typography from '@mui/material/Typography';

const InfoGetA = () => {
    return (
        <>
                    <Typography className="registerWelcome leading-none m-0 self-start" variant="h3" gutterBottom>Welcome to GET A</Typography>
                    <Typography variant="body2" className="self-start" color="#CBD5E1" gutterBottom>แบ่งปันหรือเสาะหาสรุปได้ทุกวิชาที่คุณต้องการ</Typography>
                    <Typography variant="body2" className="self-start" color="#CBD5E1" gutterBottom>Let’s GET Start and GET A in your Exam :)</Typography>
                    <img src="getAWithBook.png " className="imgGetA shadow-lg rounded-xl m-1" ></img>
        </>
    );
};

export default InfoGetA;