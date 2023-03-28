interface OrangeButton {
  ButtonName: string
}
interface TodolistCard {
  date: string;
  tasks: Task[];
}

interface FormsInput {
  label: string;
  name: string;
  type: HTMLInputTypeAttribute;
  inputValue: InputValue;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface InputValue {
  [key: string]: string;
}
interface SelectInput {
  label: string;
  selectData: selectValue[];
}

interface selectValue {
  id: string;
  name: string;
}

interface CheckBox {
  label: string;
  status: boolean;
}
interface TodolistCard {
  id?: string;
  date: string;
  tasks: Task[];

}

interface Task {
  id?: number;
  title: string;
  status: boolean;
  time?: string;
  onStatusChange?: (taskId: number) => void;
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

interface FolderIcon {
  id: string;
  name: string;
  description?: string;
  ownerName: string,
  ownerId: string,
  courses: CourseType[];
  yeras: YearType[];
  files: IconGetAProps[];
}

interface LoadingScreenProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<S>>;
}

interface AddTaskModalProps {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<S>>;
  addTask:(toDoIndex:number, newTask:Task)=>void;
  toDoIndex: number;
}