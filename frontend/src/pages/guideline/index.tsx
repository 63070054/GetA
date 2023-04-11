import GuidelineCard from "@/components/Card/GuidelineCard";
import GuideLineContainer from "@/components/Container/GuideLineContainer";
import IconContainer from "@/components/Container/IconContainer";
import MediumComtainer from "@/components/Container/MediumContainer";
import ShowFilterSelected from "@/components/Filter/ShowFilterSelected";
import SearchInputWithFilter from "@/components/Input/SearchInputWithFilter";
import FilterModal from "@/components/Modal/FilterModal";
import { useState } from 'react';

const index = () => {
    const [filterCourses, setFilterCourses] = useState<CourseType[]>(["ITPM"])
    const [filterYears, setFilterYears] = useState<YearType[]>(["ปี 1"])
    const [searchInput, setSearchInput] = useState<string>("")
    const [openModal, setOpenModal] = useState<boolean>(false)

    const [guideLines, setGuideLines] = useState<GuideLineCard[]>([
        {
            id: "0",
            title: "ITPM ตัวร้าย",
            description: "อยากโดนเซ็ตหย่อค่ะ <br /> อิอิ",
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
            ],
            folderId: "12"
        },
        {
            id: "0",
            title: "ITPM ตัวร้าย",
            description: "อยากโดนเซ็ตหย่อค่ะ <br /> อิอิ <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />",
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
            ],
            folderId: "12"
        },
    ])

    return (
        <MediumComtainer>
            <div className="flex flex-col gap-6 w-full">
                <SearchInputWithFilter {...{ filterCourses, filterYears, searchInput, setFilterCourses, setFilterYears, setSearchInput }} setOpenFilterModal={setOpenModal} />
                <ShowFilterSelected courses={filterCourses} years={filterYears} />
                <GuideLineContainer>
                    {guideLines.map(guideLine => (
                        <GuidelineCard key={guideLine.id} {...guideLine} />
                    ))}
                </GuideLineContainer>
            </div>
            <FilterModal {...{ openModal, setOpenModal, filterCourses, setFilterCourses, filterYears, setFilterYears }} />
        </MediumComtainer>
    );
};

export default index;