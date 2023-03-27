import GuidelineCard from "@/components/Card/GuidelineCard";
import ShowFilterSelected from "@/components/Filter/ShowFilterSelected";
import SearchInputWithFilter from "@/components/Input/SearchInputWithFilter";
import FilterModal from "@/components/Modal/FilterModal";
import { useState } from 'react';

const index = () => {
    const [filterCourses, setFilterCourses] = useState<CourseType[]>(["ITPM"])
    const [filterYears, setFilterYears] = useState<YearType[]>(["ปี 1"])
    const [searchInput, setSearchInput] = useState<string>("")
    const [openModal, setOpenModal] = useState<boolean>(false)

    return (
        <div className="flex flex-col gap-6 w-full">
            <SearchInputWithFilter {...{ filterCourses, filterYears, searchInput, setFilterCourses, setFilterYears, setSearchInput }} setOpenFilterModal={setOpenModal} />
            <ShowFilterSelected courses={filterCourses} years={filterYears} />
            <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
                <GuidelineCard></GuidelineCard>
            </div>
            <FilterModal {...{ openModal, setOpenModal, filterCourses, setFilterCourses, filterYears, setFilterYears }} />
        </div>
    );
};

export default index;