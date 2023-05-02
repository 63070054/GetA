interface OrangeButton {
  ButtonName: string
}

interface FormsInput {
  label: string;
  name: string;
  type: HTMLInputTypeAttribute;
  inputValue: InputValue;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  amountRows?: number;
}

interface CreateFilesModel {
  files: Blob[];
  folderId: int;
}

interface LoginModel {
  userName: string;
  password: string;
}

interface InputValue {
  [key: string]: string;
}
interface SelectInput {
  label: string;
  selectData: selectValue[];
  name: string;
  handleSelectChange: (value: string, name: string) => void;
}

interface selectValue {
  id: number;
  name: string;
}

interface CheckBox {
  label: string;
  status: boolean;
}

interface CreateUserModel {
  name: string;
  userName: string;
  password: string;
  year: YearStudy;
  program: Program;
  subjectArea: SubjectArea;
}

interface User {
  id?: number;
  name: string;
  year: YearStudy;
  program: Program;
  subjectArea: SubjectArea;
  myFolder: IconGetAProps[];
  myGuideLine: GuideLineCard[];
}

type YearStudy = "ปี 1" | "ปี 2" | "ปี 3" | "ปี 4" | "อื่น ๆ";
type Program = "IT" | "DSBA";
type SubjectArea = "Network" | "Software Engineer" | "Multimedia" | "อื่น ๆ";

interface AddDateModel {
  date: string;
  ownerId: numberl;
  subTasks: Task[];
}

interface AddTaskModel {
  title: string;
  status: boolean;
  time?: string;
  taskId: number;
}

interface TodolistCard {
  id?: number;
  date: string;
  subTasks: Task[];
  ownerId: number;
}

interface Task {
  id?: number;
  title: string;
  status: boolean;
  time?: string;
  taskId: number;
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
  id: number;
  name: string;
  description?: string;
  routeTo: string;
  ownerName?: string;
  ownerId?: number;
  iconPath: string;
  courses?: CourseType[];
  years?: YearType[];
}

interface Folder {
  name: string;
  description: string;
  ownerId: number;
  ownerName?: string;
  courses: CourseType[];
  years: YearType[];
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
  id: number;
  name: string;
  description?: string;
  ownerName: string,
  ownerId: number,
  courses: CourseType[];
  years: YearType[];
  files: IconGetAProps[];
}

interface FileGetA {
  id: number;
  name: string;
  filePath: string;
}

interface LoadingScreenProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<S>>;
}

interface AddFilesModalProps {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<S>>;
  handleDrop: (acceptedFiles: Blob[]) => void;
  fileSelected: Blob[];
  createFiles: () => void;
  handleUnselectFile: (fileName: string) => void;
}

interface AddTaskModalProps {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<S>>;
  addTask: (toDoIndex: number, newTask: Task) => void;
  toDoIndex: number;
  taskId: number;
}

interface AddToDoModalProps {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<S>>;
  addToDo: (newToDo: TodolistCard) => void;
}

interface GuideLineCard {
  id: number;
  title: string;
  description: string;
  ownerId: int;
  ownerName: string;
}