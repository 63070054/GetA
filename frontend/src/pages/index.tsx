import ShowFilterSelected from "@/components/Filter/ShowFilterSelected";
import IconGetA from "@/components/IconGetA";
import SearchInputWithFilter from "@/components/Input/SearchInputWithFilter";
import FilterModal from "@/components/Modal/FilterModal";
import { useState } from 'react';

export default function Home() {

  const publicFlder: IconGetAProps[] = [
    {
      id: "0",
      name: "SVV Week17(หลุดข้อสอบ)",
      routeTo: "/folder/:folderId",
      ownerName: "waveza2",
      ownerId: "waveza2",
      iconPath: "/icons/folderGetA.svg"
    },
    {
      id: "1",
      name: "SVV Week17(หลุดข้อสอบ)",
      routeTo: "/folder/:folderId",
      ownerName: "waveza2",
      ownerId: "waveza2",
      iconPath: "/icons/folderGetA.svg"
    },
    {
      id: "2",
      name: "SVV Week17(หลุดข้อสอบ)",
      routeTo: "/folder/:folderId",
      ownerName: "waveza2",
      ownerId: "waveza2",
      iconPath: "/icons/folderGetA.svg"
    },
    {
      id: "3",
      name: "SVV Week17(หลุดข้อสอบ)",
      routeTo: "/folder/:folderId",
      ownerName: "waveza2",
      ownerId: "waveza2",
      iconPath: "/icons/folderGetA.svg"
    },
    {
      id: "4",
      name: "SVV Week17(หลุดข้อสอบ)",
      routeTo: "/folder/:folderId",
      ownerName: "waveza2",
      ownerId: "waveza2",
      iconPath: "/icons/folderGetA.svg"
    },
    {
      id: "5",
      name: "SVV Week17(หลุดข้อสอบ)",
      routeTo: "/folder/:folderId",
      ownerName: "waveza2",
      ownerId: "waveza2",
      iconPath: "/icons/folderGetA.svg"
    },
    {
      id: "6",
      name: "SVV Week17(หลุดข้อสอบ)",
      routeTo: "/folder/:folderId",
      ownerName: "waveza2",
      ownerId: "waveza2",
      iconPath: "/icons/folderGetA.svg"
    },
    {
      id: "7",
      name: "SVV Week17(หลุดข้อสอบ)",
      routeTo: "/folder/:folderId",
      ownerName: "waveza2",
      ownerId: "waveza2",
      iconPath: "/icons/folderGetA.svg"
    },
    {
      id: "8",
      name: "SVV Week17(หลุดข้อสอบ)",
      routeTo: "/folder/:folderId",
      ownerName: "waveza2",
      ownerId: "waveza2",
      iconPath: "/icons/folderGetA.svg"
    },
    {
      id: "9",
      name: "SVV Week17(หลุดข้อสอบ)",
      routeTo: "/folder/:folderId",
      ownerName: "waveza2",
      ownerId: "waveza2",
      iconPath: "/icons/folderGetA.svg"
    },
  ]

  const [filterCourses, setFilterCourses] = useState<CourseType[]>(["SVV", "ITPM"])
  const [filterYears, setFilterYears] = useState<YearType[]>(["ปี 1"])
  const [searchInput, setSearchInput] = useState<string>("")
  const [openModal, setOpenModal] = useState<boolean>(false)


  return (
    <>
      <div className="flex flex-col gap-6 w-full">
        <SearchInputWithFilter {...{ filterCourses, filterYears, searchInput, setFilterCourses, setFilterYears, setSearchInput }} setOpenFilterModal={setOpenModal} />
        <ShowFilterSelected courses={filterCourses} years={filterYears} />
        <div className="grid grid-cols-5 gap-12">
          {publicFlder.map(folder => (
            <IconGetA {...folder} routeTo={folder.routeTo.replace(":folderId", folder.id)} />
          ))}
        </div>
      </div>
      <FilterModal {...{ openModal, setOpenModal, filterCourses, setFilterCourses, filterYears, setFilterYears }} />
    </>
  )
}
