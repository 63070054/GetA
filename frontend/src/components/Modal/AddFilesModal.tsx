import { Button, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import PDFUploader from '../Input/PDFuploader';

const AddFilesModal = ({ openModal, setOpenModal, handleDrop, createFiles, fileSelected, handleUnselectFile }: AddFilesModalProps) => {

  const maxLengthText = 30;

  return (
    <div>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute center-offset bg-white shadow-lg rounded-lg md:w-7/12 w-11/12 overflow-auto" style={{ maxHeight: "75vh" }}>
          <div className='relative py-2 bg-green flex flex-col items-center justify-center rounded-t-lg'>
            <Typography variant="h6" className="text-white tracking-wide">สร้างไฟล์</Typography>
          </div>
          <div className="py-4 px-12 flex flex-col gap-4">
            <PDFUploader {...{ handleDrop }} />
            <div className="flex flex-col gap-2">
              {fileSelected.map((file, index) => {
                let showName = file.name

                if (file.name?.length > maxLengthText) {
                  showName = file.name.slice(0, maxLengthText + 1) + "..."
                }
                return (
                  <div
                    className="h-8 border border border-dashed border-2 border-black px-8 py-4 flex items-center gap-4 justify-between"
                    key={index}
                  >
                    <Typography variant="primary">{showName}</Typography>
                    <Button key={index} variant='contained' className="text-white bg-red-500 hover:bg-red-700" onClick={() => handleUnselectFile(file.name)}>DEL</Button>
                  </div>
                )
              })}
            </div>
            <Button className='bg-orange w-full' onClick={createFiles}>ยืนยันการสร้างไฟล์</Button>
          </div>
        </Box >
      </Modal>
    </div>
  );
};

export default AddFilesModal;