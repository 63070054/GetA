import { useState } from 'react';
import { Typography } from '@mui/material';
import ShowFilterSelected from '@/components/Filter/ShowFilterSelected';
import IconGetA from '@/components/IconGetA';
import { useRouter } from 'next/router';
import IconContainer from '@/components/Container/IconContainer';
import SmallContainer from '@/components/Container/SmallContainer';

const Folder = () => {

  const router = useRouter()
  const { folderId } = router.query

  const [folderData, setFolderData] = useState<FolderIcon>({
    id: "1",
    name: "SVV Week17 (หลุดข้อสอบ)",
    description: "มาร์ค พุทโธหยวนบลูเบอร์รีไตรมาสหมายปอง แบรนด์เวิร์ลด์ตุ๋ย รองรับคลิปสปา เคลมเทวาซีอีโอ โค้ชแอ็คชั่นวิก เตี๊ยมคณาญาติโบว์ลิ่งโลชั่น เหมยเซ็กซี่ทอม ฮองเฮาเวิลด์นางแบบสคริปต์จังโก้ เอ๊าะยิวเวสต์อุปนายก ซีนีเพล็กซ์ก่อนหน้าอยุติธรรมเบิร์ด โฮลวีตแอลมอนด์รูบิกวอเตอร์ ซาดิสม์แฟรี ซูโม่โปรเจกเตอร์ เดชานุภาพ ไฮก",
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
    <SmallContainer>
      <div className='w-full flex flex-col gap-4'>
        <div className='flex flex-col px-6 py-8 gap-4 shadow-lg border-b-2 border-black'>
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
            <Typography variant='body2' className='text-gray-400'><span className='ml-8' />{folderData?.description}</Typography>
          </div>
        </div>
        <div className='w-full flex justify-center'>
          <IconContainer>
            {folderData?.files.map(file => (
              <>
                {folderId && typeof (folderId) == "string" && (
                  <IconGetA {...file} key={file.id} routeTo={file.routeTo.replace(":fileId", file.id).replace(":folderId", folderId)} />
                )}
              </>
            ))}
          </IconContainer>
        </div>
      </div>
    </SmallContainer>
  );
};

export default Folder;