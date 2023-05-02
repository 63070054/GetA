import { Button, Checkbox, FormControlLabel, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { ChangeEvent, useState } from 'react';
import FormsInput from '../forms/FormsInput';
import CustomTimePicker from '../Input/TimePicker';
import dayjs, { Dayjs } from 'dayjs';
import CustomDatePicker from '../Input/DatePicker';
import { useUser } from '@/utils/useUser';

const AddTodoModal = ({ addToDo, setOpenModal, openModal }: AddToDoModalProps) => {
    const [dateValue, setDateValue] = useState<string>("1 เมษายน 2566")
    const monthsArr: string[] = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']

    const { id: userId } = useUser()

    const handleAddToDo = () => {
        if (userId) {
            const task: Task[] = []
            const newToDo: TodolistCard = {
                date: dateValue,
                subTasks: task,
                ownerId: userId
            }
            addToDo(newToDo);
            setOpenModal(false);
        }
    }
    const handleDateChange = (date: Dayjs) => {
        console.log(date.date())
        const month = monthsArr[date.month()]
        const day = date.date()
        const year = date.year() + 543
        const pickedDate = `${day} ${month} ${year}`
        setDateValue(pickedDate);

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
                        เพิ่มรายการวันที่ใหม่
                    </Typography>
                    <div className='p-7 flex flex-col gap-4'>
                        <CustomDatePicker handleDateChange={handleDateChange}></CustomDatePicker>

                        <div className='flex gap-4'>
                            <Button className='bg-orange sm:w-32 w-full' onClick={() => setOpenModal(false)}>ยกเลิก</Button>
                            <Button className='bg-green sm:w-32 w-full text-white' onClick={handleAddToDo}>บันทึก</Button>
                        </div>

                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default AddTodoModal;