import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import SmallContainer from '@/components/Container/SmallContainer';
import api from '@/plugins/axios/api';

const File = () => {


  const router = useRouter()
  const { folderId, fileId } = router.query
  const [fileData, setFileData] = useState<FileGetA>()

  useEffect(() => {
    const getFolderById = async () => {
      const response = await api.get(`/folderById/${folderId}/file/${fileId}`)
      const file = response?.data[0]
      const convertFile: FileGetA = {
        id: file.Id,
        name: file.Name,
        filePath: file.FilePath,
      }

      setFileData({ ...convertFile })


    }
    if (router.isReady) {
      getFolderById()
    }
  }, [router.isReady])


  return (
    <SmallContainer>
      {fileData && (
        <div className="w-full flex flex-col gap-4">
          <Typography variant='h4' className='font-bold'>{fileData.name}</Typography>
          <iframe src={fileData.filePath} className="w-full aspect-square" />
        </div>
      )}
    </SmallContainer>
  );
};

export default File;