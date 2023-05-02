import { ChangeEvent, useState, useEffect } from 'react';
import IconGetA from '@/components/IconGetA';
import { Button, Chip, IconButton, Typography } from "@mui/material";
import IconContainer from "@/components/Container/IconContainer";
import GuidelineCard from "@/components/Card/GuidelineCard";
import GuideLineContainer from "@/components/Container/GuideLineContainer";
import AddIcon from '@mui/icons-material/Add';
import CreateFolderModal from "@/components/Modal/CreateFolderModal";
import api from "@/plugins/axios/api";
import MediumComtainer from "@/components/Container/MediumContainer";
import GetAToast from "@/components/Alert/GetAToast";
import { useUser } from "@/utils/useUser";
import { useRouter } from 'next/router';

export default function MyProfile() {

  const [inputValueFolder, setInputValueFolder] = useState<InputValue>({
    name: "",
    description: ""
  });
  const [filterCourses, setFilterCourses] = useState<CourseType[]>([])
  const [filterYears, setFilterYears] = useState<YearType[]>([])
  const [openModal, setOpenModal] = useState<boolean>(false)
  const { id: userId, name } = useUser()
  const [userInfo, setUserInfo] = useState<User>()
  const router = useRouter()

  useEffect(() => {


    const getUserById = async () => {
      try {
        const response = await api.get("/user/" + userId)

        const copyUserInfo: User = response.data[0]
        console.log(response.data)
        copyUserInfo.myFolder = copyUserInfo.myFolder.map(folder => {
          return {
            id: folder.id,
            name: folder.name,
            routeTo: "/folder/:folderId",
            iconPath: "/icons/folderGetA.svg"
          }
        })

        setUserInfo({ ...copyUserInfo })
      } catch (err) {
        console.log(err)
      }
    }

    if (router.isReady) {
      getUserById()
    }


  }, [router.isReady])


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

  const createFolder = async () => {

    if (userId) {
      const newFolder: Folder = {
        name: inputValueFolder.name,
        description: inputValueFolder.description,
        ownerId: userId,
        ownerName: name,
        courses: filterCourses as CourseType[],
        years: filterYears as YearType[],
      }

      try {
        const response = await api.post("/folder", newFolder)
        const folderId = response.data
        await resetValue()
        GetAToast.fire({
          icon: "success",
          title: "สร้างโฟลเดอร์สำเร็จ",
        });

        if (userInfo) {
          const copyUserInfo: User = userInfo;
          const folderFromDB: IconGetAProps = {
            id: folderId,
            name: newFolder.name,
            routeTo: "/folder/:folderId",
            iconPath: "/icons/folderGetA.svg"
          }
          copyUserInfo?.myFolder.push(folderFromDB)

          setUserInfo({ ...copyUserInfo })
        }

      } catch (err) {
        console.log(err)
      }
    }

  }

  const resetValue = async () => {
    setInputValueFolder({
      name: "",
      description: ""
    })
    setOpenModal(false)
  }

  return (
    <MediumComtainer>
      <div className="relative h-48">
        <img src="/userCover.png " className="h-full w-full absolute z-0 shadow-lg" />
        <div className="relative flex h-full">
          {/* <div className="aspect-square">
            <img src="/profile.png " className="w-4/6 p-2 relative z-10 top-1/2 centerY " />
          </div> */}
          <div className="flex flex-col self-center gap-4 p-4">
            <div className="flex gap-6 self- items-center">
              <div className="w-24 h-24">
                <img src="/profile.png " className="w-full p-2 relative z-10 top-1/2 centerY " />
              </div>
              <div className='flex flex-col gap'>
                <Typography variant="h4" className="relative z-10" color="#000000" gutterBottom>{userInfo?.name}</Typography>
                <div className='flex gap-2 self-start'>
                  {userInfo && (
                    <>
                      <Chip label={userInfo?.program} variant="outlined" />
                      <Chip label={userInfo?.subjectArea} variant="outlined" />
                      <Chip label={userInfo?.year} variant="outlined" />
                    </>
                  )}
                </div>
              </div>
            </div>
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
          {userInfo?.myFolder?.map(folder => (
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
            {userInfo?.myGuideLine?.map(guideLine => (
              <GuidelineCard key={guideLine.id} {...guideLine} />
            ))}
          </GuideLineContainer>
        </div>
      </div>
      <CreateFolderModal nameName="name" nameDescription="description" inputValue={inputValueFolder} {...{ openModal, setOpenModal, filterCourses, setFilterCourses, filterYears, setFilterYears, handleInputChange, createFolder }} />
    </MediumComtainer>
  )
}
