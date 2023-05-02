import { Button, Checkbox, FormControlLabel, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { ChangeEvent, useState } from 'react';
import FormsInput from '../forms/FormsInput';
import TestDatePicker from '../Input/DatePicker';
import CustomTimePicker from '../Input/TimePicker';
import dayjs, { Dayjs } from 'dayjs';


const AddTaskModal = ({ openModal, setOpenModal, addTask, toDoIndex, taskId }: AddTaskModalProps) => {

    const [inputValue, setInputValue] = useState<InputValue>({
        title: "",
        time: "00:00",
    })
    const [timeInput, setTimeInput] = useState<boolean>(true)

    const handleTimeChange = (timePicked: Dayjs) => {
        const hours = timePicked.hour();
        const mins = timePicked.minute();
        const minsString = mins.toString().padStart(2, '0'); // add leading zero if necessary
        const hourssString = hours.toString().padStart(2, '0'); // add leading zero if necessary
        const timeString = `${hourssString}:${minsString}`;
        const copyInputValue = { ...inputValue };
        copyInputValue.time = timeString;
        setInputValue(copyInputValue);
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const copyInputValue = inputValue;
        copyInputValue[name] = value;
        setInputValue({ ...copyInputValue });
    }

    const handleAddTask = () => {
        if (inputValue.title && taskId) {
            if (!timeInput) {
                const copyInputValue = inputValue;
                copyInputValue.time = "";
                setInputValue({ ...copyInputValue });
            }
            const newTask: Task = {
                title: inputValue.title,
                time: inputValue.time,
                status: false,
                taskId: taskId
            }
            addTask(toDoIndex, newTask)
            setInputValue({
                title: "",
                time: "00:00"
            })
            setTimeInput(true)
            setOpenModal(false)
        }
        else {
        }
    }

    return (
        <div>
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="absolute center-offset bg-white shadow-lg rounded-lg flex flex-col md:w-auto w-11/12">
                    <Typography id="modal-modal-title" variant="h6" component="h2" className='todolistTitle p-1 rounded-t-lg'>
                        เพิ่มรายการที่ต้องทำ
                    </Typography>
                    <div className='p-7 flex flex-col gap-4'>
                        <FormsInput label="สิ่งที่ต้องทำ" name="title" type="text" {...{ inputValue, handleInputChange }}></FormsInput>
                        <FormControlLabel control={<Checkbox checked={timeInput} onChange={(e) => setTimeInput(e.target.checked)} />} label={"ระบุเวลา"} />
                        {timeInput ? (<div className='flex gap-4'>
                            <CustomTimePicker handleTimeChange={handleTimeChange} />
                        </div>) : null}

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