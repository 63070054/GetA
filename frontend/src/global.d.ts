interface OrangeButton{
    ButtonName: string
}
interface TodolistCard{
    date:string;
    tasks:Task[];
}

interface Task{
    title:string;
    status:boolean;
    time?:string;
}

interface ChildrenProps {
  children: ReactNode;
}

interface NavBarRouter {
  name: string;
  routerPath: string;
  icon?: SvgIconComponent;
}
