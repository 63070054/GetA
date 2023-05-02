import OrangeButton from "@/components/Button/OrangeButton";
import FormsInput from "@/components/forms/FormsInput";
import { useRouter } from "next/router";
import Typography from '@mui/material/Typography';
import Link from "next/link";
import { ChangeEvent, useState } from "react"
import SelectInput from "@/components/forms/SelectInput";
import InfoGetA from "@/components/GetAInfo/InfoGetA";
import CheckBox from "@/components/Input/CheckBox";
import api from "@/plugins/axios/api";
import Cookies from "js-cookie";
import GetAToast from "@/components/Alert/GetAToast";


const index = () => {

    const router = useRouter()

    const [inputValue, setInputValue] = useState<InputValue>({
        userName: "",
        password: "",
    })

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const copyInputValue = inputValue;
        copyInputValue[name] = value;
        setInputValue({ ...copyInputValue });
    }

    const logIn = async () => {
        const loginModel: LoginModel = {
            userName: inputValue.userName,
            password: inputValue.password
        }

        try {
            const result = await api.post("/login", loginModel)
            Cookies.set("token", result.data)
            router.push("/")
            GetAToast.fire({
                icon: "success",
                title: "เข้าสู่ระบบสำเร็จ",
            });

        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div className="flex w-full h-full shadow-2xl">
            <div className="backgroundRegister w-full items-center flex-col gap-4">
                <div className="flex flex-col w-9/12 items-center">
                    <InfoGetA />
                </div>
            </div>
            <div className="backgroundRegistert w-full items-center flex-col gap-4 px-12 py-2">
                <div className="flex flex-col gap-4  w-full items-center">
                    <Typography className="registerTitle leading-none m-0 items-center" variant="h3" gutterBottom>เข้าสู่ระบบ</Typography>
                    <FormsInput label="ชื่อผู้ใช้" name="userName" type="text" {...{ inputValue, handleInputChange }}></FormsInput>
                    <FormsInput label="รหัสผ่าน" name="password" type="password" {...{ inputValue, handleInputChange }}></FormsInput>
                </div>
                <div className="self-center" onClick={logIn}>
                    <OrangeButton ButtonName="เข้าสู่ระบบ"></OrangeButton>
                </div>
                <div className="self-center">
                    <div className="flex gap-2 items-center	">
                        <Typography className="text-sm">ยังไม่มีบัญชี ?</Typography>
                        <Link href="/register" className="no-underline	">
                            <Typography className="text-sm " variant="info"> ไปที่หน้าสมัครสมาชิก</Typography>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default index;