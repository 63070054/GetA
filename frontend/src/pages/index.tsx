import ShowFilterSelected from "@/components/Filter/ShowFilterSelected";
import FilterModal from "@/components/Modal/FilterModal";
import { useState } from 'react';
import SearchInputWithFilter from '@/components/Input/SearchInputWithFilter';
import IconGetA from '@/components/IconGetA';
import IconContainer from './../components/Container/IconContainer';
import SmallContainer from "@/components/Container/SmallContainer";

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

  const [filterCourses, setFilterCourses] = useState<CourseType[]>(["SVV", "ITPM"])
  const [filterYears, setFilterYears] = useState<YearType[]>(["ปี 1"])
  const [searchInput, setSearchInput] = useState<string>("")
  const [openModal, setOpenModal] = useState<boolean>(false)


  return (
    <SmallContainer>
      <div className="flex flex-col gap-6 w-full">
        <SearchInputWithFilter {...{ filterCourses, filterYears, searchInput, setFilterCourses, setFilterYears, setSearchInput }} setOpenFilterModal={setOpenModal} />
        <ShowFilterSelected courses={filterCourses} years={filterYears} />
        <IconContainer>
          {publicFlder.map(folder => (
            <IconGetA {...folder} routeTo={folder.routeTo.replace(":folderId", folder.id)} key={folder.id} />
          ))}
        </IconContainer>
      </div>
      <FilterModal {...{ openModal, setOpenModal, filterCourses, setFilterCourses, filterYears, setFilterYears }} />
    </SmallContainer>
  )
}
