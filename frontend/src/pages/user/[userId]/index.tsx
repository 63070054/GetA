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

  const router = useRouter()
  const { userId } = router.query

  const [userInfo, setUserInfo] = useState<User>()

  useEffect(() => {

    const getUserById = async () => {
      const response = await api.get("/user/" + userId)

      const copyUserInfo: User = response.data[0]
      copyUserInfo.myFolder = copyUserInfo.myFolder.map(folder => {
        return {
          id: folder.id,
          name: folder.name,
          routeTo: "/folder/:folderId",
          iconPath: "/icons/folderGetA.svg"
        }
      })

      setUserInfo({ ...copyUserInfo })
    }

    if (router.isReady) {
      getUserById()
    }


  }, [router.isReady])


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

      </div>
      <div className="flex flex-col gap-4 w-full">
        <IconContainer>
          {userInfo?.myFolder?.map(folder => (
            <IconGetA {...folder} ownerId={userInfo?.id} ownerName={userInfo?.name} routeTo={folder.routeTo.replace(":folderId", `${folder.id}`)} key={folder.id} />
          ))}
        </IconContainer>
        <div className="flex gap-4 items-center mt-6">
          <Typography variant="h6" className="m-0" color="#000000" gutterBottom>แนวข้อสอบของฉัน</Typography>

        </div>
        <div className="flex flex-col gap-4 w-full">
          <GuideLineContainer>
            {userInfo?.myGuideLine?.map(guideLine => (
              <GuidelineCard key={guideLine.id} {...guideLine} />
            ))}
          </GuideLineContainer>
        </div>
      </div>
    </MediumComtainer>
  )
}
