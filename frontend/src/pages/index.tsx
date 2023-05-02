import ShowFilterSelected from "@/components/Filter/ShowFilterSelected";
import FilterModal from "@/components/Modal/FilterModal";
import { useState } from 'react';
import SearchInputWithFilter from '@/components/Input/SearchInputWithFilter';
import IconGetA from '@/components/IconGetA';
import IconContainer from './../components/Container/IconContainer';
import SmallContainer from "@/components/Container/SmallContainer";
import { useEffect } from 'react';
import api from "@/plugins/axios/api";

export default function Home() {

  useEffect(() => {
    const getFolders = async () => {
      const response = await api.get("/folders")
      const publicFolders = response.data.map((folder: Folder) => {
        return {
          ...folder,
          routeTo: "/folder/:folderId",
          iconPath: "/icons/folderGetA.svg"
        }
      })

      setPublicFolder([...publicFolders])

    }
    getFolders()
  }, [])

  const [publicFolder, setPublicFolder] = useState<IconGetAProps[]>([])

  const [filterCourses, setFilterCourses] = useState<CourseType[]>([])
  const [filterYears, setFilterYears] = useState<YearType[]>([])
  const [searchInput, setSearchInput] = useState<string>("")
  const convertSearchInput = searchInput.toLowerCase().trim()
  const [openModal, setOpenModal] = useState<boolean>(false)

  const filterPublicFolder = publicFolder.filter(folder => {
    if (filterCourses.length === 0 && filterYears.length === 0 && !convertSearchInput) {
      return true;
    }

    const folderValues = [
      folder.name?.toLowerCase() || "",
      folder.description?.toLowerCase() || "",
      folder.ownerName?.toLowerCase() || "",
    ];

    const includeCourse = filterCourses.some(filterCourse => folder.courses?.includes(filterCourse));
    const includeYear = filterYears.some(filterYear => folder.years?.includes(filterYear));
    const includeText = convertSearchInput != "" ? folderValues.some(folderValue => folderValue.includes(convertSearchInput)) : false;

    return includeCourse || includeYear || includeText;
  });

  return (
    <SmallContainer>
      <div className="flex flex-col gap-6 w-full">
        <SearchInputWithFilter {...{ filterCourses, filterYears, searchInput, setFilterCourses, setFilterYears, setSearchInput }} setOpenFilterModal={setOpenModal} />
        <ShowFilterSelected courses={filterCourses} years={filterYears} />
        <IconContainer>
          {filterPublicFolder.map(folder => (
            <IconGetA {...folder} routeTo={folder.routeTo.replace(":folderId", `${folder.id}`)} key={folder.id} />
          ))}
        </IconContainer>
      </div>
      <FilterModal {...{ openModal, setOpenModal, filterCourses, setFilterCourses, filterYears, setFilterYears }} />
    </SmallContainer>
  )
}
