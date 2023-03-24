import OrangeButton from "@/components/Button/OrangeButton";
import Typography from '@mui/material/Typography';
const index = () => {
    return (
        <div className="flex w-full">
            <div className="backgroundRegister w-full items-center flex-col">
                <Typography className="registerTitle" variant="h3" gutterBottom>Welcome to GET A</Typography>
                <Typography variant="body2" gutterBottom>แบ่งปันหรือเสาะหาสรุปได้ทุกวิชาที่คุณต้องการ
                    Let’s GET Start and GET A in your Exam :)</Typography>
                <img src="getAWithBook.png" className="imgGetA shadow-lg rounded-xl" ></img>
            </div>
            <div className="backgroundRegistert w-full">
                \test
            </div>
        </div>
    );
};

export default index;