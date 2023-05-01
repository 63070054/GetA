import ShowFilterSelected from "@/components/Filter/ShowFilterSelected";
import FilterModal from "@/components/Modal/FilterModal";
import { ChangeEvent, useState } from 'react';
import SearchInputWithFilter from '@/components/Input/SearchInputWithFilter';
import IconGetA from '@/components/IconGetA';
import { Button, IconButton, Typography } from "@mui/material";
import SmallContainer from "@/components/Container/SmallContainer";
import IconContainer from "@/components/Container/IconContainer";
import GuidelineCard from "@/components/Card/GuidelineCard";
import GuideLineContainer from "@/components/Container/GuideLineContainer";
import AddIcon from '@mui/icons-material/Add';
import CreateFolderModal from "@/components/Modal/CreateFolderModal";

export default function Home() {

  const userInfo: User = {
    id: 0,
    name: "ณัฐพงษ์ ปทุมสูตร",
    year: "ปี 1",
    program: "IT",
    subjectArea: "Software Engineer",
    myFolder: [
      {
        id: 0,
        name: "SVV Week17(หลุดข้อสอบ)",
        routeTo: "/folder/:folderId",
        ownerName: "waveza2",
        ownerId: 1,
        iconPath: "/icons/folderGetA.svg"
      },
      {
        id: 1,
        name: "SVV Week17(หลุดข้อสอบ)",
        routeTo: "/folder/:folderId",
        ownerName: "waveza2",
        ownerId: 2,
        iconPath: "/icons/folderGetA.svg"
      },
      {
        id: 2,
        name: "SVV Week17(หลุดข้อสอบ)",
        routeTo: "/folder/:folderId",
        ownerName: "waveza2",
        ownerId: 3,
        iconPath: "/icons/folderGetA.svg"
      },
      {
        id: 3,
        name: "SVV Week17(หลุดข้อสอบ)",
        routeTo: "/folder/:folderId",
        ownerName: "waveza2",
        ownerId: 4,
        iconPath: "/icons/folderGetA.svg"
      },
      {
        id: 4,
        name: "SVV Week17(หลุดข้อสอบ)",
        routeTo: "/folder/:folderId",
        ownerName: "waveza2",
        ownerId: 5,
        iconPath: "/icons/folderGetA.svg"
      },
      {
        id: 5,
        name: "SVV Week17(หลุดข้อสอบ)",
        routeTo: "/folder/:folderId",
        ownerName: "waveza2",
        ownerId: 6,
        iconPath: "/icons/folderGetA.svg"
      },
      {
        id: 6,
        name: "SVV Week17(หลุดข้อสอบ)",
        routeTo: "/folder/:folderId",
        ownerName: "waveza2",
        ownerId: 7,
        iconPath: "/icons/folderGetA.svg"
      },
      {
        id: 7,
        name: "SVV Week17(หลุดข้อสอบ)",
        routeTo: "/folder/:folderId",
        ownerName: "waveza2",
        ownerId: 8,
        iconPath: "/icons/folderGetA.svg"
      },
      {
        id: 8,
        name: "SVV Week17(หลุดข้อสอบ)",
        routeTo: "/folder/:folderId",
        ownerName: "waveza2",
        ownerId: 9,
        iconPath: "/icons/folderGetA.svg"
      },
      {
        id: 9,
        name: "SVV Week17(หลุดข้อสอบ)",
        routeTo: "/folder/:folderId",
        ownerName: "waveza2",
        ownerId: 10,
        iconPath: "/icons/folderGetA.svg"
      },
    ],
    myGuideLine: [
      {
        id: 0,
        title: "ITPM ตัวร้าย",
        description: "อยากโดนเซ็ตหย่อค่ะ <br /> อิอิ",
        files: [
          {
            id: 0,
            name: "SVV Week17(หลุดข้อสอบ)",
            routeTo: "/folder/:folderId/file/:fileId",
            iconPath: "/icons/fileGetA.svg"
          },
          {
            id: 1,
            name: "SVV Week17(หลุดข้อสอบ)",
            routeTo: "/folder/:folderId/file/:fileId",
            iconPath: "/icons/fileGetA.svg"
          },
          {
            id: 2,
            name: "SVV Week17(หลุดข้อสอบ)",
            routeTo: "/folder/:folderId/file/:fileId",
            iconPath: "/icons/fileGetA.svg"
          },
        ],
        folderId: 12
      },
      {
        id: 0,
        title: "ITPM ตัวร้าย",
        description: "อยากโดนเซ็ตหย่อค่ะ <br /> อิอิ <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />",
        files: [
          {
            id: 0,
            name: "SVV Week17(หลุดข้อสอบ)",
            routeTo: "/folder/:folderId/file/:fileId",
            iconPath: "/icons/fileGetA.svg"
          },
          {
            id: 1,
            name: "SVV Week17(หลุดข้อสอบ)",
            routeTo: "/folder/:folderId/file/:fileId",
            iconPath: "/icons/fileGetA.svg"
          },
          {
            id: 2,
            name: "SVV Week17(หลุดข้อสอบ)",
            routeTo: "/folder/:folderId/file/:fileId",
            iconPath: "/icons/fileGetA.svg"
          },
        ],
        folderId: 12
      },
    ]
  }

  const [inputValueFolder, setInputValueFolder] = useState<InputValue>({
    name: "",
    description: ""
  });
  const [filterCourses, setFilterCourses] = useState<CourseType[]>([])
  const [filterYears, setFilterYears] = useState<YearType[]>([])
  const [openModal, setOpenModal] = useState<boolean>(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const copyInputValue = inputValueFolder;
    copyInputValue[name] = value;
    setInputValueFolder({ ...copyInputValue });
  }

  const handleOpenModal = () => {
    setOpenModal(true)
    setFilterCourses([])
    setFilterYears([])
  }

  const createFolder = () => {
    const newFolder: Folder = {
      name: inputValueFolder.name,
      description: inputValueFolder.description,
      ownerId: 2,
      course: filterCourses as CourseType[],
      year: filterYears as YearType[],
    }

    console.log(newFolder)

  }

  return (
    <SmallContainer>
      <div className="relative h-48">
        <img src="userCover.png " className="h-full w-full absolute z-0 shadow-lg" ></img>
        <div className="relative flex h-full">
          <div className="aspect-square">
            <img src="profile.png " className="w-4/6 p-2 relative z-10 top-1/2 centerY " ></img></div>
          <div className="flex flex-col self-center">
            <Typography variant="h4" className="self-start relative z-10" color="#000000" gutterBottom>{userInfo.name}</Typography>
            <Typography variant="h6" className="self-start relative z-10" color="#000000" gutterBottom>ณัฐพงษ์ ปทุมสูตร</Typography>
          </div>
        </div>
      </div>
      <div className="flex gap-4 items-center mt-6">
        <Typography variant="h6" className="m-0" color="#000000" gutterBottom>โฟลเดอร์ของฉัน</Typography>
        <IconButton className="bg-orange" onClick={handleOpenModal}>
          <AddIcon />
        </IconButton>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <IconContainer>
          {userInfo.myFolder.map(folder => (
            <IconGetA {...folder} routeTo={folder.routeTo.replace(":folderId", `${folder.id}`)} key={folder.id} />
          ))}
        </IconContainer>
        <div className="flex gap-4 items-center mt-6">
          <Typography variant="h6" className="m-0" color="#000000" gutterBottom>แนวข้อสอบของฉัน</Typography>
          <IconButton className="bg-orange">
            <AddIcon />
          </IconButton>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <GuideLineContainer>
            {userInfo.myGuideLine.map(guideLine => (
              <GuidelineCard key={guideLine.id} {...guideLine} />
            ))}
          </GuideLineContainer>
        </div>
      </div>
      <CreateFolderModal nameName="name" nameDescription="description" inputValue={inputValueFolder} {...{ openModal, setOpenModal, filterCourses, setFilterCourses, filterYears, setFilterYears, handleInputChange, createFolder }} />
    </SmallContainer>
  )
}
