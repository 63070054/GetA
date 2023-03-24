import OrangeButton from "@/components/Button/OrangeButton";
import FormsInput from "@/components/forms/FormsInput";
import Typography from '@mui/material/Typography';
const index = () => {
    return (
        <div className="flex w-full">
            <div className="backgroundRegister w-full items-center flex-col gap-4">
                <div className="flex flex-col w-9/12 items-center">
                    <Typography className="registerWelcome leading-none m-0 self-start" variant="h3" gutterBottom>Welcome to GET A</Typography>
                    <Typography variant="body2" className="self-start" color="#CBD5E1" gutterBottom>แบ่งปันหรือเสาะหาสรุปได้ทุกวิชาที่คุณต้องการ</Typography>
                    <Typography variant="body2" className="self-start" color="#CBD5E1" gutterBottom>Let’s GET Start and GET A in your Exam :)</Typography>
                    <img src="getAWithBook.png " className="imgGetA shadow-lg rounded-xl m-1" ></img>
                </div>
            </div>
            <div className="backgroundRegistert w-full items-center flex-col gap-4">
                <div className="flex flex-col gap-4 w-full items-center">
                    <Typography className="registerTitle leading-none m-0 items-center" variant="h3" gutterBottom>สมัครสมาชิก</Typography>
                    <FormsInput name="ชื่อ นามสกุล"></FormsInput>
                    <FormsInput name="ชื่อผู้ใช้"></FormsInput>
                    <FormsInput name="รหัสผ่าน"></FormsInput>
                    <FormsInput name="ยืนยันรหัสผ่าน"></FormsInput>
                </div>
            </div>
        </div>
    );
};

export default index;