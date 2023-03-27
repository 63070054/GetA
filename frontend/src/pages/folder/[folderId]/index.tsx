import { useState } from 'react';
import { Typography } from '@mui/material';
import ShowFilterSelected from '@/components/Filter/ShowFilterSelected';
import IconGetA from '@/components/IconGetA';
import { useRouter } from 'next/router';

const Folder = () => {

  const router = useRouter()
  const { folderId } = router.query

  const [folderData, setFolderData] = useState<FolderIcon>({
    id: "1",
    name: "SVV Week17 (หลุดข้อสอบ)",
    description: "testsetestestse",
    courses: ["Gen B", "HID"],
    yeras: ["ปี 1", "ปี 2"],
    ownerName: "waveza2",
    ownerId: "1",
    files: [
      {
        id: "0",
        name: "SVV Week17(หลุดข้อสอบ)",
        routeTo: "/folder/:folderId/file/:fileId",
        iconPath: "/icons/fileGetA.svg"
      },
      {
        id: "1",
        name: "SVV Week17(หลุดข้อสอบ)",
        routeTo: "/folder/:folderId/file/:fileId",
        iconPath: "/icons/fileGetA.svg"
      },
      {
        id: "2",
        name: "SVV Week17(หลุดข้อสอบ)",
        routeTo: "/folder/:folderId/file/:fileId",
        iconPath: "/icons/fileGetA.svg"
      },
      {
        id: "3",
        name: "SVV Week17(หลุดข้อสอบ)",
        routeTo: "/folder/:folderId/file/:fileId",
        iconPath: "/icons/fileGetA.svg"
      },
      {
        id: "4",
        name: "SVV Week17(หลุดข้อสอบ)",
        routeTo: "/folder/:folderId/file/:fileId",
        iconPath: "/icons/fileGetA.svg"
      },
      {
        id: "5",
        name: "SVV Week17(หลุดข้อสอบ)",
        routeTo: "/folder/:folderId/file/:fileId",
        iconPath: "/icons/fileGetA.svg"
      },
      {
        id: "6",
        name: "SVV Week17(หลุดข้อสอบ)",
        routeTo: "/folder/:folderId/file/:fileId",
        iconPath: "/icons/fileGetA.svg"
      },
      {
        id: "7",
        name: "SVV Week17(หลุดข้อสอบ)",
        routeTo: "/folder/:folderId/file/:fileId",
        iconPath: "/icons/fileGetA.svg"
      },
      {
        id: "8",
        name: "SVV Week17(หลุดข้อสอบ)",
        routeTo: "/folder/:folderId/file/:fileId",
        iconPath: "/icons/fileGetA.svg"
      },
      {
        id: "9",
        name: "SVV Week17(หลุดข้อสอบ)",
        routeTo: "/folder/:folderId/file/:fileId",
        iconPath: "/icons/fileGetA.svg"
      },
    ]
  })

  return (
    <div className='w-full flex flex-col gap-4'>
      <div className='flex gap-2 w-full flex-col'>
        <div className='flex flex-col gap-2'>
          <div>
            <Typography variant='h4' className='font-bold'>{folderData.name}</Typography>
            <Typography variant='primary'>{folderData.ownerName}</Typography>
          </div>
          <ShowFilterSelected courses={folderData.courses} years={folderData.yeras} />
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <Typography variant='h5'>คำอธิบาย</Typography>
        <Typography variant='body2'>{folderData?.description}</Typography>
      </div>
      <div className='grid grid-cols-5 gap-12'>
        {folderData?.files.map(file => (
          <>
            {folderId && typeof (folderId) == "string" && (
              <IconGetA {...file} key={file.id} routeTo={file.routeTo.replace(":fileId", file.id).replace(":folderId", folderId)} />
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default Folder;