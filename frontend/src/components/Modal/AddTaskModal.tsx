import { Button, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { ChangeEvent, useState } from 'react';
import FormsInput from '../forms/FormsInput';
import TestDatePicker from '../Input/DatePicker';
import CustomTimePicker from '../Input/TimePicker';
import dayjs, { Dayjs } from 'dayjs';


const AddTaskModal = ({ openModal, setOpenModal, addTask, toDoIndex }: AddTaskModalProps) => {

    const [inputValue, setInputValue] = useState<InputValue>({
        title: "",
        time:"00:00",
    })

    console.log(inputValue)

    const handleTimeChange = (timePicked:Dayjs) => {
        console.log(timePicked.hour())
        const hours = timePicked.hour()
        const mins = timePicked.minute()
        const timeString = `${hours}:${mins}`
        const copyInputValue = inputValue;
        copyInputValue.time = timeString;
        setInputValue({ ...copyInputValue });
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const copyInputValue = inputValue;
        copyInputValue[name] = value;
        setInputValue({ ...copyInputValue });
    }


    const handleAddTask = () => {
        const newTask: Task = {
            title: inputValue.title,
            time: inputValue.time,
            status: false
        }
        addTask(toDoIndex, newTask)
        setInputValue({
            title: "",
            time: ""
        })
        setOpenModal(false)
    }

    return (
        <div>
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="absolute center-offset bg-white shadow-lg rounded-lg flex flex-col w-80">
                    <Typography id="modal-modal-title" variant="h6" component="h2" className='todolistTitle p-1 rounded-t-lg'>
                        เพิ่มรายการที่ต้องทำ
                    </Typography>
                    <div className='p-7 flex flex-col gap-4'>
                        <FormsInput label="สิ่งที่ต้องทำ" name="title" type="text" {...{ inputValue, handleInputChange }}></FormsInput>
                        <div className='flex gap-4'>
                            {/* <FormsInput label="วันที่" name="time" type="text" {...{ inputValue, handleInputChange }}></FormsInput> */}
                            {/* <FormsInput label="เวลา" name="time" type="text" {...{ inputValue, handleInputChange }}></FormsInput> */}
                            <CustomTimePicker handleTimeChange={handleTimeChange} />
                        </div>
                        <div className='flex gap-4'>
                            <Button className='bg-orange sm:w-32 w-full' onClick={() => setOpenModal(false)}>ยกเลิก</Button>
                            <Button className='bg-green sm:w-32 w-full text-white' onClick={handleAddTask}>บันทึก</Button>
                        </div>

                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default AddTaskModal;