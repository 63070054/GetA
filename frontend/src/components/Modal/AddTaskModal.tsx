import { Button, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { ChangeEvent, useState } from 'react';
import FormsInput from '../forms/FormsInput';

const AddTaskModal = ({ openModal, onStatusChange }: AddTaskModalProps) => {
    const [inputValue, setInputValue] = useState<InputValue>({ taskName: "" })

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const copyInputValue = inputValue;
        copyInputValue[name] = value;
        setInputValue(copyInputValue);
    }

    return (
        <div>
            <Modal
                open={openModal}
                onClose={() => onStatusChange(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="absolute center-offset bg-white shadow-lg rounded-lg flex flex-col w-80">
                    <Typography id="modal-modal-title" variant="h6" component="h2" className='todolistTitle p-1 rounded-t-lg'>
                        เพิ่มรายการที่ต้องทำ
                    </Typography>
                    <div className='p-7 flex flex-col gap-4'>
                        <FormsInput label="สิ่งที่ต้องทำ" name="taskName" type="text" {...{ inputValue, handleInputChange }}></FormsInput>
                        <div className='flex gap-4'>
                            <FormsInput label="วันที่" name="taskName" type="text" {...{ inputValue, handleInputChange }}></FormsInput>
                            <FormsInput label="เวลา" name="taskName" type="text" {...{ inputValue, handleInputChange }}></FormsInput>
                        </div>
                        <div className='flex gap-4'>
                            <Button className='bg-orange sm:w-32 w-full' onClick={() => onStatusChange(false)}>ยกเลิก</Button>
                            <Button className='bg-green sm:w-32 w-full text-white' onClick={() => onStatusChange(false)}>บันทึก</Button>
                        </div>
                        
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default AddTaskModal;