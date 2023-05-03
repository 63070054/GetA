import Modal from '@mui/material/Modal';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { Typography } from '@mui/material';
import { ChangeEvent } from 'react';
import FormsInput from '../forms/FormsInput';
import { Button } from '@mui/material';


const CreateGuideLineModal = ({
  inputValue,
  handleInputChange,
  nameTitle,
  nameDescription,
  createGuideLine,
  openModal,
  setOpenModal
}: CreateGuideLineModalProps) => {


  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
    >
      <Box className="absolute center-offset bg-white shadow-lg rounded-lg md:w-auto w-11/12">
        <div className='relative py-2 bg-green flex flex-col items-center justify-center rounded-t-lg'>
          <Typography variant="h6" className="text-white tracking-wide">สร้างแนวข้อสอบ</Typography>
        </div>
        <div className="py-4 px-12 flex flex-col gap-4">
          <FormsInput label="ชื่อ" name={nameTitle} type="text" {...{ inputValue, handleInputChange }} />
          <FormsInput label="คำอธิบาย" name={nameDescription} type="text" {...{ inputValue, handleInputChange }} amountRows={3} />
          <Button className='bg-orange w-full' onClick={createGuideLine}>ยืนยันการสร้างแนวข้อสอบ</Button>
        </div>
      </Box >
    </Modal >
  );
};

export default CreateGuideLineModal;