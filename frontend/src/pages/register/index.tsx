import OrangeButton from "@/components/Button/OrangeButton";
import FormsInput from "@/components/forms/FormsInput";
import { useRouter } from "next/router";
import Typography from '@mui/material/Typography';
import Link from "next/link";
import { ChangeEvent, useState } from "react"
import SelectInput from "@/components/forms/SelectInput";
import InfoGetA from "@/components/GetAInfo/InfoGetA";


const index = () => {
    const yearData: selectValue[] = [
        {
            id: "0",
            name: "ปี 1",
        },
        {
            id: "1",
            name: "ปี 2",
        },
        {
            id: "2",
            name: "ปี 3",
        },
        {
            id: "3",
            name: "ปี 4",
        },
        {
            id: "4",
            name: "อื่นๆ",
        },
    ]
    const supData: selectValue[] = [
        {
            id: "0",
            name: "IT",
        },
        {
            id: "1",
            name: "Data science",
        }
    ]
    const supSupData: selectValue[] = [
        {
            id: "0",
            name: "Network",
        },
        {
            id: "1",
            name: "Software Engineer",
        },
        {
            id: "2",
            name: "Multimedia",
        },
        {
            id: "3",
            name: "อื่นๆ",
        },
    ]


    const [inputValue, setInputValue] = useState<InputValue>({
        fullName: "",
        userName: "",
        password: "",
        confirmPassword: "",
    })

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;

        const copyInputValue = inputValue;
        copyInputValue[name] = value;
        setInputValue(copyInputValue);
    }

    return (
        <div className="flex w-full shadow-2xl">
            <div className="backgroundRegister w-full items-center flex-col gap-4">
                <div className="flex flex-col w-9/12 items-center">
                    <InfoGetA />
                </div>
            </div>
            <div className="backgroundRegistert w-full items-center flex-col gap-4 px-12 py-2">
                <div className="flex flex-col gap-4 w-full items-center">
                    <Typography className="registerTitle leading-none m-0 items-center" variant="h3" gutterBottom>สมัครสมาชิก</Typography>
                    <FormsInput label="ชื่อ นามสกุล" name="fullName" type="text" {...{ inputValue, handleInputChange }}></FormsInput>
                    <FormsInput label="ชื่อผู้ใช้" name="userName" type="text" {...{ inputValue, handleInputChange }}></FormsInput>
                    <FormsInput label="รหัสผ่าน" name="password" type="password" {...{ inputValue, handleInputChange }}></FormsInput>
                    <FormsInput label="ยืนยันรหัสผ่าน" name="confirmPassword" type="password" {...{ inputValue, handleInputChange }}></FormsInput>
                    <div className="flex items-center justify-center gap-6 w-full">
                        <SelectInput label="ชั้นปี" selectData={yearData} />
                        <SelectInput label="สาขา" selectData={supData} />
                        <SelectInput label="แขนง" selectData={supSupData} />
                    </div>
                </div>
                <OrangeButton ButtonName="สมัคร"></OrangeButton>
                <div className="flex gap-2 items-center	">
                    <Typography className="text-sm">มีบัญชีอยู่แล้ว?</Typography>
                    <Link href="/login" className="no-underline	">
                        <Typography className="text-sm " variant="info"> ไปที่หน้าเข้าสู่ระบบ</Typography>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default index;