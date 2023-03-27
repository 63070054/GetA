import React from 'react';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';

const File = () => {


  const router = useRouter()
  const { fileId } = router.query


  return (
    <div className="w-full flex flex-col gap-4">
      <Typography variant='h4' className='font-bold'>ชื่อ File คร้าบ</Typography>
      <iframe src="/filePDF/Cloud-Mid.pdf" className="w-full aspect-square" />
    </div>
  );
};

export default File;