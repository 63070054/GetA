import ShowFilterSelected from "@/components/Filter/ShowFilterSelected";
import FilterModal from "@/components/Modal/FilterModal";
import { useState } from 'react';
import SearchInputWithFilter from '@/components/Input/SearchInputWithFilter';
import IconGetA from '@/components/IconGetA';
import { Typography } from "@mui/material";

export default function Home() {

  const publicFlder: IconGetAProps[] = [
    {
      id: "0",
      name: "SVV Week17(หลุดข้อสอบ)",
      routeTo: "/folder/:folderId",
      ownerName: "waveza2",
      ownerId: "1",
      iconPath: "/icons/folderGetA.svg"
    },
    {
      id: "1",
      name: "SVV Week17(หลุดข้อสอบ)",
      routeTo: "/folder/:folderId",
      ownerName: "waveza2",
      ownerId: "2",
      iconPath: "/icons/folderGetA.svg"
    },
    {
      id: "2",
      name: "SVV Week17(หลุดข้อสอบ)",
      routeTo: "/folder/:folderId",
      ownerName: "waveza2",
      ownerId: "3",
      iconPath: "/icons/folderGetA.svg"
    },
    {
      id: "3",
      name: "SVV Week17(หลุดข้อสอบ)",
      routeTo: "/folder/:folderId",
      ownerName: "waveza2",
      ownerId: "4",
      iconPath: "/icons/folderGetA.svg"
    },
    {
      id: "4",
      name: "SVV Week17(หลุดข้อสอบ)",
      routeTo: "/folder/:folderId",
      ownerName: "waveza2",
      ownerId: "5",
      iconPath: "/icons/folderGetA.svg"
    },
    {
      id: "5",
      name: "SVV Week17(หลุดข้อสอบ)",
      routeTo: "/folder/:folderId",
      ownerName: "waveza2",
      ownerId: "6",
      iconPath: "/icons/folderGetA.svg"
    },
    {
      id: "6",
      name: "SVV Week17(หลุดข้อสอบ)",
      routeTo: "/folder/:folderId",
      ownerName: "waveza2",
      ownerId: "7",
      iconPath: "/icons/folderGetA.svg"
    },
    {
      id: "7",
      name: "SVV Week17(หลุดข้อสอบ)",
      routeTo: "/folder/:folderId",
      ownerName: "waveza2",
      ownerId: "8",
      iconPath: "/icons/folderGetA.svg"
    },
    {
      id: "8",
      name: "SVV Week17(หลุดข้อสอบ)",
      routeTo: "/folder/:folderId",
      ownerName: "waveza2",
      ownerId: "9",
      iconPath: "/icons/folderGetA.svg"
    },
    {
      id: "9",
      name: "SVV Week17(หลุดข้อสอบ)",
      routeTo: "/folder/:folderId",
      ownerName: "waveza2",
      ownerId: "10",
      iconPath: "/icons/folderGetA.svg"
    },
  ]

  return (
    <>
      <div className="relative h-48">
        <img src="userCover.png " className="h-full w-full absolute z-0 shadow-lg" ></img>
        <div className="relative flex h-full">
        <img src="profile.png " className="aspect-square p-2 relative z-10 top-1/2 tranfromTranslateY " ></img>
        <Typography variant="h6" className="self-start relative z-10" color="#000000" gutterBottom>โฟลเดอร์ของฉัน</Typography>
        </div>
      </div>
      <Typography variant="h6" className="self-start mt-6" color="#000000" gutterBottom>โฟลเดอร์ของฉัน</Typography>
      <div className="flex flex-col gap-6 w-full">
        <div className="grid grid-cols-5 gap-12">
          {publicFlder.map(folder => (
            <IconGetA {...folder} routeTo={folder.routeTo.replace(":folderId", folder.id)} key={folder.id} />
          ))}
        </div>
        <Typography variant="h6" className="self-start mt-6" color="#000000" gutterBottom>แนวข้อสอบของฉัน</Typography>
        <div className="flex flex-col gap-6 w-full">
          <Typography variant="h1" className="self-start" color="#000000" gutterBottom>เอาแนวข้อสอบมาใส่เองเลยไอ้ควาย</Typography>
        </div>
      </div>
    </>
  )
}
