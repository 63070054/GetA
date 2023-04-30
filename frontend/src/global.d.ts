interface OrangeButton {
  ButtonName: string
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

interface User {
  id: string;
  name: string;
  year: YearType;
  program: Program;
  subjectArea: SubjectArea;
  myFolder: IconGetAProps[];
  myGuideLine: GuideLineCard[];
}

type YearStudy = "ปี 1" | "ปี 2" | "ปี 3" | "ปี 4" | "อื่น ๆ";
type Program = "IT" | "DSBA";
type SubjectArea = "Network" | "Software Engineer" | "Multimedia" | "อื่น ๆ";


interface TodolistCard {
  id?: string;
  date: string;
  tasks: Task[];
}

interface Task {
  id?: string;
  title: string;
  status: boolean;
  time?: string;
  onStatusChange?: (taskId: string) => void;
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

interface File {
  id: string;
  name: string;
  filePath: string;
}

interface LoadingScreenProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<S>>;
}

interface AddTaskModalProps {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<S>>;
  addTask: (toDoIndex: number, newTask: Task) => void;
  toDoIndex: number;
}

interface AddToDoModalProps {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<S>>;
  addToDo: (newToDo: TodolistCard) => void;
}

interface GuideLineCard {
  id: string;
  title: string;
  description: string;
  folderId: string;
  files: IconGetAProps[];
}