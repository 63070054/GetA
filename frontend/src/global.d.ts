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

interface CheckBox{
  label:string;
  status:boolean;
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
