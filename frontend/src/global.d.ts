interface OrangeButton {
  ButtonName: string
}
interface TodolistCard {
  date: string;
  tasks: Task[];
}

interface Task {
  title: string;
  status: boolean;
  time?: string;
}

interface ChildrenProps {
  children: ReactNode;
}

interface NavBarRouter {
  name: string;
  routerPath: string;
  icon?: SvgIconComponent;
}

interface IconGetAProps {
  id: string;
  name: string;
  routeTo: string;
  ownerName?: string;
  ownerId?: string;
  iconPath: string;
  course?: CourseType;
  year?: YearType;
}

interface ShowFilterProps {
  courses: CourseType[];
  years: YearType[];
}

interface FilterBoxProps {
  backgroundColor: string;
  textColor: string;
  name: CourseType | YearType;
}

type CourseType = "SVV" | "ITPM" | "SOP" | "HID" | "OOP" | "Gen B";

type YearType = "ปี 1" | "ปี 2" | "ปี 3" | "ปี 4";

interface SearchInputWithFilterProps {
  searchInput: string;
  setSearchInput: Dispatch<SetStateAction<S>>;
  setOpenFilterModal: Dispatch<SetStateAction<S>>;
}

interface FilterModalProps {
  openModal: boolean;
  filterCourses: CourseType[];
  filterYears: YearType[];
  setOpenModal: Dispatch<SetStateAction<S>>;
  setFilterCourses: Dispatch<SetStateAction<S>>;
  setFilterYears: Dispatch<SetStateAction<S>>;

}